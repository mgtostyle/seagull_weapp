import Taro from '@tarojs/taro'

export const esParams: Array<string> = [
  'toast'
]

export const esRequest = {
  toast: (_this, value: boolean) => {
    _this.operateDefaultParams = Object.assign({}, _this.operateDefaultParams, Boolean(value) && {
      toast: {
        value: Boolean(value),
        action: Taro.showLoading({
          title: '加载中...'
        })
      }
    })
  }
}

export const esResponse = {
  toast: (_this) => {
    Boolean(_this.operateDefaultParams.toast?.value) && Taro.hideLoading(_this.operateDefaultParams.toast.action)
  }
}