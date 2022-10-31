import Request from "@config/network/request"
import type {
  CompositeCheckWesfarmerList,
  CompositeCheckGenerateSenior
} from '@config/apis/index/interface'

export const wesfarmerList = new Request<CompositeCheckWesfarmerList>('POST', '/composite/terminal/check/wesfarmerList')

export const generateSenior = new Request<CompositeCheckGenerateSenior>('POST', '/composite/terminal/check/generateSenior')
