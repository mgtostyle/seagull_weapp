import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const navigateMap = new Request<any>('POST', '/wfood/platform/setting/navigateMap', 'Object')

export const navigateUpdate = new Request<any>('POST', '/wfood/platform/setting/navigateUpdate', 'Object')