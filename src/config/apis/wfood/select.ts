import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const goodsCategory = new Request<any>('POST', '/wfood/platform/select/goodsCategory', 'Object')