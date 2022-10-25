import Taro from '@tarojs/taro'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const [menuRect, systemRect] = [Taro.getMenuButtonBoundingClientRect(), Taro.getSystemInfoSync()]

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    navigate: {
      xBetween: systemRect.screenWidth - menuRect.right,
      yTop: menuRect.top,
      yBottom: menuRect.top - (systemRect?.statusBarHeight || 0),
      bWidth: menuRect.width,
      bHeight: menuRect.height
    },
    safeAreaHeight: (systemRect.safeArea?.bottom || 0) - (systemRect.safeArea?.height || 0),
    device: systemRect,
    theme: '#1890ff'
  },
  reducers: {
    setAppTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
  }
})

export const globalActions = globalSlice.actions

export default globalSlice.reducer