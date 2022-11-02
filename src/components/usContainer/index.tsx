import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

class UsContainer extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  static defaultProps: PageProps = {
    back: 0,
    title: '',
    menu: [],
    isfull: false,
    bcolor: '#ffffff'
  }

  render (): ReactNode {
    const { back, title, isfull, bcolor, tcolor }: PageProps = this.props
    const { navigate, navigateHeight, safeAreaHeight } = this.props.global
    return (
      <React.Fragment>
        <View
          className={less.block_navigate}
          style={{
            padding: `${navigate.yTop}px ${navigate.xBetween}px ${navigate.yBottom}px`,
            height: `${navigate.bHeight}px`,
            background: isfull ? bcolor : 'transparent',
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
              onClick={() => Taro.navigateBack()}
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
                <View
                  className={`${less.left_icon} iconfont`}
                  onClick={() => Taro.navigateBack()}
                >&#xe739;</View>
                <View className={less.line} />
                <View className={`${less.right_icon} iconfont`}>&#xe750;</View>
              </View>
            </React.Fragment>
          )}
          <Text
            className={less.inline_title}
            style={Object.assign({}, tcolor && { color: tcolor })}
          >{title}</Text>
        </View>
        <View
          className={less.block_index_padding}
          style={{
            paddingTop: isfull ? 0 : `${navigateHeight}px`
          }}
        />
        <React.Fragment>{this.props.children}</React.Fragment>
        <View
          className={less.block_index_padding}
          style={{
            paddingBottom: `${safeAreaHeight}rpx`
          }}
        />
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsContainer);