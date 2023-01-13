import React, { PropsWithChildren, useRef } from 'react'
import './list.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import moment from 'moment'

import { priceTypeLabel } from './filter'
import { UsContainer, UsImage, UsButton } from '@components/usIndex'
import { QuerySelect, QuerySelectColumns, ProTable } from '@/assembles/moduleIndex'

const GoodsPublish: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { title } = (getCurrentInstance as any)().router.params

  const querySelectRef = useRef<any>()
  const proTableRef = useRef<any>()

  const containerColumns = [
    {
      name: '重置查询条件及内容',
      result: () => querySelectRef.current.resetFields()
    }
  ]

  const columns: QuerySelectColumns = [
    {
      title: '排序方式',
      dataIndex: 'order_by',
      valueEnum: {
        weightAsc: '按权重升序',
        weightDesc: '按权重降序',
        updatedAtAsc: '按更新时间升序',
        updatedAtDesc: '按更新时间降序'
      }
    },
    {
      title: '标价类型',
      dataIndex: 'priceType',
      valueEnum: {
        default: '全部',
        1: '销售价/市场价',
        2: '区间价'
      }
    },
    {
      title: '所属类目',
      dataIndex: 'categoryId',
      request: () => getGoodsCategorySelect()
    }
  ]

  const getGoodsPublishList = async (formValues: {[propsName: string]: any}) => {
    try {
      let result = await $apis.wfood.goods.publishList.post(formValues)
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

  const getGoodsCategorySelect = async () => {
    try {
      let result = await $apis.wfood.select.goodsCategory.post()
      let flatten = (arr) => arr.reduce((init, next) => {
        let { children, ...params } = next
        init.push(params)
        return init.concat(Array.isArray(children) ? flatten(children.map(item => ({ ...item, label: `${params.label}/${item.label}` }))) : [])
      }, [{ label: '全部', value: 'default' }])
      return flatten(result.data.list)
    } catch (error) {
      return []
    }
  }

  const toGoodsEdit = (id?: number) => {
    let params = {
      url: '/wfood/pages/goodsMent/update'
    }
    if (id) params.url = `${params.url}?id=${id}`
    Taro.navigateTo(params)
  }

  const toGoodsStatus = (id: number) => {
    $apis.wfood.goods.indexStatus.get(`/${id}/1`).then(res => {
      res.data.status === 1 && Taro.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        success: () => proTableRef.current.setList(list => list.filter(element => element.id !== id))
      })
    })
  }

  const toGoodsDelete = (id: number) => {
    Taro.showModal({
      title: '提示',
      content: '是否删除该分类信息，将无法恢复此选项，请谨慎操作！！！',
      success: resModal => {
        if (resModal.confirm) {
          $apis.wfood.goods.indexDelete.delete(`/${id}`).then(res => {
            res.data.status === 1 && proTableRef.current.setList(list => list.filter(element => element.id !== id))
          })
        }
      }
    })
  }

  return (
    <UsContainer
      title={title}
      back={2}
      setting
      columns={containerColumns}
    >
      <QuerySelect
        ref={querySelectRef}
        select
        columns={columns}
        onSubmit={values => proTableRef.current.setQuerySelect(values)}
      />
      <ProTable
        ref={proTableRef}
        refresh
        hitbottom
        limit={10}
        request={getGoodsPublishList}
      >
        {detail => (
          <View className="inline_index_card">
            <View className="card_header">
              <View className="time">更新于 {moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</View>
              <View className="status">待审核</View>
            </View>
            <View className="card_index_message">
              <UsImage
                className="message_image"
                src={detail.headImage}
                mode="aspectFill"
              />
              <View className="message_info">
                <View className="title">{detail.name}</View>
                <View className="desc">{priceTypeLabel(detail.priceType)}，{detail.category}</View>
                {(type => {
                  switch (type) {
                    case 1:
                      return (
                        <View className="number market">
                          <View className="sale">
                            <Text>¥</Text>
                            {detail.priceLimit[0].toFixed(2).split('.')[0]}.
                            <Text>{detail.priceLimit[0].toFixed(2).split('.')?.[1] || '00'}</Text>
                          </View>
                          <View className="now">¥ {detail.priceLimit[1].toFixed(2)}</View>
                        </View>
                      );
                    case 2:
                      return (
                        <View className="number limit">
                          <View className="price">
                            <Text>¥</Text>
                            {detail.priceLimit[0].toFixed(2).split('.')[0]}.
                            <Text>{detail.priceLimit[0].toFixed(2).split('.')?.[1] || '00'}</Text>
                          </View>
                          <View className="line">-</View>
                          <View className="price">
                            <Text>¥</Text>
                            {detail.priceLimit[1].toFixed(2).split('.')[0]}.
                            <Text>{detail.priceLimit[1].toFixed(2).split('.')?.[1] || '00'}</Text>
                          </View>
                        </View>
                      );
                    default:
                      return false;
                  }
                })(detail.priceType)}
              </View>
            </View>
            <View className="card_operate">
              <UsButton
                size="mini"
                onClick={() => Taro.showToast({ title: '暂未开发', icon: 'none' })}
              >预览效果</UsButton>
              <UsButton
                size="mini"
                ghost
                onClick={() => toGoodsEdit(detail.id)}
              >编辑</UsButton>
              <UsButton
                size="mini"
                theme="warn"
                onClick={() => toGoodsStatus(detail.id)}
              >发布</UsButton>
              <UsButton
                size="mini"
                theme="danger"
                onClick={() => toGoodsDelete(detail.id)}
              >删除</UsButton>
            </View>
          </View>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default GoodsPublish;