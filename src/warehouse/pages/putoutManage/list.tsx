import React, { PropsWithChildren, useRef } from 'react'
import './list.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'

import { UsContainer, UsButton } from '@components/usIndex'
import { QuerySelect, QuerySelectColumns, ProTable } from '@assembles/moduleIndex'

const PutoutManageList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const querySelectRef = useRef<any>()
  const proTableRef = useRef<any>()

  const containerColumns = [
    {
      name: '创建',
      result: () => toPutoutLogUpdate('create')
    },
    {
      name: '重置查询条件及内容',
      result: () => querySelectRef.current.resetFields()
    }
  ]

  const getPutoutLogsList = async (formValue: {[propsName: string]: any}) => {
    try {
      let result = await $apis.product.getOrderList.post({
        ...formValue,
        type_value: 2
      })
      return {
        list: result.data.data.data,
        count: result.data.data.total
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  const toPutoutLogUpdate = (key: 'detail' | 'create', id?: number) => {
    Taro.navigateTo({
      url: `/warehouse/pages/putoutManage/update?key=${key}&id=${id}`
    })
  }

  return (
    <UsContainer title="出库管理" back={1}>
      {/* <QuerySelect
        ref={querySelectRef}
      /> */}
      <ProTable
        ref={proTableRef}
        refresh
        hitbottom
        limit={10}
        request={getPutoutLogsList}
      >
        {detail => (
          <View className="inline_index_card">
          <View className="card_header">
            <View className="time">创建于 {moment(detail.add_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</View>
          </View>
          <View className="card_index_message">
            <View className="message_info">
              <View className="title">{detail.sn}</View>
              <View className="desc">制单者：{detail.author}</View>
              <View className='desc'>供应商：{detail.ban_no || '默认'}</View>
              <View className="desc">车牌：{detail.car_no || '-'}</View>
              <View className="desc">出库类型：{detail.type}</View>
            </View>
          </View>
          <View className="card_operate">
            <UsButton
              size="mini"
              onClick={() => toPutoutLogUpdate('detail', detail.id)}
            >查看</UsButton>
            <UsButton
              size="mini"
              theme="danger"
            >删除</UsButton>
          </View>
        </View>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default PutoutManageList;