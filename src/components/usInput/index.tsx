import { Component, ReactNode, PropsWithChildren } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsInput extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  private onInput (e) {
    const { onChange } = this.props
    const { value } = e.detail
    typeof onChange === 'function' && onChange({
      value: isNaN(Number(value)) ? value.toString() : Number(value)
    })
  }

  render (): ReactNode {
    const { className, placeholderClass, initialValue, onChange, ...params }: PageProps = this.props
    if (initialValue) params.value = initialValue
    return (
      <Input
        className={`${className} ${less.inline_input} ${params.disabled && less.disabled}`}
        {...params}
        placeholderClass={`${less.inline_input_placeholder} ${placeholderClass}`}
        onInput={e => this.onInput(e)}
      />
    )
  }

}

export default UsInput;
