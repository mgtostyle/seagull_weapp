import React, { PropsWithChildren, useState } from 'react'
import type { PageUpdateProps } from './interface'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'

import { UsContainer, UsForm, UsInput, UsTextArea, UsUpload, UsArcProgressBar } from '@components/usIndex'

const MiniAppUpdate: React.FC<PropsWithChildren<{ props: PageUpdateProps, $apis }>> = ({ $apis }) => {

  const { id } = (getCurrentInstance as any)().router.params
  const [detail, setMiniAppDetail] = useState(null)

  useLoad(() => {
    id && getMiniAppDetail()
  })

  const getMiniAppDetail = () => {
    $apis.composite.setting.miniAppDetail.get(`/id/${id}`, 'Suffix').then(res => {
      setMiniAppDetail(res.data.detail)
    })
  }

  const [indexValue, setIndexValue] = useState(0)

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
    setIndexValue(indexValue + 1)
  }

  return (
    <UsContainer title="创建小程序平台" back={1}>
      <UsForm
        initialValues={{
          logo: [{
            url: 'http://127.0.0.1:3031/composite/images/20221007/ccdfc86e1bd7ab3cdbf0db2dc05d31f5.png'
          }]
        }}
        // request={async () => {
        //   let result = await $apis.composite.setting.miniAppDetail.get(`/id/${id}`, 'Suffix')
        //   return result.data.detail
        // }}
        onReset={() => console.log('重置呀')}
        onSubmit={onSubmit}
      >
        <UsForm.Item label="平台名称" name="title">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="Logo" name="logo">
          <UsUpload
            limit={1}
          />
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
