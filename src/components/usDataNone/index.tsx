import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

import { UsButton } from '@components/usIndex'

class UsDataNone extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    backgroundColor: 'transparent',
    is: true,
    icon: 'icon-line-document1',
    buttonText: ''
  }

  render (): ReactNode {
    const { backgroundColor, is, icon, buttonText, buttonConfig }: PageProps = this.props
    return (
      <View
        className={less.block_index_container}
        style={{
          backgroundColor
        }}
      >
        {is && (
          <View className={`${less.icon} iconfont ${icon}`} />
        )}
        <View className={less.content}>･ {this.props.children || '暂无数据'} ･</View>
        {buttonText && (
          <UsButton
            className={less.button}
            size="mini"
            {...buttonConfig}
          >{buttonText}</UsButton>
        )}
      </View>
    )
  }

}

export default UsDataNone;