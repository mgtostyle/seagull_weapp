import Https from './https'
import type { Method, RequestHandler, FormDataType } from './interface'

export default class Request<T> extends Https {

  POST: (...args: RequestHandler<T>) => void;

  #methods: Array<Method> = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']

  constructor (joggle: string) {
    super (joggle)
    this.#methods.map((method: Method) => this[method] = (...args: RequestHandler<T>) => this.#method(method, ...args))
  }

  #method (method, params: T, type: FormDataType) {
    console.log(method, params, type)
  }

}