import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Image } from '@tarojs/components'

export default class UsImage extends Component<PropsWithChildren<PageProps>> {
  
  render (): ReactNode {
    const { className, src }: PageProps = this.props
    return (
      <Image
        className={`${less.block_image_container} ${className}`}
        src={src}
      />
    )
  }

}