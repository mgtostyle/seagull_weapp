import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { CheckboxGroup } from '@tarojs/components'

class UsCheckboxGroup extends Component<PropsWithChildren<PageGroupProps>> {

  render (): ReactNode {
    const { children: parentChildren, ...params }: PageGroupProps = this.props
    return (
      <CheckboxGroup
        className={less.block_checkbox_group_container}
        {...params}
      >
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          nodeKey: 'group'
        }))}
      </CheckboxGroup>
    )
  }

}

export default UsCheckboxGroup;
