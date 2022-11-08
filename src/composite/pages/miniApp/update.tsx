import React, { PropsWithChildren, useState } from 'react'
import type { PageUpdateProps } from './interface'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'

import { UsContainer, UsForm, UsInput, UsTextArea, UsUpload, UsArcProgressBar } from '@components/usIndex'

const MiniAppUpdate: React.FC<PropsWithChildren<{ props: PageUpdateProps, $apis }>> = ({ $apis }) => {

  const { id } = (getCurrentInstance as any)().router.params
  // const [detail, setMiniAppDetail] = useState(null)

  // useLoad(() => {
  //   id && getMiniAppDetail()
  // })

  const getMiniAppDetail = async () => {
    try {
      let result = await $apis.composite.setting.miniAppDetail.get(`/id/${id}`, 'Suffix')
      let { logo, ...params } = result.data.detail
      return {
        ...params,
        logo: [{ url: logo }]
      }
    } catch (error) {
      return {}
    }
  }

  const onSubmit = (values) => {
    // const { logo, ...params } = values
    // if (logo?.[0]?.status !== 'done') return Taro.showToast({
    //   title: `图片${logo?.[0]?.status === 'uploading' ? '未加载完成' : '异常'}，请检查清楚再试`,
    //   icon: 'none',
    //   duration: 1500
    // })
    // const dataValues = {
    //   ...params,
    //   logo: logo[0].url
    // }
    // if (id) dataValues.id = id
    // $apis.composite.setting.miniAppUpdate.post(dataValues).then(res => res.data.status === 1 && Taro.navigateBack({
    //   delta: 1,
    //   success: () => Taro.showToast({
    //     title: '创建成功',
    //     icon: 'success',
    //     duration: 1500
    //   })
    // }))
  }

  return (
    <UsContainer title={`小程序平台 - ${id ? '编辑' : '创建'}`} back={1}>
      <UsForm
        request={id ? getMiniAppDetail : false}
        onReset={() => console.log('重置呀')}
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
