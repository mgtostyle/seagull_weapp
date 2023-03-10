import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

class UsRadio extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>> {

  render (): ReactNode {
    const { initialValue, value, setFieldValue }: PageProps = this.props
    const { theme } = this.props.global
    return (
      <View
        className={less.block_container}
        onClick={() => typeof setFieldValue === 'function' && setFieldValue(isNaN(Number(value)) ? value.toString() : Number(value))}
      >
        <View
          className={less.text}
          style={{
            color: value === initialValue ? theme : less.usTextColor
          }}
        >{this.props.children}</View>
        {value === initialValue && (
          <View
            className={less.icon}
            style={{
              color: theme
            }}
          >√</View>
        )}
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsRadio);
