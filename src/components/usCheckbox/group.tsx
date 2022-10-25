import { Component, ReactNode, PropsWithChildren, Children, cloneElement } from 'react'
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { CheckboxGroup } from '@tarojs/components'

class UsCheckboxGroup extends Component<PropsWithChildren<PageGroupProps>> {

  render (): ReactNode {
    const { children: parentChildren, ...params }: PageGroupProps = this.props
    const children = Children.map(parentChildren, (children: any) => {
      return cloneElement(children, {
        nodeKey: 'group'
      })
    })
    return (
      <CheckboxGroup
        className={less.block_checkbox_group_container}
        {...params}
      >{children}</CheckboxGroup>
    )
  }

}

export default UsCheckboxGroup;
