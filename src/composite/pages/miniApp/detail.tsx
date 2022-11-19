import React, { PropsWithChildren, useState } from 'react'
import type { PageDetailProps, AdminFormValues } from './interface'
import './detail.less'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { UsContainer, UsImage } from '@/components/usIndex'

const MiniAppDetail: React.FC<PropsWithChildren<{ props: PageDetailProps, $apis, $commonLess }>> = ({ $apis, $commonLess }) => {

  const { id, title } = (getCurrentInstance as any)().router.params

  const [detail, setMiniAppDetail] = useState<any>({})
  const [adminParams, setAdminParams] = useState<AdminFormValues>({
    page: 1,
    limit: 10
  })
  const [adminList, setAdminList] = useState<Array<any>>([])
  const [adminCount, setAdminCount] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)

  useLoad(() => {
    id && getMiniAppDetail()
    id && getAdministratorList()
  })

  const getMiniAppDetail = () => {
    $apis.composite.setting.miniAppDetail.get(`/id/${id}`).then(res => {
      setMiniAppDetail(res.data.detail)
    })
  }

  const getAdministratorList = async (formValues?: AdminFormValues) => {
    let params = Object.assign(adminParams, formValues)
    $apis.composite.setting.administratorList.post({
      ...params,
      id
    }).then(res => {
      setAdminParams(params)
      setAdminList(list => params.page > 1 ? list.concat(res.data.list) : res.data.list)
      setAdminCount(res.data.count)
    })
  }

  const toMiniAppAdminAdds = () => {
    Taro.navigateTo({
      url: `/composite/pages/miniApp/adminAdds?id=${id}`
    })
  }

  const onAdministratorDelete = (id: number) => {
    Taro.showModal({
      title: '提示',
      content: '是否确认移除当前成员，请谨慎操作此选项',
      confirmText: '移除',
      confirmColor: $commonLess.usDangerColor,
      success: async res => {
        if (res.confirm) {
          let result = await $apis.composite.setting.administratorRemove.delete(`/id/${id}`)
          result.data.status === 1 && Taro.showToast({
            title: '移除成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }

  return (
    <UsContainer title={title} back={1}>
      <View className="block_index_detail">
        <UsImage
          className="detail_logo"
          src={detail?.logo}
          shape="circle"
          mode="aspectFill"
        />
        <View className="detail_title">{detail?.title || '--'}</View>
        {detail?.introduction && (
          <View className="detail_desc">{detail.introduction}</View>
        )}
      </View>
      <View className="block_index_administator">
        <View className="common_header">
          <View className="title">管理员</View>
          <View className="operate">
            <View
              className="iconfont icon-line-refresh"
              onClick={() => getAdministratorList({ ...adminParams, page: 1 })}
            />
            <View
              className="iconfont icon-line-delete1"
              onClick={() => setVisible(!visible)}
            />
          </View>
        </View>
        <View className="inline_admin_list">
          {Boolean(adminList?.length) && adminList.map((detail, index: number) => (
            <View
              className="admin_item user"
              key={index}
            >
              <View
                className="image"
                onClick={() => visible && onAdministratorDelete(detail.id)}
              >
                <UsImage
                  className="img"
                  src={detail.user.avatarUrl}
                  mode="aspectFill"
                />
                {visible && (
                  <Text className="iconfont icon-line-addition" />
                )}
              </View>
              <View className="name">{detail.user.nickName}</View>
            </View>
          ))}
          <View
            className="admin_item adds"
            onClick={toMiniAppAdminAdds}
          >
            <View className="image iconfont icon-line-subtraction1" />
            <View className="name">添加成员</View>
          </View>
        </View>
        {Boolean(adminList?.length < adminCount) && (
          <View
            className="inline_admin_reach"
            onClick={() => getAdministratorList({ ...adminParams, page: adminParams.page + 1 })}
          >
            <Text>共 {adminCount} 位成员，点击加载更多</Text>
            <Text className="iconfont icon-line-down1" />
          </View>
        )}
      </View>
    </UsContainer>
  )

}

export default MiniAppDetail;
