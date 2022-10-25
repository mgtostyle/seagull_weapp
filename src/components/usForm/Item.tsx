import { PureComponent, ReactNode, PropsWithChildren, Children, cloneElement } from 'react'
import type { PageItemProps } from './interface'
import less from './index.module.less'
import { View, Text, Label } from '@tarojs/components'

class UsFormItem extends PureComponent<PropsWithChildren<PageItemProps>> {

  static defaultProps: PageItemProps = {
    label: '',
    name: '',
    direction: 'vertical'
  }

  render (): ReactNode {
    const { label, name, direction, nodeKey }: PageItemProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    const children = Children.map(this.props.children, (children: any) => {
      return cloneElement(children, {
        nodeKey: 'Item',
        name
      })
    })
    return (
      <View className={`${less.block_item_container} ${less[direction]} ${less[nodeClass]}`}>
        {label && (<Text>{label}</Text>)}
        <Label for={name}>{children}</Label>
      </View>
    )
  }

}

export default UsFormItem;