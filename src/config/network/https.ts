import Environment from "./environment"
import type { EnvironmentParams, HttpsDefaultProps, Method, Response } from "./interface"
import Taro, { RequestParams } from "@tarojs/taro"

export default class Https<T> extends Environment {

  #environment: EnvironmentParams = super.env()
  #defaultProps: HttpsDefaultProps

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
    const requestHandler = (resolve, reject) => {
      let handler: RequestParams = {
        method,
        url: `${DOMAIN_NAME}${joggle}`,
        timeout,
        header: Object.assign({
          'client-info': JSON.stringify(clientInfo)
        })
      }
      if (Object.prototype.toString.call(params) === '[object Object]') handler.data = params
      handler.success = (result) => {
        const res: Response = result.data
        switch (res.code) {
          case 200:
            return resolve(res)
          case 403:
            console.log('退出重新登录')
            Taro.reLaunch({
              url: '/pages/verify/login/index'
            })
            break;
          case 500:
            return Taro.showModal({
              title: '请求异常',
              content: `出现该状况及时联系管理员处理 -> ${res.data.content}`,
              showCancel: false,
              confirmText: '我知道了'
            })
          default:
            return Taro.showToast({
              title: res.data.content,
              icon: 'none',
              duration: 1500
            })
        }
      }
      handler.fail = (error) => {
        reject(error)
      }
      return Taro.request(handler)
    }
    return new Promise((resolve, reject) => requestHandler(resolve, reject))
  }

}