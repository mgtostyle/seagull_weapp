import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, CurrentIndex } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

class UsTabbar extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  render (): ReactNode {
    const { list, current, onChange }: PageProps = this.props
    const { safeAreaHeight } = this.props.global
    return (
      <React.Fragment>
        <View className={less.back_offset} />
        <View
          className={less.back_container}
          style={{
            paddingBottom: `${safeAreaHeight}rpx`
          }}
        >
          {list.map((item: any, index: CurrentIndex) => (
            <View
              className={`${less.inline_box} ${(current || 0) === index && less.active}`}
              key={index}
              onClick={() => typeof onChange === 'function' && onChange(index)}
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
