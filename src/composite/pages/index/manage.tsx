import React, { PropsWithChildren, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import type { PageManageProps, MiniAppItem } from './interface'
import './manage.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'

import { UsImage, UsButton } from '@components/usIndex'
import { QuerySelect, ProTable } from '@/assembles/moduleIndex'

const Manage: React.FC<PropsWithChildren<{ props: PageManageProps, $apis }>> = forwardRef(({ $apis }, ref) => {

  const querySelectRef = useRef<any>()
  const [querySelect, setQuerySelect] = useState({})

  useImperativeHandle(ref, () => ({
    setQuerySelect,
    toMiniAppEdit,
    resetFields: querySelectRef.current?.resetFields
  }))

  const getMiniAppList = async (formValues: {[propsName: string]: any}) => {
    try {
      let result = await $apis.composite.setting.miniAppList.post(formValues)
      return {
        list: result.data.list,
        count: result.data.count
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
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
        onSubmit={(values: any) => setQuerySelect(values)}
      />
      <ProTable<MiniAppItem>
        className="block_index_list"
        refresh
        hitbottom
        initialValues={querySelect}
        request={getMiniAppList}
      >
        {detail => (
          <View className="inline_index_card">
            <View className="card_header">
              <View className="time">更新于 {moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</View>
              {((status) => {
                switch (status) {
                  case 1:
                    return (<View className="status show">运行中</View>);
                  case 2:
                    return (<View className="status hide">已冻结</View>);
                }
              })(detail.status)}
            </View>
            <View className="card_index_message">
              <UsImage className="message_image" src={detail.logo} />
              <View className="message_info">
                <View className="title">{detail.title}</View>
                <View className="desc">{detail.introduction}</View>
              </View>
            </View>
            <View className="card_operate">
              <UsButton className="button" theme="default">详情</UsButton>
              <UsButton className="button" theme="default">{detail.status === 1 ? '冻结' : '启用'}</UsButton>
              <UsButton className="button" onClick={() => toMiniAppEdit(detail.id)}>编辑</UsButton>
              <UsButton className="button" theme="danger">删除</UsButton>
            </View>
          </View>
        )}
      </ProTable>
    </React.Fragment>
  )

})

export default Manage;
