import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, CurrentIndex } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

class UsTabbar extends Component<PropsWithChildren<PageProps>> {

  render (): ReactNode {
    const { global, list, current, change }: PageProps = this.props
    return (
      <React.Fragment>
        <View
          className={less.back_offset}
          style={{
            paddingBottom: `${global.safeAreaHeight}rpx`
          }}
        />
        <View
          className={less.back_container}
          style={{
            paddingBottom: `${global.safeAreaHeight}rpx`
          }}
        >
          {list.map((item: any, index: CurrentIndex) => (
            <View
              className={`${less.inline_box} ${(current || 0) === index && less.active}`}
              key={index}
              onClick={() => typeof change === 'function' && change(index)}
            >
              <View className={`${less.icon} iconfont ${item.icon}`} />
              <View className={less.name}>{item.name}</View>
            </View>
          ))}
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsTabbar);