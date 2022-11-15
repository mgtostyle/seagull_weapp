import { Component, ReactNode, PropsWithChildren } from 'react'
import type { CheckProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsCheckbox extends Component<PropsWithChildren<CheckProps>> {

  static defaultProps: CheckProps = {
    className: '',
    value: '',
    color: less.usTextColor,
    checked: false,
    direction: 'left'
  }

  render (): ReactNode {
    const { className, value, color, checked, direction, onChange }: CheckProps = this.props
    return (
      <View
        className={`${less.block_container} ${less[direction]} ${className}`}
        onClick={() => typeof onChange === 'function' && onChange(isNaN(Number(value)) ? value.toString() : Number(value), !checked)}
      >
        <View
          className={`${less.icon} ${less[checked.toString()]}`}
          style={{
            backgroundColor: checked ? color : 'transparent',
            borderColor: checked ? color : less.usSplitColor
          }}
        >{checked && '√'}</View>
        <View className={less.content}>{this.props.children}</View>
      </View>
    )
  }

}

export default UsCheckbox;
