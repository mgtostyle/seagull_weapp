import Taro from '@tarojs/taro'
import { createSlice } from "@reduxjs/toolkit"

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
    device: systemRect
  },
  reducers: {
    
  }
})

export default globalSlice.reducer