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

  static state: PageState = {
    visible: false
  }

  render (): ReactNode {
    const { className, shape, onError, onLoad, ...params }: PageProps = this.props
    return (
      <React.Fragment>
        <Image
          className={`${less.block_image_container} ${className} ${less[shape]} ${!this.state?.visible && less.hidden}`}
          {...params}
          onLoad={() => this.setState({ visible: true })}
          onError={() => this.setState({ visible: false })}
        />
      </React.Fragment>
    )
  }

}
