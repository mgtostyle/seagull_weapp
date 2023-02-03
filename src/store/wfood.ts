import Taro from '@tarojs/taro'
import type { UserInfoProps } from './interface'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialValues = {
  userInfo: {},
  appid: 'wxddaba6b5ff5ebfc7'
}

export const wfoodSlice = createSlice({
  name: 'composite',
  initialState: Object.assign({}, initialValues),
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoProps>) => {
      state.userInfo = Object.assign(state.userInfo, action.payload)
    },
    setClear: (state) => {
      Taro.clearStorage({
        success: () => {
          Taro.reLaunch({
            url: '/pages/verify/login/index'
          })
          state = Object.assign({}, initialValues)
        }
      })
    }
  }
})

export const wfoodActions = wfoodSlice.actions

export default wfoodSlice.reducer
