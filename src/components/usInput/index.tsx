import { Component, ReactNode, PropsWithChildren } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsInput extends Component<PropsWithChildren<PageProps>> {

  render (): ReactNode {
    const { placeholderClass, ...params }: PageProps = this.props
    return (
      <Input
        className={less.inline_input}
        {...params}
        placeholderClass={`${less.inline_input_placeholder} ${placeholderClass}`}
      />
    )
  }

}

export default UsInput;