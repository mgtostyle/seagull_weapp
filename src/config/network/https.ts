import Environment from "./environment"
import type { EnvironmentParams } from "./interface"
import Taro, { RequestParams } from "@tarojs/taro"

export default class Https extends Environment {

  constructor (joggle: string) {
    super ()
  }

  setPromise () {
    const { DOMAIN_NAME }: EnvironmentParams = super.env()
    const handler: RequestParams = {
      url: `${DOMAIN_NAME}`
    }
    return Taro.request(handler)
  }

}
