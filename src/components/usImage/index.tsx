import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import { Image } from '@tarojs/components'

export default class UsImage extends Component<PropsWithChildren<PageProps>, PageState> {

  static defaultProps: PageProps = {
    className: '',
    shape: 'square',
    src: ''
  }

  constructor (props: PageProps) {
    super (props)
    this.state = {
      visible: false
    }
  }

  private getError () {
    const { onError }: PageProps = this.props
    this.setState({ visible: false })
    typeof onError === 'function' && onError()
  }

  render (): ReactNode {
    const { className, shape, onError, onLoad, ...params }: PageProps = this.props
    return (
      <React.Fragment>
        <Image
          className={`${less.block_image_container} ${className} ${less[shape]} ${!this.state?.visible && less.hidden}`}
          {...params}
          onLoad={() => this.setState({ visible: true })}
          onError={() => this.getError()}
        />
      </React.Fragment>
    )
  }

}
