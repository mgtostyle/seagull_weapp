import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageWechatProps } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View, Text } from '@tarojs/components'
import { UsButton } from '@/components/usIndex'

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
          
        </View>
        <View className="inline_form_button">
          <UsButton
            width={600}
            theme="authorize"
            formType="submit"
          >授 权</UsButton>
          <Text
            className="mode"
            onClick={() => this.props.setLoginStatus(false)}
          >切换账号模式</Text>
        </View>
      </Form>
    )
  }

}