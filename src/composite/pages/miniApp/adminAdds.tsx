import React, { PropsWithChildren, useState } from 'react'
import type { PageAdminAddsProps } from './interface'
import './adminAdds.less'
import { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { QuerySelect, ProTable } from '@/assembles/moduleIndex'
import type { QuerySelectColumns } from '@/assembles/moduleIndex'
import { UsContainer, UsCheckbox, UsImage, UsButton } from '@/components/usIndex'

const AdministratorAdds: React.FC<PropsWithChildren<{ props: PageAdminAddsProps, $apis }>> = ({ $apis }) => {

  const { id } = (getCurrentInstance as any)().router.params

  const storeGlobal = useSelector(state => (state as any).global)

  const [querySelect, setQuerySelect] = useState({})
  const [adminIds, setAdminCheckbox] = useState<Array<string>>([])

  const columns: QuerySelectColumns = [
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        all: '全部',
        0: '未知',
        1: '男性',
        2: '女性'
      }
    },
    {
      title: '状态',
      dataIndex: 'is_entry'
    }
  ]

  const getRegisterUserList = async (formValues: {[propsName: string]: any}) => {
    try {
      let result = await $apis.composite.select.registerList.post({
        ...formValues,
        platformId: id
      })
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

  const getAdminCheckbox = (id: string, status: boolean) => {
    if (status) {
      setAdminCheckbox(ids => ids.concat([id]))
    } else {
      setAdminCheckbox(ids => ids.filter((value: string) => value !== id))
    }
  }

  return (
    <UsContainer title="添加成员" back={1}>
      <QuerySelect
        search
        onSubmit={setQuerySelect}
        select
        columns={columns}
      />
      <ProTable
        hitbottom
        initialValues={querySelect}
        limit={20}
        request={getRegisterUserList}
      >
        {detail => (
          <UsCheckbox
            className="inline_checkbox_card"
            value={detail.id}
            checked={!detail.settled_in || adminIds.includes(detail.id)}
            disabled={!detail.settled_in}
            onChange={getAdminCheckbox}
          >
            <View className={`inline_checkbox_admin ${detail.status && 'active'}`}>
              <View className="admin_info">
                <UsImage
                  className="image"
                  src={detail.avatarUrl}
                  mode="aspectFill"
                />
                <View className="name">{detail.nickName}</View>
              </View>
              {detail.settled_in && (
                <View className="admin_status">已添加</View>
              )}
            </View>
          </UsCheckbox>
        )}
      </ProTable>
      <View className="inline_item_submit">
        <View
          className="submit_box"
          style={{
            marginBottom: `${storeGlobal.safeAreaHeight}rpx`
          }}
        >
          <UsButton
            className="button"
            ghost
            onClick={() => console.log(querySelect)}
          >重置</UsButton>
          <UsButton
            className="button"
            onClick={() => console.log('提交')}
          >提交</UsButton>
        </View>
      </View>
    </UsContainer>
  )

}

export default AdministratorAdds;