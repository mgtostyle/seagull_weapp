import Request from "@/config/network/request"
import type {} from '@/config/apis/index/interface'

export const uploadSingleImage = new Request<any>('POST', '/composite/terminal/upload/singleImage')