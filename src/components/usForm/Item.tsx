import { PureComponent, ReactNode, PropsWithChildren } from 'react'
import type { PageItemProps } from './interface'
import less from './index.module.less'
import { View, Text, Label } from '@tarojs/components'

class UsFormItem extends PureComponent<PropsWithChildren<PageItemProps>> {

  static defaultProps: PageItemProps = {
    label: '',
    direction: 'vertical'
  }

  render (): ReactNode {
    const { label, direction, nodeKey }: PageItemProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    return (
      <View className={`${less.block_item_container} ${less[direction]} ${less[nodeClass]}`}>
        {label && (<Text>{label}</Text>)}
        <Label>{this.props.children}</Label>
      </View>
    )
  }

}

export default UsFormItem;