import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageItemProps } from './interface'
import less from './index.module.less'
import { View, Text, Label } from '@tarojs/components'

class UsFormItem extends Component<PropsWithChildren<PageItemProps>> {

  static defaultProps: PageItemProps = {
    label: '',
    direction: 'horizontal'
  }

  render (): ReactNode {
    const { label, direction }: PageItemProps = this.props
    return (
      <View
        className={`${less.block_item_container} ${direction}`}

      >
        {label && (<Text>{label}</Text>)}
        <Label>{this.props.children}</Label>
      </View>
    )
  }

}

export default UsFormItem;