import React, { Component, ReactNode } from 'react'
import type { PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Button } from '@tarojs/components'

class UsButton extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    block: false,
    size: 'large',
    theme: 'primary',
    ghost: true
  }

  get style () {
    const { block, size, theme, ghost }: PageProps = this.props
    const style = Object.assign(
      {
        display: block ? 'block' : 'inline'
      },
      size === 'small' ? {
        fontSize: '24rpx',
        padding: '12rpx 20rpx'
      } : size === 'default' ? {
        fontSize: '28rpx',
        padding: '15rpx 25rpx'
      } : size === 'large' && {
        fontSize: '32rpx',
        padding: '18rpx 30rpx'
      },
      theme === 'primary' ? this.ghost(ghost, '#0052d9')
        : theme === 'danger' ? this.ghost(ghost, '#e34d59')
        : theme === 'default' && this.ghost(true, '#262626')
    )
    return style
  }

  private ghost (status: boolean, rgba: string) {
    return status ? {
      color: rgba,
      border: `1px solid ${rgba}`
    } : {
      color: '#ffffff',
      backgroundColor: rgba
    }
  }

  render (): ReactNode {
    return (
      <Button
        className={less.block_container}
        style={this.style}
      >{this.props.children}</Button>
    )
  }

}

export default UsButton;
