import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const baseUserInfo = new Request<any>('GET', '/wfood/platform/base/userInfo', 'Object')