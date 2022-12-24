export interface LoginProps {
  status?: boolean;
  setime?: string;
}

export interface UserInfoProps {
  avatarUrl: string;
  nickName: string;
  idCard: string;
  isRobot: boolean;
  senior: boolean;
}