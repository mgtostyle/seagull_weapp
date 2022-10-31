export interface CompositeVerifyRegister {
  jscode: string;
  encryptedData: string;
  iv: string;
  nickName: string;
  avatarUrl: string;
}

export interface CompositeVerifyUpLogin {
  account: string;
  password: string;
}

export interface CompositeVerifyWxLogin {
  jscode: string;
}

export interface CompositeCheckWesfarmerList {
  secret: string;
  page?: number;
  limit?: number;
}

export interface CompositeCheckGenerateSenior {
  id: string;
  code: string;
}

export interface CompositeSettingMiniAppList {
  page?: number;
  limit?: number;
}

export interface CompositeSettingMiniAppUpdate {
  id: string;
  appId: string;
  title: string;
  logo: string;
  introduction: string;
  path: string;
  status: 0 | 1;
}

export interface CompositeSettingAdministratorList {
  id: string;
  page?: number;
  limit?: number;
}

export interface CompositeSettingAdministratorAdds {
  userId: string;
  platformId: string;
}

export interface CompositeSelectRegisterList {
  keyword?: string;
  gender?: 0 | 1 | 2;
  page?: number;
  limit?: number;
}

export interface CompositeSelectAdministratorList {
  appId: string;
  page?: number;
  limit?: number;
}
