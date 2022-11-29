import React, { PropsWithChildren } from "react"
import type {} from './interface'
import './users.less'
import { View, Text } from '@tarojs/components'
import { useSelector } from "react-redux"

import { UsImage } from '@components/usIndex'

const Users: React.FC<PropsWithChildren<{ visible }>> = ({ visible }) => {

  const storeGlobal = useSelector(state => (state as any).global)

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
          />
          <View className="info_name">style@@</View>
          <View className="info_code">WF428034723043209755317105</View>
          <View className="info_tag">
            <Text>部门 - 岗位</Text>
            <Text>超级管理员</Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  )

}

export default Users;