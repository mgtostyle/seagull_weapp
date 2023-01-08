import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsCheckbox extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    className: '',
    value: '',
    color: less.usTextColor,
    checked: false,
    disabled: false,
    direction: 'left'
  }

  render (): ReactNode {
    const { className, value, color, checked, disabled, direction, setFieldValue }: PageProps = this.props
    return (
      <View
        className={`${less.block_container} ${less[direction]} ${className}`}
        onClick={() => !disabled && typeof setFieldValue === 'function' && setFieldValue(isNaN(Number(value)) ? value.toString() : Number(value), !checked)}
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
