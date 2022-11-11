import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState, MenuItem } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

class UsContainer extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>, PageState> {

  static defaultProps: PageProps = {
    back: 0,
    setting: false,
    title: '',
    menus: [],
    isfull: true,
    bcolor: '#ffffff',
    tabbar: false
  }

  constructor (props) {
    super (props)
    this.state = {
      isHead: false,
      visible: false
    }
  }

  private onDropBack () {
    this.setState((state: PageState) => {
      state.visible = !state.visible
      return state;
    })
  }

  private onMenuResult (e, item: MenuItem) {
    e.stopPropagation()
    typeof item.result === 'function' && item.result()
  }

  render (): ReactNode {
    const { back, setting, title, menus, isfull, bcolor, tcolor, tabbar }: PageProps = this.props
    const { isHead, visible }: PageState = this.state
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
                  onClick={() => setting ? this.onDropBack() : Taro.navigateBack()}
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
                  onClick={() => this.onDropBack()}
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
        {visible && (
          <View
            className={less.block_menus_container}
            style={{
              paddingBottom: `calc(${safeAreaHeight}rpx ${tabbar ? '+ 110rpx' : ''})`
            }}
            onClick={() => this.onDropBack()}
          >
            {menus?.map((item: MenuItem, index: number) => (
              <UsButton
                className={less.inline_text}
                theme="default"
                key={index}
                onClick={(e) => this.onMenuResult(e, item)}
              >{item.name}</UsButton>
            ))}
            <UsButton
              className={less.inline_cancel}
              theme="default"
              onClick={() => this.onDropBack()}
            >取消</UsButton>
          </View>
        )}
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsContainer);
