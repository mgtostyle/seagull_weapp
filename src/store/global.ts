import commonLess from '@assets/less/common.module.less'
import Taro from '@tarojs/taro'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const [menuRect, systemRect] = [Taro.getMenuButtonBoundingClientRect(), Taro.getSystemInfoSync()]

export const initialValues = {
  theme: commonLess.usTextColor
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: Object.assign(initialValues, {
    navigate: {
      xBetween: systemRect.screenWidth - menuRect.right,
      yTop: menuRect.top,
      yBottom: menuRect.top - (systemRect?.statusBarHeight || 0),
      bWidth: menuRect.width,
      bHeight: menuRect.height
    },
    navigateHeight: menuRect.top * 2 + menuRect.height - (systemRect?.statusBarHeight || 0),
    safeAreaHeight: (systemRect.safeArea?.bottom || 0) - (systemRect.safeArea?.height || 0),
    device: systemRect,
    themeList: ['#15161a','#f5222d','#fa541c','#fa8c16','#faad14','#fadb14','#a0d911','#52c41a','#13c2c2','#1890ff','#2f54eb','#722ed1','#eb2f96']
  }),
  reducers: {
    setAppTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
  }
})

export const globalActions = globalSlice.actions

export default globalSlice.reducer
