import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, ImageItem } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsImage, UsArcProgressBar } from '@components/usIndex'

class UsUpload extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    className: '',
    mode: 'aspectFill',
    initialValue: [],
    limit: 1
  }

  private onUpload () {
    const { limit, initialValue, setFieldValue }: PageProps = this.props
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
        typeof setFieldValue === 'function' && setFieldValue({
          value: initialValueList
        })
        imageList.forEach((item: ImageItem, index: number) => {
          this.getUploadSubmit(initialValueList, item, index + initLength)
        })
      }
    })
  }

  private getUploadSubmit (initialValue, detail, index: number) {
    console.log(detail.url)
    const { setFieldValue }: PageProps = this.props
    const setCurrentImage = (params) => {
      initialValue[index] = Object.assign(initialValue[index], params)
      typeof setFieldValue === 'function' && setFieldValue({
        value: initialValue
      })
    }
    this.$apis.composite.common.uploadSingleImage.operate({
      taskCb: task => task.onProgressUpdate(res => setCurrentImage({
        percent: res.progress
      }))
    }).upload({
      source: detail.url,
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
    const { limit, initialValue, setFieldValue }: PageProps = this.props
    Taro.showModal({
      title: '提示',
      content: `是否确认移除${limit === 1 ? '当前' : `第 ${current + 1} 张`}图片，请谨慎操作该选项～`,
      confirmColor: less.usDangerColor,
      confirmText: '移除',
      success: res_modal => res_modal.confirm && typeof setFieldValue === 'function' && setFieldValue({
        value: initialValue.filter((_, index: number) => index !== current)
      })
    })
  }

  private onImageError (index: number) {
    const { initialValue, setFieldValue }: PageProps = this.props
    initialValue[index] = Object.assign(initialValue[index], {
      status: 'error'
    })
    typeof setFieldValue === 'function' && setFieldValue({
      value: initialValue
    })
  }

  private onImagePreview (index: number) {
    Taro.previewMedia({
      sources: this.props.initialValue.map((element: ImageItem) => {
        return {
          url: element.url,
          type: 'image'
        }
      }),
      current: index
    })
  }

  render (): ReactNode {
    const { className, mode, limit, initialValue }: PageProps = this.props
    return (
      <View
        className={[less.block_upload_container, className].join(' ')}
        style={{
          gridTemplateRows: `repeat(${Math.ceil((initialValue.length + (initialValue?.length < limit ? 1 : 0))/3)}, 1fr)`
        }}
      >
        {Boolean(initialValue.length) && initialValue.map((item: ImageItem, index: number) => (
          <View className={[less.block_upload_box, className && 'block_upload_box'].join(' ')} key={index}>
            <UsImage
              style={{
                width: '100%',
                height: '233.333rpx',
                objectFit: 'cover'
              }}
              src={item.url}
              mode={mode as any}
              onError={() => this.onImageError(index)}
              onClick={() => this.onImagePreview(index)}
            />
            {item.status === 'loading' ? (
              <View className={less.inline_progress}>
                <UsArcProgressBar
                  canvasId={index.toString()}
                  textValue={(item?.percent || 0) + '%'}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  lineBack="transparent"
                  boxSize={80}
                  percent={item?.percent || 0}
                />
              </View>
            ) : item.status === 'error' && (
              <View className={less.inline_error}>
                <View className={`${less.icon} iconfont icon-line-doubt1`} />
                <View className={less.text}>加载失败</View>
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
            className={[less.block_upload_box, less.adds, className && 'block_upload_box'].join(' ')}
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
