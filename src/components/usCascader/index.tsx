import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

class UsCascader extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    initialValue: '',
    placeholder: '请选择...',
    icon: 'icon-fill-down',
    modal: {
      title: '选择',
      range: []
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      modal: props.modal
    }
  }

  async componentDidMount () {
    typeof this.props.request === 'function' && this.props.request().then(values => {
      this.setState((state: any) => {
        state.modal.range = values
        return state
      })
    })
  }

  onChange (value) {
    const { setFieldValue }: PageProps = this.props
    this.setState({
      visible: false
    }, () => typeof setFieldValue === 'function' && setFieldValue({ value }))
  }

  setRangeChildDetail (list) {
    const { initialValue }: PageProps = this.props
    return Array.isArray(list) && list.map((element, index: number) => (
      <View className={less.inline_modal_range} key={index}>
        <View className={less.range_detail}>
          <View className={less.text}>{element.label}</View>
          {initialValue === element.value ? (
            <View className={less.text}>√</View>
          ) : (
            <UsButton
              size="mini"
              ghost
              onClick={() => this.onChange(element.value)}
            >选择</UsButton>
          )}
        </View>
        {Array.isArray(element.children) && (
          <View className={less.range_list}>{this.setRangeChildDetail(element.children)}</View>
        )}
      </View>
    ))
  }

  getFieldValue (list, currentValue, label: string = '') {
    return Array.isArray(list) && list.map((item) => {
      let currentLabel = [label, item.label].filter(value => Boolean(value)).join(' / ')
      if (item.value === currentValue) {
        return currentLabel
      } else if (Array.isArray(item.children)) {
        return this.getFieldValue(item.children, currentValue, currentLabel)
      }
    }).join('')
  }

  render(): ReactNode {
    const { initialValue, placeholder, icon }: PageProps = this.props
    const { safeAreaHeight } = this.props.global
    const { visible, modal }: PageState = this.state
    const value = this.getFieldValue(modal.range, initialValue)
    return (
      <React.Fragment>
        <View
          className={less.block_container}
          onClick={() => this.setState({ visible: true })}
        >
          <View className={`${less[value ? 'value' : 'placeholder']} ${less.inline_text}`}>{value || placeholder}</View>
          <View className={`${less.inline_icon} iconfont ${icon}`} />
        </View>
        <View
          className={`${less.block_modal_container} ${less[visible ? 'show' : 'hidden']}`}
          onClick={() => this.setState({ visible: false })}
        >
          <View
            className={less.block_modal}
            style={{
              paddingBottom: `${safeAreaHeight}rpx`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <View className={less.inline_modal_title}>
              <View className={less.title}>{modal.title}</View>
              <View className={`${less.icon} iconfont icon-line-subtraction`} />
            </View>
            <ScrollView className={less.inline_modal_body} scrollY>{this.setRangeChildDetail(modal?.range)}</ScrollView>
          </View>
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsCascader)