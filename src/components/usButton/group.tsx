import React, { Component, ReactNode, PropsWithChildren } from "react"
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsButtonGroup extends Component<PropsWithChildren> {

  render (): ReactNode {
    return (
      <View className={less.block_button_group_container}>
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'ButtonGroup'
        }))}
      </View>
    )
  }

}

export default UsButtonGroup;