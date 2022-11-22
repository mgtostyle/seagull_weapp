import React, { PropsWithChildren, useState } from "react"
import './detail.less'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector } from "react-redux"
import moment from "moment"

import { UsContainer, UsImage, UsButton } from "@components/usIndex"

const AccountDetail: React.FC<PropsWithChildren<{ $apis, $commonLess }>> = ({ $apis, $commonLess }) => {

  const { id } = (getCurrentInstance as any)().router.params
  const storeGlobal = useSelector(state => (state as any).global)
  const [detail, setAccountDetail] = useState<any>(null)

  useLoad(() => {
    id && getAccountDetail()
  })

  const getAccountDetail = () => {
    $apis.composite.administrator.accountDetail.get(`/id/${id}`).then(res => {
      let { detail } = res.data
      switch (detail.gender) {
        case 1:
          detail.gender_text = '男'
          break;
        case 2:
          detail.gender_text = '女'
          break;
        default:
          detail.gender_text = '未知'
          break;
      }
      switch (detail.status) {
        case 0:
          detail.status_text = '拒绝入驻'
          break;
        case 1:
          detail.status_text = '已开通'
          break;
        case 2:
          detail.status_text = '待审核'
          break;
      }
      setAccountDetail(res.data.detail)
    })
  }

  const getAccountSubmit = (status: 0 | 1) => {
    if (Boolean(status)) {
      Taro.showModal({
        title: '提醒',
        content: '是否确认并同意当前账号申请成为管理成员，将无法撤销，请谨慎操作此选项！！！',
        confirmText: '同意',
        success: res => res.confirm && setAccountPublish(status)
      })
    } else {
      Taro.showModal({
        title: '提示',
        content: '您当前操作拒绝，将无法恢复该账号状态，是否拒绝入驻',
        confirmText: '拒绝',
        confirmColor: $commonLess.usDangerColor,
        success: res => res.confirm && setAccountPublish(status)
      })
    }
  }

  const setAccountPublish = (status: 0 | 1) => {
    $apis.composite.administrator.accountPublish.get(`/${id}/${status}`).then(res => {
      res.data.status === 1 && Taro.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 3000,
        success: () => getAccountDetail()
      })
    })
  }

  return (
    <UsContainer title={detail?.nickName} back={1}>
      <View className="block_index_base">
        <UsImage className="base_image" src={detail?.avatarUrl} mode="aspectFill" />
        <View className="base_info">
          <View className="name">{detail?.nickName}</View>
          {detail?.status_text && (
            <View className="status">用户状态：{detail.status_text}</View>
          )}
        </View>
      </View>
      <View className="block_index_list">
        <View className="list_item">
          <View className="label">性别</View>
          <View className="value">{detail?.gender_text}</View>
        </View>
        <View className="list_item">
          <View className="label">语言</View>
          <View className="value">{detail?.language}</View>
        </View>
        <View className="list_item">
          <View className="label">地区</View>
          <View className="value">{detail?.place?.join(' ') || '未知地区'}</View>
        </View>
        {detail?.createdAt && (
          <View className="list_item">
            <View className="label">注册时间</View>
            <View className="value">{moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</View>
          </View>
        )}
        {detail?.status !== 2 && typeof detail?.status === 'number' && detail?.updatedAt && (
          <View className="list_item">
            <View className="label">审核时间</View>
            <View className="value">{moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</View>
          </View>
        )}
      </View>
      {detail?.status === 2 && (
        <View className="block_index_submit">
          <View
            className="submit_box"
            style={{
              marginBottom: `${storeGlobal.safeAreaHeight}rpx`
            }}
          >
            <UsButton
              className="button"
              theme="danger"
              onClick={() => getAccountSubmit(0)}
            >拒绝驳回</UsButton>
            <UsButton
              className="button"
              onClick={() => getAccountSubmit(1)}
            >同意申请</UsButton>
          </View>
        </View>
      )}
    </UsContainer>
  )

}

export default AccountDetail;