import React, { PropsWithChildren } from 'react'
import './index.less'
import type { NavigateUpdateParams } from './interface'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'


import { UsContainer } from '@components/usIndex'
import { QuerySelect, ProTable } from '@assembles/moduleIndex'

const NavigateMap: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const containerColumns = [
    {
      name: '新增导航模块',
      result: () => toCreateNavigate({
        type: 'CREATE',
        level: 1
      })
    },
    {
      name: '重置查询条件及内容',
      result: () => console.log('重置')
    }
  ]

  const getNavigateList = async () => {
    try {
      let result = await $apis.wfood.setting.navigateMap.post()
      return {
        list: result.data,
        count: result.data.length
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  const toCreateNavigate = (params: NavigateUpdateParams) => {
    Taro.navigateTo({
      url: `/wfood/pages/navigateMent/update?navigateParams=${encodeURIComponent(JSON.stringify(params))}`
    })
  }

  return (
    <UsContainer
      title="菜单设置"
      back={2}
      columns={containerColumns}
    >
      <QuerySelect />
      <ProTable
        limit={false}
        request={getNavigateList}
      >
        {detail => (
          <View>{JSON.stringify(detail)}</View>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default NavigateMap;