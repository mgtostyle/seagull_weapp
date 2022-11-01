import Request from "@/config/network/request"
import type {
  CompositeSettingMiniAppList,
  CompositeSettingMiniAppUpdate,
  CompositeSettingAdministratorList,
  CompositeSettingAdministratorAdds
} from '@/config/apis/index/interface'

export const miniAppList = new Request<CompositeSettingMiniAppList>('POST', '/composite/terminal/setting/miniAppList')

export const miniAppDetail = new Request<string>('GET', '/composite/terminal/setting/miniAppDetail')

export const miniAppUpdate = new Request<CompositeSettingMiniAppUpdate>('POST', '/composite/terminal/setting/miniAppUpdate')

export const miniAppDelete = new Request<string>('DELETE', '/composite/terminal/setting/miniAppDelete')

export const administratorList = new Request<CompositeSettingAdministratorList>('POST', '/composite/terminal/setting/administratorList')

export const administratorAdds = new Request<CompositeSettingAdministratorAdds>('POST', '/composite/terminal/setting/administratorAdds')

export const administratorRemove = new Request<string>('DELETE', '/composite/terminal/setting/administratorRemove')
