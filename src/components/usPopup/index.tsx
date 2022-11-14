import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsPopup extends Component<PropsWithChildren<PageProps>> {

  render (): ReactNode {
    return (
      <View className={less.block_index_dropback}>
        <View className={less.inline_index_card}></View>
      </View>
    )
  }

}

export default UsPopup;
