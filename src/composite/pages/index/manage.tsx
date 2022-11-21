import React, { PropsWithChildren, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import type { MiniAppItem } from './interface'
import './manage.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'

import { UsImage, UsButton } from '@components/usIndex'
import { QuerySelect, ProTable } from '@/assembles/moduleIndex'

const Manage: React.FC<PropsWithChildren<{ $apis, $commonLess }>> = forwardRef(({ $apis, $commonLess }, ref) => {

  const querySelectRef = useRef<any>()
  const proTableRef = useRef<any>()
  const [querySelect, setQuerySelect] = useState<any>({})

  useImperativeHandle(ref, () => ({
    setQuerySelect,
    toMiniAppEdit,
    resetFields: querySelectRef.current?.resetFields
  }))

  const getMiniAppList = async (formValues: {[propsName: string]: any}) => {
    try {
      let result = await $apis.composite.setting.miniAppList.post(formValues)
      return {
        list: result.data.list,
        count: result.data.count
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  const toMiniAppEdit = (id?: string) => {
    Taro.navigateTo({
      url: `/composite/pages/miniApp/update${id ? '?id=' + id : ''}`
    })
  }

  const toMiniAppDetail = (detail: MiniAppItem) => {
    Taro.navigateTo({
      url: `/composite/pages/miniApp/detail?id=${detail.id}&title=${detail.title}`
    })
  }

  const toMiniAppStatus = (detail: MiniAppItem) => {
    const status = detail.status == 1 ? 2 : detail.status == 2 ? 1 : 0
    $apis.composite.setting.miniAppStatus.get(`/${detail.id}/${status}`).then(res => {
      res.data.status === 1 && Taro.showToast({
        title: '更新成功',
        icon: 'success',
        duration: 3000,
        success: () => proTableRef.current.setList(list => list.map(item => {
          if (item.id === detail.id) {
            item.status = status
          }
          return item
        }))
      })
    })
  }

  const toMiniAppDelete = (id: string) => {
    Taro.showModal({
      title: '提醒',
      content: '您正在进行一项删除操作，是否需要删除该记录，将无法恢复，请谨慎操作此项！！！',
      confirmColor: $commonLess.usDangerColor,
      confirmText: '删除',
      success: res => res.confirm && $apis.composite.setting.miniAppDelete.delete(`/id/${id}`).then(res => {
        res.data.status === 1 && Taro.showToast({
          title: '移除成功',
          icon: 'success',
          duration: 3000,
          success: () => proTableRef.current.setList(list => list.filter(item => item.id !== id))
        })
      })
    })
  }

  return (
    <React.Fragment>
      <QuerySelect
        ref={querySelectRef}
        search
        onSubmit={setQuerySelect}
      />
      <ProTable
        ref={proTableRef}
        refresh
        hitbottom
        initialValues={querySelect}
        request={getMiniAppList}
      >
        {detail => (
          <View className="inline_index_card">
            <View className="card_header">
              <View className="time">更新于 {moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</View>
              {((status) => {
                switch (status) {
                  case 1:
                    return (<View className="status show">运行中</View>);
                  case 2:
                    return (<View className="status hide">已冻结</View>);
                }
              })(detail.status)}
            </View>
            <View className="card_index_message">
              <UsImage
                className="message_image"
                src={detail.logo}
                mode="aspectFill"
              />
              <View className="message_info">
                <View className="title">{detail.title}</View>
                <View className="desc">{detail.introduction}</View>
              </View>
            </View>
            <View className="card_operate">
              <UsButton
                size="mini"
                theme="default"
                onClick={() => toMiniAppDetail(detail)}
              >主体详情</UsButton>
              <UsButton
                size="mini"
                theme={detail.status === 1 ? 'forbid' : 'default'}
                ghost
                onClick={() => toMiniAppStatus(detail)}
              >{detail.status === 1 ? '冻结' : '启用'}</UsButton>
              <UsButton
                size="mini"
                onClick={() => toMiniAppEdit(detail.id)}
              >编辑</UsButton>
              <UsButton
                size="mini"
                theme="danger"
                onClick={() => toMiniAppDelete(detail.id)}
              >删除</UsButton>
            </View>
          </View>
        )}
      </ProTable>
    </React.Fragment>
  )

})

export default Manage;
