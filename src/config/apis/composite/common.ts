import Request from "@/config/network/request"
import type { CompositeBaseUserInfo } from '@/config/apis/index/interface'

export const uploadSingleImage = new Request<unknown>('POST', '/composite/terminal/upload/singleImage', 'Object')

export const baseUserInfo = new Request<CompositeBaseUserInfo>('POST', '/composite/terminal/base/userInfo', 'Object')

export const censusStatistics = new Request<unknown>('GET', '/composite/terminal/census/statistics', 'Object')