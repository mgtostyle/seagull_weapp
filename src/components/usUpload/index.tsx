import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, ImageItem } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsImage, UsArcProgressBar } from '@components/usIndex'

class UsUpload extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    initialValue: [],
    limit: 1
  }

  private onUpload () {
    const { limit, initialValue, onChange }: PageProps = this.props
    const initLength = initialValue.length
    Boolean(limit - initLength) && Taro.chooseMedia({
      count: limit - initLength,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: res => {
        let imageList = res.tempFiles.map((item, index: number) => {
          return {
            uid: Date.now() + index,
            url: item.tempFilePath,
            status: 'loading',
            percent: 0
          } as ImageItem
        })
        let initialValueList = initialValue.concat(imageList)
        typeof onChange === 'function' && onChange({
          value: initialValueList
        })
        imageList.forEach((item: ImageItem, index: number) => {
          this.getUploadSubmit(initialValueList, item, index + initLength)
        })
      }
    })
  }

  private getUploadSubmit (initialValue, detail, index: number) {
    const { onChange }: PageProps = this.props
    const setCurrentImage = (params) => {
      initialValue[index] = Object.assign(initialValue[index], params)
      typeof onChange === 'function' && onChange({
        value: initialValue
      })
    }
    this.$apis.composite.common.uploadSingleImage.operate({
      taskCb: task => task.onProgressUpdate(res => setCurrentImage({
        percent: res.progress
      }))
    }).upload({
      file: detail.url,
      name: 'singleImage'
    }).then(res => setCurrentImage({
      status: 'done',
      url: res.data.imageUrl
    })).catch((err) => setCurrentImage({
      status: err
    }))
  }

  private onDelete (e, current: number) {
    e.stopPropagation()
    const { initialValue, onChange }: PageProps = this.props
    Taro.showModal({
      title: '提示',
      content: `是否确认移除第 ${current + 1} 张图片，请谨慎操作该选项～`,
      confirmColor: less.usDangerColor,
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
            {item.status !== 'loading' && (
              <View className={less.inline_progress} onClick={() => {
                initialValue[index] = Object.assign(initialValue[index], {
                  percent: 50
                })
                typeof this.props.onChange === 'function' && this.props.onChange({
                  value: initialValue
                })
              }}>
                <UsArcProgressBar
                  textValue={(item?.percent || 100) + '%'}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  lineBack="transparent"
                  boxSize={80}
                  percent={item.percent}
                />
              </View>
            )}
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
