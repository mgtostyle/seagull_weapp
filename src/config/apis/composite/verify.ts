import Request from "@/config/network/request"
import type {
  CompositeVerifyCheckLogin,
  CompositeVerifyRegister,
  CompositeVerifyUpLogin,
  CompositeVerifyWxLogin
} from '@/config/apis/index/interface'

export const checkLogin = new Request<CompositeVerifyCheckLogin>('POST', '/composite/terminal/verify/checkLogin')

export const register = new Request<CompositeVerifyRegister>('POST', '/composite/terminal/verify/register')

export const upLogin = new Request<CompositeVerifyUpLogin>('GET', '/composite/terminal/verify/upLogin')

export const wxLogin = new Request<CompositeVerifyWxLogin>('POST', '/composite/terminal/verify/wxLogin')
