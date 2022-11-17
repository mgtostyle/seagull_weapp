import React, { PropsWithChildren, useState } from 'react'
import type { PageAdminAddsProps, AdminItem } from './interface'
import './adminAdds.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { QuerySelect, ProTable } from '@/assembles/moduleIndex'
import type { QuerySelectColumns } from '@/assembles/moduleIndex'
import { UsContainer, UsCheckbox, UsImage, UsButton } from '@/components/usIndex'

const AdministratorAdds: React.FC<PropsWithChildren<{ props: PageAdminAddsProps, $apis, $commonLess }>> = ({ $apis, $commonLess }) => {

  const { id } = (getCurrentInstance as any)().router.params

  const storeGlobal = useSelector(state => (state as any).global)

  const [querySelect, setQuerySelect] = useState({})
  const [adminList, setAdminCheckbox] = useState<Array<AdminItem>>([])

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
      title: '是否入驻',
      dataIndex: 'is_entry',
      valueEnum: {
        all: '全部',
        0: '否',
        1: '是'
      }
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

  const getAdminCheckbox = (detail, status: boolean) => {
    if (status) {
      setAdminCheckbox(list => list.concat([{
        id: detail.id,
        avatarUrl: detail.avatarUrl
      }]))
    } else {
      setAdminCheckbox(list => list.filter((item: AdminItem) => item.id !== id))
    }
  }

  const getAdminIndex = (id: string) => {
    Taro.showModal({
      title: '提示',
      content: '是否移除当前用户，请谨慎操作此选项！！！',
      confirmText: '移除',
      confirmColor: $commonLess.usDangerColor,
      success: res => res.confirm && setAdminCheckbox(list => list.filter((item: AdminItem) => item.id !== id))
    })
  }

  const getResetFields = () => {
    Taro.showActionSheet({
      alertText: 'dadas',
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  }

  return (
    <UsContainer title="添加成员" back={1}>
      <QuerySelect
        search
        onSubmit={setQuerySelect}
        select
        columns={columns}
      />
      {Boolean(adminList?.length) && (
        <View className="inline_admin_boxer">
          {adminList.map((item: AdminItem, index: number) => (
            <React.Fragment key={index}>
              <UsImage
                className="image"
                src={item.avatarUrl}
                mode="aspectFill"
                onChange={() => getAdminIndex(item.id)}
              />
            </React.Fragment>
          ))}
        </View>
      )}
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
            checked={detail.settled_in || adminList.map((item: AdminItem) => item.id).includes(detail.id)}
            disabled={detail.settled_in}
            onChange={(_, status) => getAdminCheckbox(detail, status)}
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
              {!detail.settled_in && (
                <View className="admin_status">已入驻</View>
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
            onClick={() => getResetFields()}
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