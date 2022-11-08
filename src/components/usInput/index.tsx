import { Component, ReactNode, PropsWithChildren } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsInput extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  render (): ReactNode {
    const { placeholderClass, initialValue, value, ...params }: PageProps = this.props
    return (
      <Input
        className={less.inline_input}
        {...params}
        value={initialValue}
        placeholderClass={`${less.inline_input_placeholder} ${placeholderClass}`}
      />
    )
  }

}

export default UsInput;