import { Component, ReactNode, PropsWithChildren, Children, cloneElement } from 'react'
import type { PageGroupProps } from './interface'
import less from './index.module.less'
import { RadioGroup } from '@tarojs/components'

class UsRadioGroup extends Component<PropsWithChildren<PageGroupProps>> {

  render (): ReactNode {
    const { children: parentChildren, ...params }: PageGroupProps = this.props
    const children = Children.map(parentChildren, (children: any) => {
      return cloneElement(children, {
        nodeKey: 'group'
      })
    })
    return (
      <RadioGroup
        className={less.block_radio_group_container}
        {...params}
      >{children}</RadioGroup>
    )
  }

}

export default UsRadioGroup;
