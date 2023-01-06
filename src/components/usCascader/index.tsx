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
    icon: 'icon-line-open2',
    modal: {
      title: '选择',
      range: [
        {
          label: 'haha1',
          value: 1,
          children: [
            {
              label: 'dasdas3',
              value: 3,
              children: [
                {
                  label: 'rewrwe5',
                  value: 5
                }
              ]
            },
            {
              label: 'vxcvxce4',
              value: 4
            }
          ]
        },
        {
          label: 'nrtntr2',
          value: 2
        }
      ]
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  onChange (value) {
    const { onChange }: PageProps = this.props
    this.setState({
      visible: false
    }, () => typeof onChange === 'function' && onChange({ value }))
  }

  setRangeChildDetail (list) {
    const { initialValue }: PageProps = this.props
    return list.map((element, index: number) => (
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
    return list.map((curr) => {
      let currentLabel = [label, curr.label].filter(value => Boolean(value)).join(' - ')
      if (curr.value === currentValue) {
        return currentLabel
      } else if (Array.isArray(curr.children)) {
        return this.getFieldValue(curr.children, currentValue, currentLabel)
      }
    }).join('')
  }

  render(): ReactNode {
    const { initialValue, placeholder, icon, modal }: PageProps = this.props
    const { safeAreaHeight } = this.props.global
    const { visible }: PageState = this.state
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
            <ScrollView className={less.inline_modal_body} scrollY>{this.setRangeChildDetail(modal?.range || [])}</ScrollView>
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