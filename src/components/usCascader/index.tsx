import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'

class UsCascader extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    value: '',
    placeholder: '请选择...',
    icon: 'icon-line-open2'
  }

  render(): ReactNode {
    const { value, placeholder, icon }: PageProps = this.props
    return (
      <React.Fragment>
        <View
          className={less.block_container}
          onClick={() => this.setState({ visible: true })}
        >
          <View className={`${less[value ? 'value' : 'placeholder']} ${less.inline_text}`}>{value || placeholder}</View>
          <View className={`${less.inline_icon} iconfont ${icon}`} />
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsCascader)