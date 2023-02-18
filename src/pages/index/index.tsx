import React, { PropsWithChildren } from 'react'
import './index.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { tabbarList } from '../utils/common'
import { UsContainer, UsTabbar } from '@components/usIndex'

const Index: React.FC<PropsWithChildren> = () => {

  const menusList: any = [
    {
      icon: 'icon-line-download',
      name: '入库管理',
      path: '/warehouse/pages/entryManage/list'
    },
    {
      icon: 'icon-line-signout',
      name: '出库管理',
      path: '/warehouse/pages/putoutManage/list'
    },
    {
      icon: 'icon-line-service',
      name: '产品管理',
      path: '/product/pages/goodsManage/list'
    }
  ]

  const onMenuItemClick = (url: string) => Taro.navigateTo({ url })

  return (
    <UsContainer title="控制台">
      <View className="block_index_boxer">
        <View className="inline_index_list">
          {menusList.map((element, index: number) => (
            <View
              className="list_item"
              key={index}
              onClick={() => onMenuItemClick(element.path)}
            >
              <View className="icon">
                <View className={`iconfont ${element.icon}`} />
              </View>
              <View className="name">{element.name}</View>
            </View>
          ))}
        </View>
      </View>
      <UsTabbar
        current={0}
        list={tabbarList}
        onChange={(index: number) => index === 1 ? Taro.navigateTo({ url: tabbarList[index].path }) : Taro.switchTab({ url: tabbarList[index].path })}
      />
    </UsContainer>
  )

}

export default Index;