import React, { PropsWithChildren, useState } from 'react'
import './update.less'
// import type {} from './interface'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { UsContainer, UsForm, UsInput } from '@components/usIndex'

const NavigateUpdate: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { navigateParams } = (getCurrentInstance as any)().router.params
  const { type, level, detail } = JSON.parse(decodeURIComponent(navigateParams))

  const [formRef, setFormRef]= useState<any>(null)
  const [navigat_type] = useState<string>(() => {
    switch (+level) {
      case 1:
        return '一级导航<模块>'
      case 2:
        return '二级导航<标签>'
      case 3:
        return '三级导航<功能>'
      default:
        return '未定义'
    }
  })
  const [navigate_connect, setConnectBy] = useState<string>('')

  const getNavigateDetail = async () => {
    try {
      let result = await $apis.wfood.setting.navigateDetail.get(`/id/${detail?.id}`)
      let { icon, path, connect_by, ...params } = result.data.detail
      setConnectBy(connect_by)
      return {
        ...params,
        app_icon: icon,
        app_path: path
      }
    } catch (error) {
      return {}
    }
  }

  const onSubmit = (values) => {
    $apis.wfood.setting.navigateUpdate.post(Object.assign(
      values,
      type === 'MODITY' && {
        id: detail.id
      },
      type === 'CREATE' && +level !== 1 && {
        connect_id: detail.connect_id
      },
      {
        level: +level,
        weight: +values.weight
      }
    )).then(res => res.data.status === 1 && Taro.navigateBack({
      delta: 1,
      success: () => Taro.showToast({
        title: type === 'MODIFY' ? '更新成功' : '创建成功',
        icon: 'success',
        duration: 1500
      })
    }))
  }

  return (
    <UsContainer title={`菜单详情 - ${detail?.id ? '编辑' : '创建'}`} back={1}>
      <View className="block_index_detail">
        <View className="inline_title">基本信息</View>
        <View className="inline_content">
          <Text>类型：{navigat_type}</Text>
          {Boolean(navigate_connect) && <Text>所属：{navigate_connect}</Text>}
        </View>
      </View>
      <UsForm
        formRef={node => setFormRef(node)}
        request={detail?.id ? getNavigateDetail : false}
        buttonConfig={{
          submitText: detail?.id ? '更新' : '创建'
        }}
        onReset={() => formRef?.resetFields()}
        onSubmit={onSubmit}
      >
        {Number(level) === 1 && (
          <UsForm.Item label="图标" name="app_icon">
            <UsInput placeholder="请输入..." />
          </UsForm.Item>
        )}
        <UsForm.Item label="名称" name="name">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="唯一ID" name="key">
          <UsInput placeholder='请输入...' disabled={Boolean(detail.id)} />
        </UsForm.Item>
        <UsForm.Item label="权重" name="weight">
          <UsInput placeholder='请输入...' />
        </UsForm.Item>
        {Number(level) === 3 && (
          <UsForm.Item label="关联路径" name="app_path">
            <UsInput placeholder='请输入...' />
          </UsForm.Item>
        )}
      </UsForm>
    </UsContainer>
  )

}

export default NavigateUpdate;