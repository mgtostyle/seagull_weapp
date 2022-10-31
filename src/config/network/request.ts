import Https from './https'
import type { Method, RequestHandler, DataType } from './interface'

export default class Request<T> extends Https<T> {

  constructor (method: Method, joggle: string) {
    super (method)
    this[method.toLocaleLowerCase()] = (...args: RequestHandler<T>) => this.#method(joggle, ...args)
  }

  operate () {
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

}
