import React, { PropsWithChildren, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import type { PageManageProps, AppQuerySelect } from './interface'
import './manage.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsDataNone } from '@components/usIndex'
import { QuerySelect } from '@/assembles/moduleIndex'

const Manage: React.FC<PropsWithChildren<{ props: PageManageProps, $apis }>> = forwardRef(({ $apis }, ref) => {

  const querySelectRef = useRef<any>()
  const [querySelect, setQuerySelect] = useState<AppQuerySelect>({
    page: 1,
    limit: 10
  })
  const [list, setList] = useState<Array<any>>([])

  useImperativeHandle(ref, () => ({
    toMiniAppEdit,
    resetFields: querySelectRef.current?.resetFields
  }))

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
        ref={querySelectRef}
        search
        onSubmit={onSubmit}
      />
      {Boolean(list.length) ? (
        <View className="block_index_list">
          {list.map((element: any, index: number) => (
            <View key={index} onClick={() => toMiniAppEdit(element.id)}>{element.title}</View>
          ))}
        </View>
      ) : (
        <View className="block_index_none">
          <UsDataNone>暂无平台数据，请前往创建</UsDataNone>
        </View>
      )}
    </React.Fragment>
  )

})

export default Manage;
