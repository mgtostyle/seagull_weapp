import React, { PropsWithChildren, useState } from "react"
import './statistics.less'
import { useLoad } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"

import PlatformPie from '../../childs/indexCharts/platformPie'

const Statistics: React.FC<PropsWithChildren<{ visible, $apis }>> = ({ visible, $apis }) => {

  const [user_statistics, setUserStatistics] = useState<any>({})
  const [app_statistics, setAppStatistics] = useState<Array<any>>([])

  useLoad(() => {
    getStatistics()
  })

  const getStatistics = () => {
    $apis.composite.common.censusStatistics.get().then(res => {
      let { user_statistics, app_statistics } = res.data
      user_statistics && setUserStatistics(user_statistics)
      app_statistics && setAppStatistics(app_statistics)
    })
  }

  return visible && (
    <React.Fragment>
      <View className="inline_statistics_card">
        <View className="card_title">
          <Text className="iconfont icon-line-application1" />
          <Text className="label">人员统计分析</Text>
        </View>
        <View className="inline_statistics_register">
          <View className="register_list">
            <View className="list_item">
              <View className="value">{user_statistics.pending_count}</View>
              <View className="label">待审核</View>
            </View>
            <View className="list_item">
              <View className="value">{user_statistics.resolve_count}</View>
              <View className="label">管理员</View>
            </View>
            <View className="list_item">
              <View className="value">{user_statistics.reject_count}</View>
              <View className="label">被回拒</View>
            </View>
          </View>
          <View className="register_tip">
            <View className="label">运营分析</View>
            <View className="value">共计申请成员 {user_statistics.all_count} 位，{user_statistics.pending_count === 0 ? '已审核完成所有成员' : '尚有未审核成员，请及时处理'}</View>
          </View>
        </View>
      </View>
      {Boolean(app_statistics?.length) && (
        <View className="inline_statistics_card">
          <View className="card_title">
            <Text className="iconfont icon-line-application1" />
            <Text className="label">平台入驻成员分布</Text>
          </View>
          <PlatformPie statistics={app_statistics} />
        </View>
      )}
    </React.Fragment>
  )

}

export default Statistics;