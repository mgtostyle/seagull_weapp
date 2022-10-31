import Environment from "./environment"
import type { EnvironmentParams, HttpsDefaultProps, Method } from "./interface"
import Taro, { RequestParams } from "@tarojs/taro"

export default class Https<T> extends Environment {

  #environment: EnvironmentParams = super.env()
  #defaultProps: HttpsDefaultProps

  constructor (method: Method) {
    super ()
    this.#defaultProps = {
      method,
      timeout: 5000
    }
  }

  setPromise (joggle: string, params?: T) {
    const { DOMAIN_NAME }: EnvironmentParams = this.#environment
    const { method, timeout }: HttpsDefaultProps = this.#defaultProps
    const requestHandler = (resolve, reject) => {
      let handler: RequestParams = {
        method,
        url: `${DOMAIN_NAME}${joggle}`,
        timeout
      }
      if (Object.prototype.toString.call(params) === '[object Object]') handler.data = params
      handler.success = (result) => {
        resolve(result)
      }
      handler.fail = (error) => {
        reject(error)
      }
      return Taro.request(handler)
    }
    return new Promise((resolve, reject) => requestHandler(resolve, reject))
  }

}
