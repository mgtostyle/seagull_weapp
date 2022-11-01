import React, { Component, ReactNode, PropsWithChildren } from "react"
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsButtonGroup extends Component<PropsWithChildren<PageGroupProps>> {

  static defaultProps: PageGroupProps = {
    block: true,
    size: 'default',
    theme: 'primary'
  }

  render (): ReactNode {
    const { size }: PageGroupProps = this.props
    return (
      <View className={less.block_button_group_container}>
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'Group',
          size,
          
        }))}
      </View>
    )
  }

}

export default UsButtonGroup;