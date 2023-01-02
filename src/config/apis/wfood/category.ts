import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const indexList = new Request<any>('POST', '/wfood/platform/category/list', 'Object')

export const indexDetail = new Request<string>('GET', '/wfood/platform/category/detail', 'Suffix')

export const indexUpdate = new Request<any>('POST', '/wfood/platform/category/update')

export const indexStatus = new Request<string>('GET', '/wfood/platform/category/status', 'Suffix')

export const indexDelete = new Request<string>('DELETE', '/wfood/platform/category/delete', 'Suffix')