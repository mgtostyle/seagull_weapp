import React, { PropsWithChildren, Component, ReactNode } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsBadge extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {

  }

  render (): ReactNode {
    return (
      <View className={less.block_index_container}>
        <View className={less.inline_badge}>99+</View>
        <React.Fragment>{this.props.children}</React.Fragment>
      </View>
    )
  }

}

export default UsBadge;