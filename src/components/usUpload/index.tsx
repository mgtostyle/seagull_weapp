import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsUpload extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: ''
  }

  private toInputValue () {
    typeof this.props.onChange === 'function' && this.props.onChange({
      value: 'dasdajsdasdasda'
    })
  }

  render (): ReactNode {
    return (
      <View style={{
        display: 'flex',
        height: 100,
        border: '1PX solid black'
      }} onClick={() => this.toInputValue()}>{this.props.initialValue}</View>
    )
  }

}

export default UsUpload;
