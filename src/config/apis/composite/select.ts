import Request from "@config/network/request"
import type {
  CompositeSelectRegisterList,
  CompositeSelectAdministratorList
} from '@config/apis/index/interface'

export const registerList = new Request<CompositeSelectRegisterList>('POST', '/composite/terminal/select/registerList')

export const administratorList = new Request<CompositeSelectAdministratorList>('POST', '/composite/terminal/select/administratorList')
