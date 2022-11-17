import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, ColumnItem } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

class UsActionSheet extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  static defaultProps: PageProps = {
    zIndex: 100,
    navigate: true,
    tabbar: false,
    columns: []
  }

  render (): ReactNode {
    const { zIndex, columns }: PageProps = this.props
    return (
      <View
        className={less.block_index_dropback}
        style={{
          zIndex
        }}
      >
        {Boolean(columns?.length) && columns?.map((item: ColumnItem, index: number) => (
          <UsButton
            className={less.inline_sheet}
            key={index}
            theme="default"
          >{item.content}</UsButton>
        ))}
        <View className={less.inline_cancel}>
          <UsButton
            theme="default"
          >取消</UsButton>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsActionSheet);