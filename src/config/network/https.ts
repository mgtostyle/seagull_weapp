import Environment from "./environment"
import type { EnvironmentParams, HttpsDefaultProps, Method, Response, UploadFileParams } from "./interface"
import Taro, { RequestParams } from "@tarojs/taro"

export default class Https<T> extends Environment {

  #environment: EnvironmentParams = super.env()
  #defaultProps: HttpsDefaultProps
  taskCb: boolean | ((values?) => void)

  constructor (method: Method) {
    super ()
    this.#defaultProps = {
      method,
      timeout: 5000,
      clientInfo: {
        'serve-type': 'WXMINI'
      }
    }
  }

  setPromise (joggle: string, params?: T) {
    const { DOMAIN_NAME }: EnvironmentParams = this.#environment
    const { method, timeout, clientInfo }: HttpsDefaultProps = this.#defaultProps
    const token = Taro.getStorageSync('token')
    const requestHandler = (resolve, reject) => {
      let handler: RequestParams = {
        method,
        url: `${DOMAIN_NAME}${joggle}`,
        timeout,
        header: Object.assign({
          'client-info': JSON.stringify(clientInfo),
        },
        token && {
          authorization: `Bearer ${token}`
        })
      }
      if (Object.prototype.toString.call(params) === '[object Object]') handler.data = params
      handler.success = (result) => {
        const res: Response = result.data
        this.#setSuccess(res, resolve)
      }
      handler.fail = (error) => {
        reject(error)
      }
      return Taro.request(handler)
    }
    return new Promise((resolve, reject) => requestHandler(resolve, reject))
  }

  setUpload (joggle: string, params: UploadFileParams) {
    const { DOMAIN_NAME }: EnvironmentParams = this.#environment
    const { clientInfo }: HttpsDefaultProps = this.#defaultProps
    const token = Taro.getStorageSync('token')
    const uploadHandler = (resolve, reject) => {
      let uploadTask = Taro.uploadFile({
        url: `${DOMAIN_NAME}${joggle}`,
        filePath: params.file,
        name: params.name,
        header: Object.assign({
          'client-info': JSON.stringify(clientInfo),
        },
        token && {
          authorization: `Bearer ${token}`
        }),
        success: (result) => result.statusCode === 200
        ? ((res) => this.#setSuccess(res, resolve))(JSON.parse(result.data))
        : Taro.showToast({
          title: '请求失败，请重新试试吧',
          icon: 'none',
          duration: 3000,
          success: () => reject('error')
        }),
        fail: () => Taro.showToast({
          title: '请求失败，请重新试试吧',
          icon: 'none',
          duration: 3000,
          success: () => reject('error')
        })
      })
      typeof this.taskCb === 'function' && this.taskCb(uploadTask)
      return uploadTask;
    }
    return new Promise((resolve, reject) => uploadHandler(resolve, reject))
  }

  #setSuccess (result, resolve) {
    switch (result.code) {
      case 200:
        return resolve(result)
      case 403:
        Taro.removeStorageSync('token')
        Taro.showModal({
          title: '访问过期',
          content: '抱歉！访问时间已过期，需要重新登录验证管理员信息，点击确认退出并返回登录界面。',
          showCancel: false,
          confirmText: '我知道了',
          success: res_modal => res_modal.confirm && Taro.reLaunch({
            url: '/pages/verify/login/index'
          })
        })
        break;
      case 500:
        return Taro.showModal({
          title: '请求异常',
          content: `出现该状况及时联系管理员处理 -> ${result.data.content}`,
          showCancel: false,
          confirmText: '我知道了'
        })
      default:
        return Taro.showToast({
          title: result.data.content,
          icon: 'none',
          duration: 1500
        })
    }
  }

}
