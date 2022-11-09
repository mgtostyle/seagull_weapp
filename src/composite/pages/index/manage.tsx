import React, { PropsWithChildren, useState } from 'react'
import type { PageManageProps } from './interface'
import './manage.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsButton } from '@components/usIndex'
import { QuerySelect } from '@/assembles/moduleIndex'

const Manage: React.FC<PropsWithChildren<{ props: PageManageProps, $apis }>> = ({ $apis }) => {

  const [condition, setCondition] = useState({
    page: 1,
    limit: 10
  })
  const [list, setMiniAppList] = useState([])

  useLoad(() => {
    getMiniAppList(condition)
  })

  const getMiniAppList = (formValues) => {
    $apis.composite.setting.miniAppList.post(formValues).then(res => {
      setCondition(formValues)
      if (formValues.page > 1) {
        setMiniAppList(list.concat(res.data.list))
      } else {
        setMiniAppList(res.data.list)
      }
    })
  }

  const toMiniAppEdit = (id?: number) => {
    Taro.navigateTo({
      url: `/composite/pages/miniApp/update${id ? '?id=' + id : ''}`
    })
  }

  return (
    <React.Fragment>
      <QuerySelect
        select
        valueEnum={[
          {
            title: '测试1',
            dataIndex: 'test1',
            request: async () => []
          },
          {
            title: '测试2',
            dataIndex: 'test2',
            request: async () => []
          },
          {
            title: '测试3',
            dataIndex: 'test3',
            request: async () => []
          },
          {
            title: '测试4',
            dataIndex: 'test4',
            request: async () => []
          }
        ]}
        onSubmit={e => console.log(e)}
      />
      <View className="block_index_list">
        {list.map((element: any, index: number) => (
          <View key={index} onClick={() => toMiniAppEdit(element.id)}>{element.title}</View>
        ))}
      </View>
    </React.Fragment>
  )

}

export default Manage;
