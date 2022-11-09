import Https from './https'
import type { Method, RequestHandler, DataType, UploadFileParams, OperateParams, RefuseItem } from './interface'

export default class Request<T> extends Https<T> {

  #joggle: string;
  #operate: OperateParams = {
    toast: false,
  }

  constructor (method: Method, joggle: string) {
    super (method)
    this.#joggle = joggle
    this[method.toLocaleLowerCase()] = (...args: RequestHandler<T>) => this.#method(joggle, ...args)
  }

  refuse (conditions: Array<RefuseItem>) {
    const index = conditions.findIndex(item => Boolean(item.where))
    if (index !== -1) {
      conditions[index].result()
      this.useRefuse = true
    } else {
      this.useRefuse = false
    }
    return this
  }

  operate (args = this.#operate) {
    const { callback, taskCb, ...params } = args as {
      params: OperateParams;
      callback?: (values) => void;
      taskCb?: (values) => void;
    }
    typeof callback === 'function' && callback(this)
    this.taskCb = typeof taskCb === 'function' && taskCb
    return this
  }

  #method (joggle: string, params: T, type: DataType = 'Object') {
    switch (type) {
      case 'Suffix':
        return this.setPromise(joggle + params)
      default:
        return this.setPromise(joggle, params)
    }
  }

  get: (...args: RequestHandler<T>) => any;
  post: (...args: RequestHandler<T>) => any;
  delete: (...args: RequestHandler<T>) => any;
  put: (...args: RequestHandler<T>) => any;
  patch: (...args: RequestHandler<T>) => any;

  upload (params: UploadFileParams) {
    return this.setUpload(this.#joggle, params)
  }

}
