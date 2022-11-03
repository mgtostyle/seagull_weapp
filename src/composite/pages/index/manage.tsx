import React, { PropsWithChildren } from 'react'
import type { PageManageProps } from './interface'
import './manage.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsButton } from '@components/usIndex'

const Manage: React.FC<PropsWithChildren<PageManageProps>> = () => {

  const onAdds = () => {
    Taro.navigateTo({
      url: '/composite/pages/miniApp/update'
    })
  }

  return (
    <React.Fragment>
      <UsButton onClick={onAdds}>新增</UsButton>
      <View className="block_index_list">
        {}
      </View>
    </React.Fragment>
  )

}

export default Manage;
