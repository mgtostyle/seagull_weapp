import localhost from '@/config/env/localhost.json'
import development from '@/config/env/development.json'
import production from '@/config/env/production.json'
import type { EnvironmentProps, DomainValues } from './interface'
import Taro from '@tarojs/taro'

export default class Environment implements EnvironmentProps {

  #localhost: DomainValues = localhost.composite;

  constructor (joggle: string) {
    if (process.env.LOCAL_ENV === 'local') this.#localhost = localhost[joggle.split('/')[1]]
  }

  get #local (): DomainValues {
    switch (process.env.LOCAL_ENV) {
      case 'test':
        return development;
      case 'prod':
        return production;
      default:
        return this.#localhost;
    }
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
