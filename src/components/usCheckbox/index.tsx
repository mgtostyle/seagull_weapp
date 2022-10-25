import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Checkbox } from '@tarojs/components'

class UsCheckbox extends Component<PropsWithChildren<PageProps>> {

  render (): ReactNode {
    return (
      <Checkbox
        className={less.block_container}
        {...this.props}
      >{this.props.children}</Checkbox>
    )
  }

}

export default UsCheckbox;
