import React, { PureComponent, ReactNode, PropsWithChildren } from 'react'
import type { PageItemProps, FieldValue } from './interface'
import less from './index.module.less'
import { View, Text, Label } from '@tarojs/components'

class UsFormItem extends PureComponent<PropsWithChildren<PageItemProps>> {

  static defaultProps: PageItemProps = {
    label: '',
    name: '',
    direction: 'vertical'
  }

  render (): ReactNode {
    const { label, name, direction, initialValues, nodeKey, setFieldValue }: PageItemProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    return (
      <View className={`${less.block_item_container} ${less[direction]} ${less[nodeClass]}`}>
        {label && (<Text>{label}</Text>)}
        <Label for={name}>
          {React.Children.map(this.props.children, childrenNode => {
            let childrenProps = {
              nodeKey: 'Item',
              name,
              initialValue: initialValues?.[name],
              setFieldValue: (fieldValue: FieldValue) => typeof setFieldValue === 'function' && setFieldValue({
                update: true,
                ...fieldValue,
                name
              })
            }
            // if (initialValue) childrenProps.initialValue = initialValue
            return React.cloneElement(childrenNode as any, childrenProps)
          })}
        </Label>
      </View>
    )
  }

}

export default UsFormItem;