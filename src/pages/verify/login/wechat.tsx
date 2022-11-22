import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageWechatProps } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View, Text } from '@tarojs/components'
import { UsButton, UsImage } from '@/components/usIndex'

export default class Wechat extends Component<PropsWithChildren<PageWechatProps>> {

  private async onSubmit () {
    const jscode = await new Promise((resolve) => Taro.login({
      success: result => resolve(result?.code || ''),
      fail: () => resolve('')
    }))
    this.$apis.composite.verify.wxLogin.post({ jscode }).then(res => {
      let { isExist, isOwn, secret } = res.data
      if (isExist) {
        if (isOwn) {
          Taro.reLaunch({
            url: `/pages/binds/index/index?secret=${secret}`
          })
        } else {
          Taro.showToast({
            title: '该账号尚未绑定任何平台，请联系管理员入驻相关平台',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        Taro.showModal({
          title: '未注册',
          content: '该账号尚未注册，请申请注册并联系管理员开通账号权限，及绑定相关平台',
          confirmText: '前往注册',
          success: res => res.confirm && this.props.onRegister()
        })
      }
    })
  }

  render (): ReactNode {
    const { userInfo, setLoginStatus, onRegister }: PageWechatProps = this.props
    return (
      <Form
        className="block_form_container"
        onSubmit={() => this.onSubmit()}
      >
        <View className="inline_wechat_box">
          <UsImage
            className="avatarUrl"
            shape="circle"
            src={userInfo?.avatarUrl}
          />
          <Text className="nickName">{userInfo?.nickName || '微信用户'}</Text>
        </View>
        <View className="inline_form_button">
          <View className="inline_mode">
            <Text
              className="mode"
              onClick={() => setLoginStatus(false)}
            >切换账号模式</Text>
            <Text
              className="mode"
              onClick={() => onRegister()}
            >尚未授权注册？</Text>
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
