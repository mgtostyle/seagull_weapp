import { Component, ReactNode, PropsWithChildren, Children, cloneElement } from "react"
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsButtonGroup extends Component<PropsWithChildren> {

  render (): ReactNode {
    const children = Children.map(this.props.children, (children: any) => {
      return cloneElement(children, {
        nodeKey: 'ButtonGroup'
      })
    })
    return (
      <View
        className={less.block_button_group_container}
      >{children}</View>
    )
  }

}

export default UsButtonGroup;