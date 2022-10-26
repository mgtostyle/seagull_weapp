import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { RadioGroup } from '@tarojs/components'

class UsRadioGroup extends Component<PropsWithChildren<PageGroupProps>> {

  render (): ReactNode {
    const { children: parentChildren, ...params }: PageGroupProps = this.props
    return (
      <RadioGroup
        className={less.block_radio_group_container}
        {...params}
      >
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'group'
        }))}
      </RadioGroup>
    )
  }

}

export default UsRadioGroup;
