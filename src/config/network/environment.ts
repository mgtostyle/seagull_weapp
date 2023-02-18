import localhost from '@/config/env/localhost.json'
// import development from '@/config/env/development.json'
import production from '@/config/env/production.json'
import type { EnvironmentProps, DomainValues } from './interface'
import Taro from '@tarojs/taro'

export default class Environment implements EnvironmentProps {

  get #local (): DomainValues {
    // switch (process?.env?.NODE_ENV) {
    //   case 'development':
    //     return development;
    //   case 'production':
    //     return production;
    //   default:
    //     return localhost;
    // }
    return localhost
  }

  env () {
    let envVersion = Taro.getAccountInfoSync()?.miniProgram?.envVersion
    if (envVersion === 'develop' || envVersion === 'trial') {
      return this.#local;
    } else {
      return production;
    }
  }

}
