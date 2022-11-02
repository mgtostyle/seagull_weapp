export interface PageProps {

}

export interface PagePasswordProps {
  setLoginStatus: (value: boolean) => void;
  onRegister: () => void;
}

export interface PagePasswordState {
  visible: boolean;
}

export interface PageWechatProps {
  userInfo: any;
  setLoginStatus: (value: boolean) => void;
  onRegister: () => void;
}