import React, { PropsWithChildren, useState } from 'react'
import type { PageManageProps, AppQuerySelect } from './interface'
import './manage.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsButton } from '@components/usIndex'
import { QuerySelect, QuerySelectColumns } from '@/assembles/moduleIndex'

const Manage: React.FC<PropsWithChildren<{ props: PageManageProps, $apis }>> = ({ $apis }) => {

  const [querySelect, setQuerySelect] = useState<AppQuerySelect>({
    page: 1,
    limit: 10
  })
  const [list, setList] = useState<Array<any>>([])

  useLoad(() => {
    getMiniAppList(querySelect)
  })

  const getMiniAppList = (formValues: AppQuerySelect) => {
    $apis.composite.setting.miniAppList.post(formValues).then(res => {
      setQuerySelect(formValues)
      setList(formValues.page > 1 ? list.concat(res.data.list) : res.data.list)
    })
  }

  const onSubmit = (values) => {
    getMiniAppList(Object.assign(values, querySelect, {
      page: 1
    }))
  }

  const toMiniAppEdit = (id?: number) => {
    Taro.navigateTo({
      url: `/composite/pages/miniApp/update${id ? '?id=' + id : ''}`
    })
  }

  return (
    <React.Fragment>
      <QuerySelect
        search
        onSubmit={onSubmit}
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
