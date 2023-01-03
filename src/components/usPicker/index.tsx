import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsRadio } from '../usIndex'

class UsPicker extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    icon: 'icon-line-open2',
    placeholder: '',
    initialValue: [1],
    modal: {
      title: '',
      range: []
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      initialValue: props.initialValue,
      visible: false,
      current: props.initialValue.length - 1
    }
  }

  private setReduce (list, init, index = 0, newArray = new Array()) {
    const item = list.find((item: any) => item.value === init?.[index])
    if (item) {
      return Array.isArray(item?.children) ? this.setReduce(item.children, init, index+1, newArray.concat([item.label])) : newArray.concat([item.label])
    } else {
      return newArray;
    }
  }

  private setRangeList (list, index = 0) {
    const { initialValue, current }: PageState = this.state
    if (typeof current !== 'number') {
      return []
    } else if (current > index) {
      return this.setRangeList(list?.find((item: any) => +item.value === +[initialValue[index]])?.children || [], index + 1)
    } else if (current === index) {
      return list
    } else {
      return []
    }
  }

  private onChange (value) {
    const { modal, onChange, setChange }: PageProps = this.props
    const detail = this.setRangeList(modal.range).find((item: any) => item.value === value)
    if (detail?.children) {
      this.setState((state: PageState) => {
        state.initialValue = state.initialValue.slice(0, state.current).concat([value])
        state.current = state.current + 1
        return state;
      })
    } else {
      this.setState((state: PageState) => {
        state.initialValue = state.initialValue.slice(0, state.current).concat([value]),
        state.visible = false
        return state;
      }, () => {
        typeof onChange === 'function' && onChange({ value: this.state.initialValue })
        typeof setChange === 'function' && setChange(this.state.initialValue)
      })
    }
  }

  render (): ReactNode {
    const { icon, placeholder, modal }: PageProps = this.props
    const { safeAreaHeight, theme } = this.props.global
    const { initialValue, visible, current }: PageState = this.state
    const rangeArray = this.setReduce(modal.range, initialValue)
    const value = rangeArray.join(' · ')
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
            <View className={less.inline_modal_body}>
              <ScrollView className={less.body_result} scrollY>
                <View className={less.result_line}>
                  {rangeArray.map((item: string, index: number) => (
                    <View
                      className={less.line_box}
                      key={index}
                      onClick={() => this.setState({ current: index })}
                    >
                      <View className={less.line_circle} style={{ borderColor: theme }} />
                      <View className={less.line_messa}>
                        <View
                          className={less.text}
                          style={{
                            color: current === index ? theme : less.usTextColor
                          }}
                        >{item}</View>
                        <View
                          className={`${less.icon} iconfont icon-line-edit`}
                          style={{
                            color: current === index ? theme : less.usTextColor
                          }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <ScrollView className={less.body_list} scrollY>
                <UsRadio.Group
                  initialValue={initialValue[current]}
                  onChange={(e) => this.onChange(e.value)}
                >
                  {this.setRangeList(modal.range).map((element: any, index: number) => (
                    <UsRadio value={element.value} key={index}>{element.label}</UsRadio>
                  ))}
                </UsRadio.Group>
              </ScrollView>
            </View>
          </View>
        </View>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsPicker)
