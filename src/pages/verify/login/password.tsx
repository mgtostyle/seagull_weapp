import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PagePasswordProps, PagePasswordState } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View, Text } from '@tarojs/components'
import { UsInput, UsButton } from '@/components/usIndex'

export default class Password extends Component<PropsWithChildren<PagePasswordProps>, PagePasswordState> {

  constructor (props: PagePasswordProps) {
    super (props)
    this.state = {
      visible: false
    }
  }

  private onSubmit (values) {
    this.$apis.composite.verify.upLogin.post(values).then(res => {
      Taro.setStorage({
        key: 'token',
        data: res.data.token,
        encrypt: true,
        success: () => Taro.reLaunch({
          url: res.data.path
        })
      } as any)
    })
  }

  render (): ReactNode {
    const { setLoginStatus, onRegister }: PagePasswordProps = this.props
    const { visible }: PagePasswordState = this.state
    return (
      <Form
        className="block_form_container"
        onSubmit={(e) => this.onSubmit(e.detail.value)}
      >
        <View className="inline_password_header">
          <View className="title">CRM管理系统</View>
          <View className="english">Welcome To Customer Relationship Management System</View>
        </View>
        <View className="inline_password_box">
          <View className="inline_input">
            <View className="iconfont icon-line-userset" />
            <UsInput
              className="input"
              placeholderClass="placeholder"
              placeholder="Username"
              name="account"
            />
          </View>
          <View className="inline_input">
            <View
              className={`iconfont ${!visible ? 'icon-line-safe1' : 'icon-line-see1'}`}
              onClick={() => this.setState({ visible: !visible })}
            />
            <UsInput
              className="input"
              placeholderClass="placeholder"
              placeholder="Password"
              name="password"
              password={!visible}
            />
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
