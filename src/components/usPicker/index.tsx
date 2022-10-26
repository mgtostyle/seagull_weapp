import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import { View, ScrollView } from '@tarojs/components'
import { connect } from 'react-redux'

class UsPicker extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    icon: 'icon-line-open2',
    placeholder: '',
    initialValue: '',
    modal: {
      title: '',
      range: []
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      initialValue: props.initialValue,
      visible: true,
      current: 0
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

  private getRangeIndex (index: number) {
    this.setState((state: PageState) => {
      state.initialValue = state.initialValue.slice(0, index + 1)
      state.current = index
      return state;
    })
  }

  private getRangeCurrentList (list, index = 0) {
    const { initialValue, current }: PageState = this.state
    if (typeof current !== 'number' || current === NaN) {
      return []
    } else if (current > index) {
      return this.getRangeCurrentList(list?.find((item: any) => item.value === [initialValue[index]])?.children || [], index + 1)
    } else if (current === index) {
      return list?.find((item: any) => item.value === [initialValue[index]])?.children || []
    } else {
      return []
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
                      onClick={() => this.getRangeIndex(index)}
                    >
                      <View className={less.line_circle} style={{ borderColor: theme }} />
                      <View className={less.line_messa}>
                        <View className={less.text}>{item}</View>
                        <View className={`${less.icon} iconfont icon-line-edit`} />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <ScrollView className={less.body_list} scrollY>
                <View className={less.result_line}>
                  {this.getRangeCurrentList(modal.range).map((element: any) => (
                    <View>{element.label}</View>
                  ))}
                </View>
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