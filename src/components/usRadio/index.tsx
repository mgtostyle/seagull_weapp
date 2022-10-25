import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Radio } from '@tarojs/components'

class UsRadio extends Component<PropsWithChildren<PageProps>> {
  
  render (): ReactNode {
    const { children, ...params }: PageProps = this.props
    return (
      <Radio
        className={less.block_container}
        {...params}
      >{children}</Radio>
    )
  }

}

export default UsRadio;