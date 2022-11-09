import React, { PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsInput, UsButton } from '@components/usIndex'

const QuerySelect: React.FC<PropsWithChildren<PageProps>> = (props) => {

  const storeGlobal = useSelector(state => (state as any).global)

  const defaultProps: PageProps = Object.assign({
    placeholder: '请输入关键词...'
  }, props)

  return (
    <React.Fragment>
      <View className={less.block_index_container}>
        <View
          className={less.inline_search}
          style={{
            padding: `0 ${storeGlobal.navigate.xBetween}px`
          }}
        >
          <UsInput
            className={less.input}
            placeholder={defaultProps.placeholder}
          />
          <UsButton
            className={less.button}
          >搜索</UsButton>
        </View>
      </View>
    </React.Fragment>
  )

}

export default QuerySelect;