import React, { PureComponent, ReactNode, PropsWithChildren } from "react"
import type { PageItemGroupProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsFormItemGroup extends PureComponent<PropsWithChildren<PageItemGroupProps>> {

  static defaultProps: PageItemGroupProps = {
    label: ''
  }

  render (): ReactNode {
    const { label, setFieldValue }: PageItemGroupProps = this.props
    return (
      <React.Fragment>
        {label && (<View className={less.block_item_group_label}>{label}</View>)}
        <View className={less.block_item_group_container}>
          {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
            nodeKey: 'ItemGroup',
            direction: 'horizontal',
            setFieldValue
          }))}
        </View>
      </React.Fragment>
    )
  }

}

export default UsFormItemGroup;