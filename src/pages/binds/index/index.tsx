import React, { PropsWithChildren, useState } from 'react'
import './index.less'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'

import { UsContainer, UsImage } from '@components/usIndex'

const BindsAppList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { secret } = (getCurrentInstance as any)().router.params
  const [list, setWesfarmerList] = useState<Array<any>>([])

  useLoad(() => {
    getWesfarmerList()
  })

  const getWesfarmerList = async () => {
    $apis.composite.check.wesfarmerList.post({ secret }).then(res => {
      setWesfarmerList(res.data.list)
    })
  }

  const onChoosePlatform = (detail) => {
    $apis.composite.check.generateSenior.post({
      id: detail.id,
      code: detail.code
    }).then(res => {
      Taro.setStorage({
        key: 'token',
        data: res.data.token,
        success: () => Taro.reLaunch({
          url: res.data.path,
          fail: () => Taro.showModal({
            title: '访问异常',
            content: '进入系统出错，请及时联系管理员处理',
            showCancel: false,
            confirmText: '我知道了'
          })
        })
      })
    })
  }

  return (
    <UsContainer title="选择平台" back={1}>
      <View className="block_index_list">
        {list.map((detail, index: number) => (
          <View
            className="inline_index_detail"
            key={index}
            onClick={() => onChoosePlatform(detail)}
          >
            <UsImage
              className="detail_image"
              src={detail.logo}
              mode="aspectFill"
            />
            <View className="detail_info">
              <View className="title">{detail.title}</View>
              <View className="content">创建于 {moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss')}</View>
            </View>
          </View>
        ))}
      </View>
    </UsContainer>
  )

}

export default BindsAppList;