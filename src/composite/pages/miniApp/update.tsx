import React, { PropsWithChildren } from 'react'
import type { PageUpdateProps } from './interface'

import { UsContainer, UsForm, UsInput, UsTextArea } from '@components/usIndex'

const MiniAppUpdate: React.FC<PropsWithChildren<{ props: PageUpdateProps, $apis }>> = ({ $apis }) => {

  const onSubmit = (values) => {
    $apis.composite.setting.miniAppUpdate.post(values).then(res => {
      console.log(res)
    })
  }

  return (
    <UsContainer title="创建小程序平台">
      <UsForm
        onReset={() => console.log('重置呀')}
        onSubmit={onSubmit}
      >
        <UsForm.Item label="平台名称" name="title">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="Logo" name="logo">
          <UsInput placeholder="请输入..." />
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