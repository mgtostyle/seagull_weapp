import Request from "@/config/network/request"
import type {
  CompositeVerifyCheckLogin,
  CompositeVerifyRegister,
  CompositeVerifyUpLogin,
  CompositeVerifyWxLogin
} from '@/config/apis/index/interface'

export const checkLogin = new Request<CompositeVerifyCheckLogin>('POST', '/composite/terminal/verify/checkLogin', 'Object')

export const register = new Request<CompositeVerifyRegister>('POST', '/composite/terminal/verify/register', 'Object')

export const upLogin = new Request<CompositeVerifyUpLogin>('POST', '/composite/terminal/verify/upLogin', 'Object')

export const wxLogin = new Request<CompositeVerifyWxLogin>('POST', '/composite/terminal/verify/wxLogin', 'Object')
