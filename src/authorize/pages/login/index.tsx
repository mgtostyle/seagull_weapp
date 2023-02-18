import React, { PropsWithChildren, useState } from 'react'
import type { PageProps } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View } from '@tarojs/components'

import { UsContainer, UsInput, UsButton } from '@components/usIndex'

const LoginIndex: React.FC<PropsWithChildren<{ props: PageProps, $apis }>> = ({ $apis }) => {

  const [visible, setVisible] = useState<boolean>(false)

  const onSubmit = (values) => {
    $apis.login.index.post(values).then(res => Taro.setStorage({
      key: 'token',
      data: res?.cookies?.[0]?.split(';')?.[0],
      success: () => Taro.reLaunch({
        url: '/pages/index/index'
      })
    }))
  }

  return (
    <UsContainer title="登录中心" bcolor="transparent">
      <Form
        className="block_form_container"
        onSubmit={(e) => onSubmit(e.detail.value)}
      >
        <View className="inline_password_header">
          <View className="title">XENON</View>
          <View className="english">亲爱的用户，欢迎使用！</View>
        </View>
        <View className="inline_password_box">
          <View className="inline_input">
            <View className="iconfont icon-line-userset" />
            <UsInput
              className="input"
              placeholderClass="placeholder"
              placeholder="用户名"
              name="username"
            />
          </View>
          <View className="inline_input">
            <View
              className={`iconfont ${!visible ? 'icon-line-safe1' : 'icon-line-see1'}`}
              onClick={() => setVisible(!visible)}
            />
            <UsInput
              className="input"
              placeholderClass="placeholder"
              placeholder="密码"
              name="password"
              password={!visible}
            />
          </View>
        </View>
        <View className="inline_form_button">
          <UsButton
            className="inline_button"
            width={600}
            formType="submit"
          >马上登录</UsButton>
        </View>
      </Form>
    </UsContainer>
  )

}

export default LoginIndex;
