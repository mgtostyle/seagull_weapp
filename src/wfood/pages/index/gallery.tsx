import React, { PropsWithChildren, useState } from 'react'
import './gallery.less'
import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'

const Gallery: React.FC<PropsWithChildren<{ visible, $apis }>> = ({ visible, $apis }) => {

  const [navigateList, setNavigateList] = useState<Array<any>>([])

  useLoad(() => getNavigateTools())

  const getNavigateTools = () => {
    $apis.wfood.gallery.navigateTools.post().then(res => {
      setNavigateList(res.data.list)
    })
  }

  const toGalleryMenu = (id: string, title: string) => {
    Taro.navigateTo({
      url: `/wfood/pages/gallery/index?id=${id}&title=${title}`
    })
  }

  return visible && (
    <React.Fragment>
      <View className="block_index_boxer">
        <View className="inline_index_title">CRM菜单录</View>
        <View className="inline_index_list">
          {navigateList.map((element, index: number) => (
            <View
              className="list_item"
              key={index}
              onClick={() => toGalleryMenu(element.id, element.name)}
            >
              <View className="icon">
                <View className={`iconfont ${element.icon}`} />
              </View>
              <View className="name">{element.name}</View>
            </View>
          ))}
        </View>
      </View>
    </React.Fragment>
  )

}

export default Gallery;