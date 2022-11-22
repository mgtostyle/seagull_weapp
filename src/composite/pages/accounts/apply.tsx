import React, { PropsWithChildren } from 'react'
import './apply.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsImage, UsButton } from '@components/usIndex'
import { ProTable } from '@/assembles/moduleIndex'

const AccountApply: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const getAccountApplyList = async (formValues: {[propsName: string]: any}) => {
    try {
      let result = await $apis.composite.administrator.applyList.post(formValues)
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

  const toAccountDetail = (id: string) => {
    Taro.navigateTo({
      url: `/composite/pages/accounts/detail?id=${id}`
    })
  }

  return (
    <UsContainer title="待审核用户" back={1}>
      <ProTable
        refresh
        hitbottom
        request={getAccountApplyList}
      >
        {detail => (
          <React.Fragment>
            <View
              className="block_index_detail"
              onClick={() => toAccountDetail(detail.id)}
            >
              <UsImage className="image" src={detail.avatarUrl} mode="aspectFill" />
              <View className="name">{detail.nickName}</View>
              {detail.status === 2 ? (
                <UsButton theme="warn" size="mini">待审核</UsButton>
              ): (
                <View className="status">{detail.status === 1 ? '已通过' : detail.status === 0 && '已驳回'}</View>
              )}
            </View>
          </React.Fragment>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default AccountApply;