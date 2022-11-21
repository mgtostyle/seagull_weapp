import React, { PropsWithChildren } from "react"
import type { SettingItem } from './interface'
import './setting.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from "react-redux"
import { compositeActions } from "@/store/composite"

import { UsImage } from '@components/usIndex'

const Setting: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)
  const storeComposite = useSelector(state => (state as any).composite)
  const dispatch = useDispatch()

  const columns: Array<SettingItem> = [
    {
      icon: 'icon-line-control',
      name: '清除缓存',
      value: Taro.getAccountInfoSync()?.miniProgram?.version || '1.0.0'
    },
    {
      icon: 'icon-line-signout1',
      name: '退出账号',
      value: '',
      result: () => setLoginOut()
    }
  ]

  const setLoginOut = () => {
    Taro.showModal({
      title: '退出账号',
      content: '是否退出当前账号，并返回登录页面，请再次确认您的操作！！！',
      confirmText: '退出',
      success: res => res.confirm && dispatch(compositeActions.setClear())
    })
  }

  useLoad(() => {
    getUserInfo()
  })

  const getUserInfo = () => {
    $apis.composite.common.baseUserInfo.get().then(res => {
      console.log(res)
    })
  }

  return (
    <React.Fragment>
      <View
        className="block_user_back"
        style={{
          height: `calc(320rpx + ${storeGlobal.navigateHeight}px)`
        }}
      />
      <View className="block_user_card">
        <View className="card_user">
          <UsImage className="image" shape="circle" />
          <Text className="name">style@@</Text>
        </View>
        <View className="card_detail">
          <View className="text">登录于</View>
          <View className="text">{storeComposite.loginDetail.setime}</View>
        </View>
      </View>
      <View className="block_user_list">
        {columns.map((element: SettingItem, index: number) => (
          <View
            className="inline_list_item"
            key={index}
            onClick={() => typeof element.result === 'function' && element.result()}
          >
            <View className="item_label">
              <View className={`iconfont ${element.icon}`} />
              <View className="text">{element.name}</View>
            </View>
            <View className="item_value">{element.value}</View>
          </View>
        ))}
      </View>
    </React.Fragment>
  )

}

export default Setting;