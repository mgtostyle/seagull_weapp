import React, { PropsWithChildren, useRef } from 'react'
import './list.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'
import Environment from '@/config/network/environment'

import { UsContainer, UsImage, UsButton } from '@components/usIndex'
import { QuerySelect, QuerySelectColumns, ProTable } from '@assembles/moduleIndex'

const EntryManageList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const querySelectRef = useRef<any>()
  const proTableRef = useRef<any>()

  const containerColumns = [
    {
      name: '创建',
      result: () => toEntryLogUpdate('create')
    },
    {
      name: '重置查询条件及内容',
      result: () => querySelectRef.current.resetFields()
    }
  ]

  const getProductList = async () => {
    try {
      let result = await $apis.product.index.post()
      console.log(result.data)
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

  const toEntryLogUpdate = (key: 'detail' | 'create', id?: number) => {
    Taro.navigateTo({
      url: `/warehouse/pages/entryManage/update?key=${key}&id=${id}`
    })
  }

  return (
    <UsContainer title="产品管理" back={1}>
      {/* <QuerySelect
        ref={querySelectRef}
      /> */}
      <ProTable
        ref={proTableRef}
        refresh
        hitbottom
        limit={10}
        request={getProductList}
      >
        {detail => (
          <View className="inline_index_card">
          <View className="card_header">
            <View className="time">创建于 {moment(detail.add_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</View>
            {((status) => {
              switch (status) {
                case 0:
                  return (<View className="status show">正常</View>);
                case 1:
                  return (<View className="status hide">废弃</View>);
              }
            })(detail.status)}
          </View>
          <View className="card_index_message">
            <UsImage
              className="message_image"
              src={new Environment().env().DOMAIN_NAME + detail.image}
              mode="aspectFill"
            />
            <View className="message_info">
              <View className="title">{detail.name}</View>
              <View className="desc">类别：{detail.category}</View>
              <View className='desc'>单位：{detail.unit}</View>
              <View className="desc">价格：{detail.price}</View>
              <View className="desc">库存：{detail.num}</View>
              <View className="desc">仓库：{detail.location}</View>
              <View className="desc">供应商：{detail.supplier}</View>
              <View className="desc">客户：{detail.customer}</View>
            </View>
          </View>
          <View className="card_operate">
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

export default EntryManageList;