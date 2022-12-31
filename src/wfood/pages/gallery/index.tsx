import React, { PropsWithChildren, useState } from 'react'
import './index.less'
import Taro, { getCurrentInstance, useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer } from '@components/usIndex'

const GalleryIndex: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { id, title } = (getCurrentInstance as any)().router.params
  const [list, setMenu] = useState<Array<any>>([])

  useLoad(() => getGalleryMenus())

  const getGalleryMenus = () => {
    $apis.wfood.gallery.navigateMenu.get(`/${id}`).then(res => {
      setMenu(res.data.list)
    })
  }

  const toPageIndex = (path: string) => {
    Taro.navigateTo({
      url: path
    })
  }

  return (
    <UsContainer title={title} back={1}>
      {Boolean(list.length) && list.map((element, index: number) => (
        <View className="block_index_boxer" key={index}>
          <View className="inline_index_title">{element.name}</View>
          <View className="inline_index_list">
            {element.list.map((item, itemIndex: number) => (
              <View
                className="list_item"
                key={itemIndex}
                onClick={() => toPageIndex(element.app_path)}
              >
                <View className="name">{item.name}</View>
                <View className="iconfont icon-line-right" />
              </View>
            ))}
          </View>
        </View>
      ))}
    </UsContainer>
  )

}

export default GalleryIndex;