import React, { PropsWithChildren, useState } from 'react'
import type { PageUpdateProps } from './interface'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { UsContainer, UsForm, UsInput, UsTextArea, UsUpload } from '@components/usIndex'

const MiniAppUpdate: React.FC<PropsWithChildren<{ props: PageUpdateProps, $apis }>> = ({ $apis }) => {

  const { id } = (getCurrentInstance as any)().router.params
  const [formRef, setFormRef]= useState<any>(null)

  const getMiniAppDetail = async () => {
    try {
      let result = await $apis.composite.setting.miniAppDetail.get(`/id/${id}`)
      let { logo, ...params } = result.data.detail
      return {
        ...params,
        logo: [{
          uid: Date.now() + 1,
          status: 'done',
          url: logo,
          percent: 100
        }]
      }
    } catch (error) {
      return {}
    }
  }

  const onSubmit = (values) => {
    $apis.composite.setting.miniAppUpdate.refuse([
      {
        source: values?.logo?.findIndex(item => item?.status !== 'done') !== -1,
        target: true,
        result: () => Taro.showToast({
          title: '无法提交数据，存在异常或者未加载完成的图片，请检查清楚后重试～',
          icon: 'none',
          duration: 2000
        })
      }
    ]).post(Object.assign(
      values,
      id && { id },
      {
        logo: values?.logo?.[0]?.url || ''
      }
    )).then(res => res.data.status === 1 && Taro.navigateBack({
      delta: 1,
      success: () => Taro.showToast({
        title: id ? '更新成功' : '创建成功',
        icon: 'success',
        duration: 1500
      })
    }))
  }

  return (
    <UsContainer title={`小程序平台 - ${id ? '编辑' : '创建'}`} back={1}>
      <UsForm
        formRef={node => setFormRef(node)}
        request={id ? getMiniAppDetail : false}
        buttonConfig={{
          submitText: id ? '更新' : '创建'
        }}
        onReset={() => formRef?.resetFields()}
        onSubmit={onSubmit}
      >
        <UsForm.Item label="平台名称" name="title">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="Logo" name="logo">
          <UsUpload limit={1} />
        </UsForm.Item>
        <UsForm.Item label="AppId" name="appId">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="平台简介" name="introduction">
          <UsTextArea placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="入口路径" name="path">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
      </UsForm>
    </UsContainer>
  )

}

export default MiniAppUpdate;
