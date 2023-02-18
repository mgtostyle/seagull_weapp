import Https from './https'
import type { Method, FormDataType, UploadFileOptions, OperateDefaultParams, RefuseItem } from './interface'
import { esParams, esRequest } from './extends'

export default class Request<T> extends Https<T> {

  #joggle: string;

  constructor (method: Method, joggle: string, type: FormDataType = 'Object') {
    super (method)
    this.#joggle = joggle
    this[method.toLocaleLowerCase()] = (...args: [T]) => this.#method(type, ...args)
  }

  refuse (conditions: Array<RefuseItem>) {
    const index = conditions.findIndex(item => item.source === item.target)
    index !== -1 && conditions[index].result()
    this.useRefuse = index !== -1 ? true : false
    return this
  }

  operate (defaultParams: OperateDefaultParams = this.operateDefaultParams) {
    const { callback, taskCb, ...params } = defaultParams
    this.operateDefaultParams = params
    typeof callback === 'function' && callback(this)
    this.taskCb = typeof taskCb === 'function' ? taskCb : false
    return this
  }

  #default () {
    const _this = this
    try {
      Object.keys(_this.operateDefaultParams).map((key: string) => {
        if (esParams.includes(key) && typeof _this.operateDefaultParams[key] !== 'function') {
          esRequest[key](_this, _this.operateDefaultParams[key])
        } else {
          esRequest[key](_this)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
    return this
  }

  #method (type: FormDataType, params: T) {
    switch (type) {
      case 'Suffix':
        return this.#default().setPromise(this.#joggle + (params || ''))
      default:
        return this.#default().setPromise(this.#joggle, params)
    }
  }

  upload (params: UploadFileOptions) {
    return this.#default().setUpload(this.#joggle, params)
  }

}
