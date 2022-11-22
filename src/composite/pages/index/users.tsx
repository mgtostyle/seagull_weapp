import React, { PropsWithChildren, useState } from 'react'
import type { UsersOperateItem } from './interface'
import './users.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsImage } from '@components/usIndex'
import { QuerySelect, ProTable } from '@/assembles/moduleIndex'

const Users: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const [querySelect, setQuerySelect] = useState<any>({})

  const columns: Array<UsersOperateItem> = [
    {
      icon: '',
      name: '待审核用户',
      result: () => Taro.navigateTo({
        url: '/composite/pages/accounts/apply'
      })
    }
  ]

  const getAccountList = async (formValues: {[propsName: string]: any} = querySelect) => {
    try {
      let result = await $apis.composite.administrator.accountList.post(formValues)
      return {
        list: result.data.list.sort((a, b) => a.nickName.localeCompare(b.nickName, 'zh-CN'))
      }
    } catch (error) {
      return {
        list: []
      }
    }
  }

  const toAccountDetail = (id: string) => {
    Taro.navigateTo({
      url: `/composite/pages/accounts/detail?id=${id}`
    })
  }

  return (
    <React.Fragment>
      <QuerySelect
        search
        onSubmit={setQuerySelect}
      />
      <View className="block_user_other">
        {columns.map((element: UsersOperateItem, index: number) => (
          <View
            className="other_item"
            key={index}
            onClick={() => typeof element.result === 'function' && element.result()}
          >
            <View className={`iconfont ${element.icon}`} />
            <View className="title">{element.name}</View>
          </View>
        ))}
      </View>
      <ProTable
        initialValues={querySelect}
        refresh
        limit={false}
        request={getAccountList}
      >
        {detail => (
          <View
            className="block_user_detail"
            onClick={() => toAccountDetail(detail.id)}
          >
            <UsImage className="image" src={detail.avatarUrl} mode="aspectFill" />
            <View className="name">{detail.nickName}</View>  
          </View>
        )}
      </ProTable>
    </React.Fragment>
  )

}

export default Users;
