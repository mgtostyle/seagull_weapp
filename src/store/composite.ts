import Taro from '@tarojs/taro'
import moment from 'moment'
import type { LoginProps } from './interface'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialValues = {
  loginDetail: {
    status: false,
    setime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
  userInfo: {}
}

export const compositeSlice = createSlice({
  name: 'composite',
  initialState: Object.assign({}, initialValues),
  reducers: {
    setLogin: (state, action: PayloadAction<LoginProps>) => {
      state.loginDetail = Object.assign(state.loginDetail, action.payload)
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

export const compositeActions = compositeSlice.actions

export default compositeSlice.reducer
