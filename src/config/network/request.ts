import Https from './https'
import type { Method, FormDataType, UploadFileOptions, OperateDefaultParams, RefuseItem } from './interface'

export default class Request<T> extends Https<T> {

  #joggle: string;
  #operateDefaultParams: OperateDefaultParams = {
    toast: false
  }

  constructor (method: Method, joggle: string, type: FormDataType = 'Object') {
    super (method)
    this[method.toLocaleLowerCase()] = (...args: [T]) => this.#method(joggle, type, ...args)
  }

  refuse (conditions: Array<RefuseItem>) {
    const index = conditions.findIndex(item => item.source === item.target)
    index !== -1 && conditions[index].result()
    this.useRefuse = index !== -1 ? true : false
    return this
  }

  operate (args: OperateDefaultParams = this.#operateDefaultParams) {
    const { callback, taskCb, ...params } = args
    typeof callback === 'function' && callback(this)
    this.taskCb = typeof taskCb === 'function' ? taskCb : false
    return this
  }

  #method (joggle: string, type: FormDataType, params: T) {
    switch (type) {
      case 'Suffix':
        return this.setPromise(joggle + params)
      default:
        return this.setPromise(joggle, params)
    }
  }

  upload (params: UploadFileOptions) {
    return this.setUpload(this.#joggle, params)
  }

}
