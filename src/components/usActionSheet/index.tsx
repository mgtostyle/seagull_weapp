import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState, ColumnItem } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

class UsActionSheet extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>, PageState> {

  constructor (props) {
    super (props)
    this.state = {
      visible: false,
      zIndex: 99,
      tabbar: false,
      columns: []
    }
  }

  componentDidMount () {
    this.props.childRef && this.props.childRef(this)
  }

  message (prevState: PageState) {
    this.setState((state: PageState) => Object.assign(state, prevState, {
      visible: true
    }))
  }

  render (): ReactNode {
    const { visible, zIndex, tabbar, columns }: PageState = this.state
    const { safeAreaHeight } = this.props.global
    return (
      <View
        className={less.block_index_dropback}
        style={{
          paddingBottom: `calc(${safeAreaHeight}rpx + ${tabbar ? 110 : 0}rpx)`,
          zIndex,
          display: visible ? 'flex' : 'none'
        }}
        onClick={() => this.setState({ visible: false })}
      >
        {Boolean(columns?.length) && columns?.map((item: ColumnItem, index: number) => (
          <UsButton
            className={less.inline_sheet}
            key={index}
            theme="default"
            shape="square"
            onClick={() => typeof item.result === 'function' && item.result()}
          >{item.name}</UsButton>
        ))}
        <View className={less.inline_cancel}>
          <UsButton theme="default" shape="square">取消</UsButton>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsActionSheet);