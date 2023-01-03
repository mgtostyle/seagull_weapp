import React, { PropsWithChildren } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer } from '@components/usIndex'

const GoodsList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { title } = (getCurrentInstance as any)().router.params

  const containerColumns = [
    {
      name: '创建分类',
      result: () => toGoodsEdit()
    },
    {
      name: '重置查询条件及内容',
      result: () => console.log('重置')
    },
    {
      name: '设置为快捷入口',
      result: () => console.log('设置成功')
    }
  ]

  const toGoodsEdit = (id?: number) => {
    let params = {
      url: '/wfood/pages/goodsMent/update'
    }
    if (id) params.url = `${params.url}?id=${id}`
    Taro.navigateTo(params)
  }

  return (
    <UsContainer
      title={title}
      back={2}
      setting
      columns={containerColumns}
    ></UsContainer>
  )

}

export default GoodsList;