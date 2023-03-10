import Environment from "./environment"
import type {
  HttpsProps,
  DomainValues,
  // RequestDefaultParams,
  OperateDefaultParams,
  Method,
  // ResponseParams,
  UploadFileParams,
  UploadFileOptions
} from "./interface"
import { esParams, esResponse } from './extends'
import Taro, { RequestParams } from "@tarojs/taro"

export default class Https<ReqOptions> extends Environment implements HttpsProps {

  #environment: DomainValues = super.env();
  #requestDefaultParams: any;
  operateDefaultParams: OperateDefaultParams = {
    toast: true
  }
  useRefuse = false
  taskCb: boolean | (<Task>(values?: Task) => void) = false

  constructor (method: Method) {
    super ()
    this.#requestDefaultParams = {
      method,
      timeout: 5000
    }
  }

  setPromise (joggle: string, params?: ReqOptions) {
    const { DOMAIN_NAME } = this.#environment
    const { method, timeout } = this.#requestDefaultParams
    const token = Taro.getStorageSync('token')
    const requestHandler = (resolve, reject) => {
      let handler: RequestParams = {
        method,
        url: `${DOMAIN_NAME}${joggle}`,
        timeout,
        header: Object.assign({
          'X-Requested-With': 'XMLHttpRequest'
        },
        token && {
          'cookie': token
        })
      }
      if (Object.prototype.toString.call(params) === '[object Object]') handler.data = params
      handler.success = (result) => {
        this.#default().#setSuccess(result, resolve)
      }
      handler.fail = (error) => {
        reject(error)
      }
      return !this.useRefuse && Taro.request(handler)
    }
    return new Promise((resolve, reject) => requestHandler(resolve, reject))
  }

  setUpload (joggle: string, params: UploadFileOptions) {
    const { DOMAIN_NAME } = this.#environment
    const token = Taro.getStorageSync('token')
    const uploadHandler = (resolve, reject) => {
      let handler: UploadFileParams = {
        url: `${DOMAIN_NAME}${joggle}`,
        filePath: params.source,
        name: params.name,
        header: Object.assign({
          'X-Requested-With': 'XMLHttpRequest'
        },
        token && {
          'cookie': token
        }),
        success: (result) => result.statusCode === 200
        ? ((res) => this.#default().#setSuccess(res, resolve))(JSON.parse(result.data))
        : Taro.showToast({
          title: '?????????????????????????????????',
          icon: 'none',
          duration: 3000,
          success: () => reject('error')
        }),
        fail: () => Taro.showToast({
          title: '?????????????????????????????????',
          icon: 'none',
          duration: 3000,
          success: () => reject('error')
        })
      }
      let uploadTask = Taro.uploadFile(handler)
      typeof this.taskCb === 'function' && this.taskCb(uploadTask)
      return !this.useRefuse && uploadTask;
    }
    return new Promise((resolve, reject) => uploadHandler(resolve, reject))
  }

  #default () {
    const _this = this
    try {
      Object.keys(_this.operateDefaultParams).map((key: string) => {
        esParams.includes(key) && esResponse[key](_this)
      })
    } catch (error) {
      console.log(error.message)
    }
    return this
  }

  #setSuccess (result, resolve) {
    let res = result.data as any
    switch (res.error) {
      case 0:
        return resolve(result)
      case -1:
        Taro.removeStorageSync('token')
        Taro.showModal({
          title: '????????????',
          content: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
          showCancel: false,
          confirmText: '????????????',
          success: res_modal => res_modal.confirm && Taro.reLaunch({
            url: '/authorize/pages/login/index'
          })
        })
        break;
      // case 500:
      //   return Taro.showModal({
      //     title: '????????????',
      //     content: `?????????????????????????????????????????? -> ${res.data.msg}`,
      //     showCancel: false,
      //     confirmText: '????????????'
      //   })
      default:
        return Taro.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
    }
  }

}
