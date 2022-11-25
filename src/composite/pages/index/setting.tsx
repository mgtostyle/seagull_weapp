import React, { PropsWithChildren, useState } from "react"
import type { SettingItem } from './interface'
import './setting.less'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from "react-redux"
import { compositeActions } from "@/store/composite"

import { UsImage } from '@components/usIndex'

const Setting: React.FC<PropsWithChildren<{ visible, $apis }>> = ({ visible, $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)
  const storeComposite = useSelector(state => (state as any).composite)
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [isJump, setIsJump] = useState<boolean>(false)

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

  useLoad(() => getUserInfo())
  useDidShow(() => isJump && getUserInfo())

  const getUserInfo = async () => {
    const jscode = await new Promise((resolve) => Taro.login({
      success: result => resolve(result?.code || ''),
      fail: () => resolve('')
    }))
    $apis.composite.common.baseUserInfo.post({
      jscode
    }).then(res => {
      setUserInfo(res.data.userInfo)
      setIsJump(false)
    })
  }

  const toRegister = () => {
    Boolean(userInfo === null) && Taro.navigateTo({
      url: '/pages/verify/register/index',
      success: () => setIsJump(true)
    })
  }

  return visible && (
    <React.Fragment>
      <View
        className="block_sett_back"
        style={{
          height: `calc(320rpx + ${storeGlobal.navigateHeight}px)`
        }}
      />
      <View className="block_sett_card">
        <View
          className="card_sett"
          onClick={toRegister}
        >
          <UsImage className="sett_image" src={userInfo?.avatarUrl} shape="circle" />
          <View className="sett_info">
            <View className="name">{userInfo?.nickName || '平台管家'}</View>
            {Boolean(userInfo !== null) ? (
              <View className="true">已授权</View>
            ) : (
              <View className="false">去认证</View>
            )}
          </View>
        </View>
        <View className="card_detail">
          <View className="text">登录于</View>
          <View className="text">{storeComposite.loginDetail.setime}</View>
        </View>
      </View>
      <View className="block_sett_list">
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