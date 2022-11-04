import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, ImageItem } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsImage } from '@components/usIndex'

class UsUpload extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: [],
    limit: 1
  }

  private onUpload () {
    const { limit, initialValue, onChange }: PageProps = this.props
    Boolean(limit - (initialValue?.length || 0)) && Taro.chooseMedia({
      count: limit - (initialValue?.length || 0),
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: res => {
        let imageList = initialValue.concat(res.tempFiles.map((item, index: number) => {
          return {
            uid: Date.now() + index,
            url: item.tempFilePath,
            status: 'loading',
            percent: 0
          } as ImageItem
        }))
        typeof onChange === 'function' && onChange({
          value: imageList
        })
        imageList.forEach((item: ImageItem, index: number) => {
          this.getUploadSubmit(item, index)
        })
      }
    })
  }

  private getUploadSubmit (detail, index: number) {
    this.$apis.composite.common.uploadSingleImage.upload({
      file: detail.tempFilePath,
      name: 'singleImage'
    }).then((res) => {
      console.log(res)
    }).catch((err) => console.log(err))
  }

  private onDelete (e, current: number) {
    e.stopPropagation()
    const { initialValue, onChange }: PageProps = this.props
    Taro.showModal({
      title: '提示',
      content: `是否确认移除第 ${current + 1} 张图片，请谨慎操作该选项～`,
      confirmColor: '#f24142',
      confirmText: '移除',
      success: res_modal => res_modal.confirm && typeof onChange === 'function' && onChange({
        value: initialValue.filter((_, index: number) => index !== current)
      })
    })
  }

  render (): ReactNode {
    const { limit, initialValue }: PageProps = this.props
    return (
      <View
        className={less.block_upload_container}
        style={{
          gridTemplateRows: `repeat(${Math.ceil((initialValue.length + (initialValue?.length < limit ? 1 : 0))/3)}, 1fr)`
        }}
      >
        {Boolean(initialValue.length) && initialValue.map((item: ImageItem, index: number) => (
          <View className={less.block_upload_box} key={index}>
            <UsImage
              className={less.inline_image}
              src={item.url}
              mode="aspectFill"
              onClick={() => console.log('预览图片')}
            />
            <View
              className={`${less.inline_delete} iconfont icon-line-delete1`}
              onClick={(e) => this.onDelete(e, index)}
            />
          </View>
        ))}
        {(initialValue?.length || 0) < limit && (
          <View
            className={[less.block_upload_box, less.adds].join(' ')}
            onClick={() => this.onUpload()}
          >
            <View className={less.inline_adds}>
              <View className={`${less.icon} iconfont icon-line-subtraction`} />
              <View className={less.text}>上传图片</View>
            </View>
          </View>
        )}
      </View>
    )
  }

}

export default UsUpload;
