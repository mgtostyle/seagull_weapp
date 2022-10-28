import React, { PureComponent, ReactNode, PropsWithChildren } from "react"
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsFormItemGroup extends PureComponent<PropsWithChildren> {

  render (): ReactNode {
    return (
      <View className={less.block_item_group_container}>
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'ItemGroup',
          direction: 'horizontal'
        }))}
      </View>
    )
  }

}

export default UsFormItemGroup;