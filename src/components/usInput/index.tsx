import { Component, ReactNode, PropsWithChildren } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsInput extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  private onInput (e) {
    const { setFieldValue } = this.props
    const { value } = e.detail
    typeof setFieldValue === 'function' && setFieldValue({
      value: isNaN(Number(value)) || value === '' ? value.toString() : Number(value),
      update: false
    })
  }

  render (): ReactNode {
    const { className, placeholderClass, initialValue, ...params }: PageProps = this.props
    if (initialValue) params.value = initialValue
    return (
      <Input
        className={`${className} ${less.inline_input} ${params.disabled && less.disabled}`}
        {...params}
        placeholderClass={`${less.inline_input_placeholder} ${placeholderClass}`}
        onFocus={e => this.onInput(e)}
        onInput={e => this.onInput(e)}
      />
    )
  }

}

export default UsInput;
