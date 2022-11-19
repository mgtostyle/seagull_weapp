import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsActionSheet } from '../usIndex'

class UsContainer extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>, PageState> {

  private actionSheet;
  static defaultProps: PageProps = {
    back: 0,
    setting: false,
    title: '',
    columns: [],
    isfull: true,
    bcolor: '#ffffff',
    tabbar: false
  }

  constructor (props) {
    super (props)
    this.state = {
      isHead: false
    }
  }

  componentDidMount(): void {
    this.props.childRef && this.props.childRef(this)
  }

  render (): ReactNode {
    const { back, setting, title, columns, isfull, bcolor, tcolor, tabbar }: PageProps = this.props
    const { isHead }: PageState = this.state
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
            <React.Fragment>
              {isHead ? (
                <View
                  className={`${less.inline_single_icon} iconfont icon-line-home`}
                  style={{
                    left: `${navigate.xBetween}px`,
                    width: `${navigate.bHeight - 1}px`,
                    height: `${navigate.bHeight - 1}px`
                  }}
                  onClick={() => Taro.navigateBack()}
                />
              ) : (
                <View
                  className={`${less.inline_single_icon} iconfont ${setting ? 'icon-line-open2' : 'icon-line-left'}`}
                  style={{
                    left: `${navigate.xBetween}px`,
                    width: `${navigate.bHeight - 1}px`,
                    height: `${navigate.bHeight - 1}px`,
                    fontSize: setting ? '36rpx' : '30rpx'
                  }}
                  onClick={() => setting ? this.actionSheet.message({ tabbar, columns }) : Taro.navigateBack()}
                />
              )}
            </React.Fragment>
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
                  className={`${less.left_icon} iconfont ${isHead ? 'icon-line-home' : 'icon-line-left'}`}
                  style={{
                    fontSize: isHead ? '36rpx' : '30rpx'
                  }}
                  onClick={() => Taro.navigateBack()}
                />
                <View className={less.line} />
                <View
                  className={`${less.right_icon} iconfont icon-line-open2`}
                  onClick={() => this.actionSheet.message({ tabbar, columns })}
                />
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
            paddingTop: isfull ? `${navigateHeight}px` : 0
          }}
        />
        <React.Fragment>{this.props.children}</React.Fragment>
        <View
          className={less.block_index_padding}
          style={{
            paddingBottom: `${safeAreaHeight}rpx`
          }}
        />
        <UsActionSheet childRef={ref => this.actionSheet = ref} />
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsContainer);
