import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const indexList = new Request<any>('POST', '/wfood/platform/goods/indexList', 'Object')

export const publishList = new Request<any>('POST', '/wfood/platform/goods/publishList', 'Object')

export const indexDetail = new Request<string>('GET', '/wfood/platform/goods/detail', 'Suffix')

export const indexUpdate = new Request<any>('POST', '/wfood/platform/goods/update', 'Object')