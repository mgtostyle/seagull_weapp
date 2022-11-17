import { Component, ReactNode, PropsWithChildren } from 'react'
import type { CheckProps } from './interface'
import less from './index.module.less'
import { Icon, View } from '@tarojs/components'

class UsCheckbox extends Component<PropsWithChildren<CheckProps>> {

  static defaultProps: CheckProps = {
    className: '',
    value: '',
    color: less.usTextColor,
    checked: false,
    disabled: false,
    direction: 'left'
  }

  render (): ReactNode {
    const { className, value, color, checked, disabled, direction, onChange }: CheckProps = this.props
    return (
      <View
        className={`${less.block_container} ${less[direction]} ${className}`}
        onClick={() => !disabled && typeof onChange === 'function' && onChange(isNaN(Number(value)) ? value.toString() : Number(value), !checked)}
      >
        <View
          className={[less.icon, checked && less.check, disabled && less.disable].filter(css => Boolean(css)).join(' ')}
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
