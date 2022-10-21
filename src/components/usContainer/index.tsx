import React, { Component, ReactNode } from 'react'
import type { PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

class UsContainer extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  render (): ReactNode {
    console.log(this.props)
    const { global, title }: PageProps = this.props
    const { navigate, safeAreaHeight } = global || {}
    return (
      <React.Fragment>
        <View
          className={less.block_navigate}
          style={{
            padding: `${navigate.yTop}px ${navigate.xBetween}px ${navigate.yBottom}px`,
            height: `${navigate.bHeight}px`
          }}
        >
          <View className={`${less.inline_icon} iconfont`}>&#xe739;</View>
          <Text className={less.inline_title}>{title}</Text>
        </View>
        <View
          className={less.block_container}
          style={{
            paddingBottom: `${safeAreaHeight}rpx`
          }}
        >{this.props.children}</View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsContainer);