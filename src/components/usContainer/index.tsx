import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

class UsContainer extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  static defaultProps: PageProps = {
    back: 2,
    title: '',
    menu: []
  }

  render (): ReactNode {
    const { back, title }: PageProps = this.props
    const { navigate, safeAreaHeight } = this.props.global
    return (
      <React.Fragment>
        <View
          className={less.block_navigate}
          style={{
            padding: `${navigate.yTop}px ${navigate.xBetween}px ${navigate.yBottom}px`,
            height: `${navigate.bHeight}px`
          }}
        >
          {back === 1 ? (
            <View
              className={`${less.inline_single_icon} iconfont`}
              style={{
                left: `${navigate.xBetween}px`,
                width: `${navigate.bHeight}px`,
                height: `${navigate.bHeight}px`
              }}
            >&#xe739;</View>
          ) : back === 2 && (
            <React.Fragment>
              <View
                className={less.inline_icon_box}
                style={{
                  left: `${navigate.xBetween}px`,
                  width: `${navigate.bWidth - 1}px`,
                  height: `${navigate.bHeight - 1}px`
                }}
              >
                <View className={`${less.left_icon} iconfont`}>&#xe739;</View>
                <View className={less.line} />
                <View className={`${less.right_icon} iconfont`}>&#xe750;</View>
              </View>
            </React.Fragment>
          )}
          <Text className={less.inline_title}>{title}</Text>
        </View>
        <View
          className={less.block_container}
          style={{
            paddingTop: `${navigate.yTop + navigate.yBottom + navigate.bHeight}px`,
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