import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Textarea } from '@tarojs/components'

class UsTextArea extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  render (): ReactNode {
    const { placeholderClass, nodeKey, initialValue, value, ...params }: PageProps = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    return (
      <Textarea
        className={`${less.block_container} ${less[nodeClass]}`}
        {...params}
        value={initialValue}
        placeholderClass={`${less.inline_input_placeholder} ${placeholderClass}`}
      />
    )
  }

}

export default UsTextArea;