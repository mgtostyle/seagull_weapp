import React, { PureComponent, ReactNode, PropsWithChildren } from 'react'
import type { PageItemProps, FieldValue } from './interface'
import less from './index.module.less'
import { View, Text, Label } from '@tarojs/components'

class UsFormItem extends PureComponent<PropsWithChildren<PageItemProps>> {

  static defaultProps: PageItemProps = {
    label: '',
    name: '',
    direction: 'vertical',
    initialValue: ''
  }

  render (): ReactNode {
    const { label, name, direction, initialValue, nodeKey, setFieldValue }: PageItemProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    return (
      <View className={`${less.block_item_container} ${less[direction]} ${less[nodeClass]}`}>
        {label && (<Text>{label}</Text>)}
        <Label for={name}>
          {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
            nodeKey: 'Item',
            name,
            initialValue,
            onChange: (fieldValue: FieldValue) => typeof setFieldValue === 'function' && setFieldValue({
              ...fieldValue,
              name,
            })
          }))}
        </Label>
      </View>
    )
  }

}

export default UsFormItem;