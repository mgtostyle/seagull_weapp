import React, { PropsWithChildren, useState, useRef } from 'react'
import type { CategoryUpdateParams } from './interface'
import './list.less'
import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import moment from 'moment'

import { UsContainer, UsImage, UsButton } from '@components/usIndex'
import { QuerySelect, QuerySelectColumns, ProTable } from '@assembles/moduleIndex'

const CategoryList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { title } = (getCurrentInstance as any)().router.params
  const proTableRef = useRef<any>()
  const [isJump, setIsJump] = useState<boolean>(false)
  const [cateId, setCateId] = useState<number>(0)
  const [childCateId, setChildCateId] = useState<number>(0)

  const containerColumns = [
    {
      name: '创建分类',
      result: () => toCategoryEdit({
        type: 'CREATE',
        level: 1
      })
    },
    {
      name: '重置查询条件及内容',
      result: () => console.log('重置')
    },
    {
      name: '设置为快捷入口',
      result: () => console.log('设置成功')
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
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: '全部',
        1: '显示',
        2: '隐藏'
      }
    }
  ]

  useDidShow(() => isJump && proTableRef.current?.reLoad())

  const getCategoryList = async () => {
    try {
      let result = await $apis.wfood.category.indexList.post()
      setIsJump(false)
      return result.data
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  const toCategoryEdit = (params: CategoryUpdateParams) => {
    Taro.navigateTo({
      url: `/wfood/pages/catesMent/update?categoryParams=${encodeURIComponent(JSON.stringify(params))}`,
      success: () => setIsJump(true)
    })
  }

  const toCategoryStatus = (detail) => {
    let { id, status } = detail
    $apis.wfood.category.indexStatus.get(`/${id}/${status === 1 ? 2 : 1}`).then(res => {
      res.data.status === 1 && Taro.showToast({
        title: status === 1 ? '已隐藏' : '已启用',
        icon: 'success',
        duration: 3000
      })
    })
  }

  const toCategoryDelete = (id: number) => {
    Taro.showModal({
      title: '提示',
      content: '是否删除该分类信息，将无法恢复此选项，请谨慎操作！！！',
      success: resModal => {
        if (resModal.confirm) {
          $apis.wfood.category.indexDelete.delete(`/${id}`).then(res => {
            res.data.status === 1 && proTableRef.current?.reLoad()
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
        select
        columns={columns}
      />
      <ProTable
        ref={proTableRef}
        request={getCategoryList}
      >
        {detail => (
          <View className="inline_index_card">
            <View className="card_header">
              <View className="time">更新于 {moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</View>
              {((status) => {
                switch (status) {
                  case 1:
                    return (<View className="status show">正常</View>);
                  case 2:
                    return (<View className="status hide">关闭</View>);
                }
              })(detail.status)}
            </View>
            <View className="card_index_message">
              <UsImage
                className="message_image"
                src={detail.image}
                mode="aspectFill"
              />
              <View className="message_info">
                <View className="title">{detail.name}</View>
                <View className="desc">权重 {detail.weight}，关联商品共计 0 件</View>
              </View>
            </View>
            <View className="card_index_bottom">
              {Boolean(detail.children?.length !== 0) && (
                <View className="card_more" onClick={() => setCateId(detail.id === cateId ? 0 : detail.id)}>
                  <View className={`iconfont ${cateId === detail.id ? 'icon-line-up' : 'icon-line-down'}`} />
                  <View className="text">子分类详情</View>
                </View>
              )}
              <View className="card_operate">
                <UsButton
                  size="mini"
                  onClick={() => toCategoryEdit({
                    type: 'CREATE',
                    level: 2,
                    detail: {
                      parent_name: detail.name,
                      connect_id: detail.id
                    }
                  })}
                >新增标签类</UsButton>
                <UsButton
                  size="mini"
                >预览效果</UsButton>
                <UsButton
                  size="mini"
                  theme="default"
                  onClick={() => toCategoryEdit({
                    type: 'MODIFY',
                    level: 1,
                    detail: {
                      id: detail.id
                    }
                  })}
                >编辑</UsButton>
                <UsButton
                  size="mini"
                  theme={detail.status === 1 ? 'danger' : 'default'}
                  ghost
                  onClick={() => toCategoryStatus(detail)}
                >{detail.status === 1 ? '隐藏' : '启用'}</UsButton>
                <UsButton
                  size="mini"
                  theme="danger"
                  onClick={() => toCategoryDelete(detail.id)}
                >删除</UsButton>
              </View>
            </View>
            {cateId === detail.id && (
              <View className="block_index_children">
                {detail.children.map((item, index: number) => (
                  <React.Fragment key={index}>
                    <View className="inline_children_detail" onClick={() => setChildCateId(item.id === childCateId ? 0 : item.id)}>
                      <UsImage
                        className="message_image"
                        src={item.image}
                        mode="aspectFill"
                      />
                      <View className="message_info">
                        <View className="title">{item.name}</View>
                        <View className="desc">权重 {item.weight}，关联商品 0 件</View>
                      </View>
                    </View>
                    {item.id === childCateId && (
                      <View className="inline_children_operate">
                        <UsButton
                          size="mini"
                          theme="default"
                          onClick={() => toCategoryEdit({
                            type: 'MODIFY',
                            level: 2,
                            detail: {
                              parent_name: detail.name,
                              id: item.id
                            }
                          })}
                        >编辑</UsButton>
                        <UsButton
                          size="mini"
                          theme={detail.status === 1 ? 'danger' : 'default'}
                          ghost
                          onClick={() => toCategoryStatus(item)}
                        >{detail.status === 1 ? '隐藏' : '启用'}</UsButton>
                        <UsButton
                          size="mini"
                          theme="danger"
                          onClick={() => toCategoryDelete(item.id)}
                        >删除</UsButton>
                      </View>
                    )}
                  </React.Fragment>
                ))}
              </View>
            )}
          </View>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default CategoryList;