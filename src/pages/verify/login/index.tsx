import React, { PropsWithChildren, useState } from 'react'
import type { PageProps } from './interface'
import './index.less'
import Taro, { useLoad } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsContainer } from '@components/usIndex'
import Password from './password'
import Wechat from './wechat'

const VerifyLogin: React.FC<PropsWithChildren<{ props: PageProps, $apis }>> = ({ $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)

  const [loginStatus, setLoginStatus] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>(null)

  const bubbleList: Array<any> = new Array(20).fill(1).map(() => {
    let diam = Math.floor(Math.random() * 150 + 50)
    let rand = Math.ceil(Math.random() * (storeGlobal.themeList.length - 1))
    return {
      diam,
      x: `calc(${100 - Math.random() * 100}vw - ${diam/2}rpx)`,
      y: `calc(${100 - Math.random() * 100}vh - ${diam/2}rpx)`,
      color: storeGlobal.themeList[rand]
    }
  })

  useLoad(() => {
    getCheckLogin()
  })

  const getCheckLogin = async () => {
    const jscode = await new Promise((resolve) => Taro.login({
      success: result => resolve(result?.code || ''),
      fail: () => resolve('')
    }))
    $apis.composite.verify.checkLogin.post({
      jscode
    }).then(res => {
      if (res.data.loginInit) {
        Taro.reLaunch({
          url: res.data.path
        })
      } else {
        setUserInfo(res.data?.userInfo || null)
      }
    })
  }

  const onRegister = () => Taro.navigateTo({
    url: '/pages/verify/register/index'
  })

  return (
    <UsContainer title="登录" bcolor="transparent">
      {bubbleList.map((item, index: number) => (
        <Text
          className="inline_index_bubble"
          style={{
            width: `${item.diam}rpx`,
            height: `${item.diam}rpx`,
            top: item.y,
            left: item.x,
            animationDelay: `${Math.random()*20}s`,
            backgroundColor: item.color
          }}
          key={index}
        />
      ))}
      {loginStatus ? (
        <Wechat
          userInfo={userInfo}
          setLoginStatus={setLoginStatus}
          onRegister={onRegister}
        />
      ) : (
        <Password
          setLoginStatus={setLoginStatus}
          onRegister={onRegister}
        />
      )}
    </UsContainer>
  )

}

export default VerifyLogin;
