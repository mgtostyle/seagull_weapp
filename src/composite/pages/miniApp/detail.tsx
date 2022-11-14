import React, { PropsWithChildren, useState } from 'react'
import type { PageDetailProps } from './interface'
import './detail.less'
import { getCurrentInstance, useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsImage } from '@/components/usIndex'

const MiniAppDetail: React.FC<PropsWithChildren<{ props: PageDetailProps, $apis }>> = ({ $apis }) => {

  const { id, title } = (getCurrentInstance as any)().router.params

  const [detail, setMiniAppDetail] = useState<any>({})

  useLoad(() => {
    id && getMiniAppDetail()
  })

  const getMiniAppDetail = () => {
    $apis.composite.setting.miniAppDetail.get(`/id/${id}`).then(res => {
      setMiniAppDetail(res.data.detail)
    })
  }

  return (
    <UsContainer title={title} back={1}>
      <View className="block_index_detail">
        <UsImage
          className="detail_logo"
          src={detail?.logo}
          shape="circle"
          mode="aspectFill"
        />
        <View className="detail_title">{detail?.title || '--'}</View>
        {detail?.introduction && (
          <View className="detail_desc">{detail.introduction}</View>
        )}
      </View>
      <View className="block_index_administator">
        <View className="common_header">
          <View className="title">管理员</View>
          <View className="desc">共计 {0} 成员</View>
        </View>
        <View className="inline_admin_list">
          <View className="admin_item adds">
            <View className="image iconfont icon-line-subtraction1" />
            <View className="name">添加成员</View>
          </View>
        </View>
      </View>
    </UsContainer>
  )

}

export default MiniAppDetail;