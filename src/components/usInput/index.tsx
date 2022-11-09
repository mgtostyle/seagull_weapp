import { Component, ReactNode, PropsWithChildren } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsInput extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  render (): ReactNode {
    const { placeholderClass, initialValue, ...params }: PageProps = this.props
    if (initialValue) params.value = initialValue
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
