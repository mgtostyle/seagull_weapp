import React, { PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import './index.less'
import { Form, View, Input, Text } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsContainer, UsButton, UsImage } from '@components/usIndex'

const VerifyRegister: React.FC<PropsWithChildren<{ props: PageProps, $apis }>> = ({ $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)

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

  return (
    <UsContainer title="登录" back={1}>
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
      <Form
        className="block_form_container"
        onSubmit={(values) => console.log(values)}
      >
        <View className="inline_wechat_box">
          <UsImage
            className="avatarUrl"
            shape="circle"
            src={''}
          />
        </View>
        <View className="inline_password_box">
          <View className="inline_input">
            <View className="iconfont icon-line-userset" />
            <Input className="input" placeholderClass="placeholder" placeholder="Username" />
          </View>
          <View className="inline_input">
            <View className="iconfont icon-line-safe1" />
            <Input className="input" placeholderClass="placeholder" placeholder="Password" />
          </View>
        </View>
        <View className="inline_form_button">
          <Text className="inline_tip">管理员需要核实注册成员信息，验证身份成功即可使用</Text>
          <UsButton
            className="inline_button"
            width={600}
            formType="submit"
          >注 册</UsButton>
        </View>
      </Form>
    </UsContainer>
  )

}

export default VerifyRegister;
