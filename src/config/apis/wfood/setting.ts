import Request from "@/config/network/request"
import type {

} from '../index/interface'

export const navigateMap = new Request<any>('POST', '/wfood/platform/setting/navigateMap', 'Object')

export const navigateUpdate = new Request<any>('POST', '/wfood/platform/setting/navigateUpdate', 'Object')

export const navigateDetail = new Request<string>('GET', '/wfood/platform/setting/navigateDetail', 'Suffix')

export const navigateStatus = new Request<string>('GET', '/wfood/platform/setting/navigateStatus', 'Suffix')

export const navigateDelete = new Request<string>('DELETE', '/wfood/platform/setting/navigateDelete', 'Suffix')