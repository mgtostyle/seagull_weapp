import React, { PropsWithChildren, useState, useRef } from 'react'
import type { PageAdminAddsProps, AdminItem } from './interface'
import './adminAdds.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { QuerySelect, ProTable } from '@/assembles/moduleIndex'
import type { QuerySelectColumns } from '@/assembles/moduleIndex'
import { UsContainer, UsCheckbox, UsImage, UsButton } from '@/components/usIndex'

const AdministratorAdds: React.FC<PropsWithChildren<{ props: PageAdminAddsProps, $apis, $commonLess }>> = ({ $apis, $commonLess }) => {

  const { id } = (getCurrentInstance as any)().router.params
  const storeGlobal = useSelector(state => (state as any).global)

  const querySelectRef = useRef<any>()
  const [querySelect, setQuerySelect] = useState<any>({})
  const [adminList, setAdminCheckbox] = useState<Array<AdminItem>>([])

  const containerColumns = [
    {
      name: '重置查询条件及内容',
      result: () => {
        querySelectRef.current?.resetFields({})
        querySelectRef.current?.setQuerySelect({})
      }
    },
    {
      name: '清空选中的所有成员',
      result: () => setAdminCheckbox([])
    }
  ]

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
      setAdminCheckbox(list => list.filter((item: AdminItem) => item.id !== detail.id))
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

  const getSubmit = async () => {
    Taro.showModal({
      title: '提示',
      content: `是否绑定该 ${adminList.length} 位成员使用平台操作及管理内容，请确认您的入驻选择`,
      success: async res => {
        if (res.confirm) {
          let result = await $apis.composite.setting.administratorAdds.post({
            userIdsArray: adminList.map(item => item.id),
            platformId: id
          })
          result.data.status === 1 && Taro.navigateBack({
            delta: 1,
            success: () => Taro.showToast({
              title: '入驻成功',
              icon: 'success',
              duration: 2000
            })
          })
        }
      }
    })
  }

  return (
    <UsContainer
      title="添加成员"
      back={2}
      setting
      columns={containerColumns}
    >
      <QuerySelect
        ref={querySelectRef}
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
            checked={detail.settled_in || adminList.map((item: AdminItem) => item.id).includes(detail.id)}
            disabled={detail.settled_in}
            setFieldValue={(_, status) => getAdminCheckbox(detail, status)}
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
                <View className="admin_status">已入驻</View>
              )}
            </View>
          </UsCheckbox>
        )}
      </ProTable>
      <View className="inline_item_submit">
        <View
          className="inline_submit_inner"
          style={{
            marginBottom: `${storeGlobal.safeAreaHeight}rpx`
          }}
        >
          {Boolean(adminList?.length) && (
            <View className="submit_scroll">
              <ScrollView className="submit_admin" scrollX>
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
              </ScrollView>
              <View className="submit_nums">已选中 {adminList.length} 位成员</View>
            </View>
          )}
          <View className="submit_box">
            <UsButton
              className="button"
              disabled={!Boolean(adminList?.length)}
              onClick={getSubmit}
            >{Boolean(adminList?.length) ? '添加入驻' : '请选择'}</UsButton>
          </View>
        </View>
      </View>
    </UsContainer>
  )

}

export default AdministratorAdds;
