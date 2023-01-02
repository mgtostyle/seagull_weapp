import React, { PropsWithChildren } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer } from '@components/usIndex'

const GoodsPublish: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { title } = (getCurrentInstance as any)().router.params

  return (
    <UsContainer
      title={title}
      back={2}
      setting
    ></UsContainer>
  )

}

export default GoodsPublish;