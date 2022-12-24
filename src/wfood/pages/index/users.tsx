import React, { PropsWithChildren } from "react"
import type { UserColumnItem } from './interface'
import './users.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useSelector, useDispatch } from "react-redux"
import { wfoodActions } from '@/store/wfood'

import { UsImage } from '@components/usIndex'

const Users: React.FC<PropsWithChildren<{ visible, $apis }>> = ({ visible, $apis }) => {

  const storeGlobal = useSelector(state => (state as any).global)
  const { userInfo } = useSelector(state => (state as any).wfood)
  const dispatch = useDispatch()

  const columns: Array<UserColumnItem> = [
    {
      icon: 'icon-line-usermanagement1',
      name: '完善信息',
      status: !Boolean(userInfo.isRobot)
    },
    {
      icon: 'icon-logo-moment1',
      name: '主题设置',
      status: !Boolean(userInfo.isRobot)
    },
    {
      icon: 'icon-line-briefcase',
      name: '菜单设置',
      status: Boolean(userInfo.isRobot),
      result: () => toNavigateMap()
    },
    {
      icon: 'icon-line-signout1',
      name: '退出账号',
      status: true,
      result: () => setLoginOut()
    }
  ]

  const getUserInfo = () => {
    $apis.wfood.common.baseUserInfo.get().then(res => {
      dispatch(wfoodActions.setUserInfo(res.data.userInfo))
    })
  }

  useLoad(() => getUserInfo())

  const toNavigateMap = () => {
    Taro.navigateTo({
      url: '/wfood/pages/navigateMent/index'
    })
  }

  const setLoginOut = () => {
    Taro.showModal({
      title: '退出账号',
      content: '是否退出当前账号，并返回登录页面，请再次确认您的操作！！！',
      confirmText: '退出',
      success: res => res.confirm && dispatch(wfoodActions.setClear())
    })
  }

  return visible && (
    <React.Fragment>
      <View
        className="block_users_header"
        style={{
          paddingTop: storeGlobal.navigateHeight
        }}
      >
        <View className="inline_users_back" />
        <View className="inline_users_info">
          <UsImage
            className="info_image"
            shape="circle"
            mode="aspectFill"
            src={userInfo.avatarUrl}
          />
          <View className="info_name">{userInfo.nickName}</View>
          <View className="info_code">{userInfo.idCard}</View>
          <View className="info_tag">
            {!Boolean(userInfo.isRobot) && (
              <Text>部门 - 岗位</Text>
            )}
            <Text>{userInfo.senior ? '超级管理员' : '普通成员'}</Text>
          </View>
        </View>
      </View>
      <View className="block_sett_list">
        {columns.map((element: UserColumnItem, index: number) => Boolean(element.status) && (
          <View
            className="inline_list_item"
            key={index}
            onClick={() => typeof element.result === 'function' && element.result()}
          >
            <View className="item_label">
              <View className={`iconfont ${element.icon}`} />
              <View className="text">{element.name}</View>
            </View>
            {Boolean(element.value) && (
              <View className="item_value">{element.value}</View>
            )}
          </View>
        ))}
      </View>
    </React.Fragment>
  )

}

export default Users;