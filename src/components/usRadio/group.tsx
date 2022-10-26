import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsRadioGroup extends Component<PropsWithChildren<PageGroupProps>> {

  render (): ReactNode {
    const { children: parentChildren, initialValue, nodeKey, onChange, ...params }: PageGroupProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    return (
      <View
        className={`${less.block_radio_group_container} ${less[nodeClass]}`}
        {...params}
      >
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'group',
          initialValue,
          onChange: (value: string | number) => typeof onChange === 'function' && onChange({
            value
          })
        }))}
      </View>
    )
  }

}

export default UsRadioGroup;
