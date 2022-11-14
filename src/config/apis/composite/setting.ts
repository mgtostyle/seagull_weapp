import Request from "@/config/network/request"
import type {
  CompositeSettingMiniAppList,
  CompositeSettingMiniAppUpdate,
  CompositeSettingAdministratorList,
  CompositeSettingAdministratorAdds
} from '@/config/apis/index/interface'

export const miniAppList = new Request<CompositeSettingMiniAppList>('POST', '/composite/terminal/setting/miniAppList', 'Object')

export const miniAppDetail = new Request<string>('GET', '/composite/terminal/setting/miniAppDetail', 'Suffix')

export const miniAppUpdate = new Request<CompositeSettingMiniAppUpdate>('POST', '/composite/terminal/setting/miniAppUpdate', 'Object')

export const miniAppStatus = new Request<string>('GET', '/composite/terminal/setting/miniAppStatus', 'Suffix')

export const miniAppDelete = new Request<string>('DELETE', '/composite/terminal/setting/miniAppDelete', 'Suffix')

export const administratorList = new Request<CompositeSettingAdministratorList>('POST', '/composite/terminal/setting/administratorList', 'Object')

export const administratorAdds = new Request<CompositeSettingAdministratorAdds>('POST', '/composite/terminal/setting/administratorAdds', 'Object')

export const administratorRemove = new Request<string>('DELETE', '/composite/terminal/setting/administratorRemove', 'Suffix')
