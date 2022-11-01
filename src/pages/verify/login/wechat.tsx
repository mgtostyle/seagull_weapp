import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageWechatProps } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View, Text } from '@tarojs/components'
import { UsButton, UsImage } from '@/components/usIndex'

export default class Wechat extends Component<PropsWithChildren<PageWechatProps>> {

  componentDidMount () {
    Taro.login({
      success: (code) => console.log(code)
    })
  }

  render (): ReactNode {
    return (
      <Form
        className="block_form_container"
        onSubmit={(values) => console.log(values)}
      >
        <View className="inline_wechat_box">
          <UsImage
            className="avatarUrl"
            shape="circle"
            src="dadasdadasda"
          />
          <Text className="nickName">{'微信用户'}</Text>
        </View>
        <View className="inline_form_button">
          <View className="inline_mode">
            <Text className="mode" onClick={() => this.props.setLoginStatus(false)}>切换账号模式</Text>
            <Text className="mode">尚未授权注册？</Text>
          </View>
          <UsButton
            className="inline_button"
            width={600}
            theme="authorize"
            formType="submit"
          >授 权</UsButton>
        </View>
      </Form>
    )
  }

}
