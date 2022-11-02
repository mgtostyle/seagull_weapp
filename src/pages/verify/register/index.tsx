import React, { PropsWithChildren, useState } from 'react'
import type { PageProps } from './interface'
import './index.less'
import Taro from '@tarojs/taro'
import { Form, View, Text, Button } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsContainer, UsButton, UsImage, UsInput } from '@components/usIndex'

const VerifyRegister: React.FC<PropsWithChildren<{ props: PageProps, $apis }>> = ({ $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)

  const [avatarUrl, setAvatarUrl] = useState<string>()

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

  const onSubmit = (e) => {
    Promise.all([
      new Promise(resolve => Taro.login({
        success: res => resolve(res?.code || ''),
        fail: () => resolve('')
      })),
      new Promise(resolve => Taro.getUserInfo({
        success: res => resolve({
          encryptedData: res?.encryptedData || '',
          iv: res?.iv || ''
        }),
        fail: () => resolve({ encryptedData: '', iv: '' })
      }))
    ]).then(async (spread) => {
      const [jscode, { encryptedData, iv }] = (spread as any)
      const result = await $apis.composite.verify.register.post({
        nickName: e.detail.value.nickName,
        avatarUrl,
        jscode,
        encryptedData,
        iv
      })
      result.data.status === 1 && Taro.showModal({
        title: '注册成功',
        content: '完成注册，联系管理员审核并开通平台权限方可登录使用',
        showCancel: false,
        confirmText: '我知道了',
        success: res_modal => res_modal.confirm && Taro.navigateBack()
      })
    })
  }

  return (
    <UsContainer title="注册" back={1} bcolor="transparent">
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
        onSubmit={onSubmit}
      >
        <View className="inline_wechat_box">
          <Button
            className="inline_wrapper"
            openType="chooseAvatar"
            onChooseAvatar={(e) => setAvatarUrl(e.detail.avatarUrl)}
          >
            <UsImage
              className="avatarUrl"
              shape="circle"
              src={avatarUrl || ''}
            />
            <Text className="iconfont icon-fill-batchmodification" />
          </Button>
        </View>
        <View className="inline_password_box">
          <View className="inline_input">
            <View className="iconfont icon-line-userset" />
            <UsInput
              className="input"
              placeholderClass="placeholder"
              placeholder="用户昵称"
              name="nickName"
            />
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
