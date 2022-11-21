import Request from "@/config/network/request"
import type {} from '@/config/apis/index/interface'

export const uploadSingleImage = new Request<unknown>('POST', '/composite/terminal/upload/singleImage', 'Object')

export const baseUserInfo = new Request<unknown>('GET', '/composite/terminal/base/userInfo', 'Object')