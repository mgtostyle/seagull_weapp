import { PureComponent, ReactNode, PropsWithChildren, Children, cloneElement } from "react"
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsFormItemGroup extends PureComponent<PropsWithChildren> {

  render (): ReactNode {
    const children = Children.map(this.props.children, (children: any) => {
      return cloneElement(children, {
        nodeKey: 'ItemGroup'
      })
    })
    return (
      <View className={less.block_item_group_container}>{children}</View>
    )
  }

}

export default UsFormItemGroup;