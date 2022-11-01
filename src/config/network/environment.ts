import localhost from '@/config/env/localhost.json'
import development from '@/config/env/development.json'
import production from '@/config/env/production.json'
import Taro from '@tarojs/taro'
import type { EnvironmentParams } from './interface'

export default class Environment {

  get #local (): EnvironmentParams {
    switch (process.env.LOCAL_ENV) {
      case 'test':
        return development;
      case 'prod':
        return production;
      default:
        return localhost;
    }
  }

  env (): EnvironmentParams {
    switch (Taro.getAccountInfoSync().miniProgram.envVersion) {
      case 'develop':
        return this.#local;
      case 'trial':
        return process.env.NODE_ENV === 'development' ? development : production;
      default:
        return production;
    }
  }

}
