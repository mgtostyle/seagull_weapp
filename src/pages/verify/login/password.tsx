import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PagePasswordProps } from './interface'
import './index.less'
import { Form, View, Text, Input } from '@tarojs/components'
import { UsButton } from '@/components/usIndex'

export default class Password extends Component<PropsWithChildren<PagePasswordProps>> {

  render (): ReactNode {
    const { setLoginStatus, onRegister }: PagePasswordProps = this.props
    return (
      <Form
        className="block_form_container"
        onSubmit={(values) => console.log(values)}
      >
        <View className="inline_password_header">
          <View className="title">CRM管理系统</View>
          <View className="english">Welcome To Customer Relationship Management System</View>
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
          <View className="inline_mode">
            <Text
              className="mode"
              onClick={() => setLoginStatus(true)}
            >切换授权模式</Text>
            <Text
              className="mode"
              onClick={() => onRegister()}
            >尚未授权注册？</Text>
          </View>
          <UsButton
            className="inline_button"
            width={600}
            formType="submit"
          >登 录</UsButton>
        </View>
      </Form>
    )
  }

}
