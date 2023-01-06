import React, { PropsWithChildren, useState } from 'react'
import './update.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsForm, UsUpload, UsPicker, UsInput, UsCascader, UsButton, UsDataNone, UsTextArea } from '@components/usIndex'

const GoodsUpdate: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { id } = (getCurrentInstance as any)().router.params
  
  const [formRef, setFormRef]= useState<any>(null)
  const [priceType, setPriceType] = useState<number>(1)

  const priceTypeRange = [
    {
      label: '销售价/市场价',
      value: 1
    },
    {
      label: '区间价',
      value: 2
    }
  ]

  const getGoodsDetail = async () => {
    try {
      let result = await $apis.wfood.goods.indexDetail.get(`/id/${id}`)
      return result.data.detail
    } catch (error) {
      return {
        priceType: [1]
      }
    }
  }

  const setGoodsDetailsItem = (key: 'title' | 'content' | 'image' | 'distance') => {
    let details = formRef.getFieldValue('details') || []
    formRef.setFieldValue({ name: 'details', value: details.concat([{ key, value: '' }]) })
  }

  return (
    <UsContainer title={id ? '编辑' : '创建'} back={1}>
      <UsForm
        formRef={node => setFormRef(node)}
        request={getGoodsDetail}
        buttonConfig={{
          submitText: id ? '更新' : '创建'
        }}
        onReset={() => formRef?.resetFields()}
        onSubmit={values => console.log(values)}
      >
        <UsForm.Item label="名称" name="name">
          <UsInput placeholder='请输入...' />
        </UsForm.Item>
        <UsForm.Item label="主图（缩略图）" name="headImage">
          <UsUpload limit={1} />
        </UsForm.Item>
        <UsForm.Item label="媒体资源（图片轮播）" name="sourceList">
          <UsUpload limit={9} />
        </UsForm.Item>
        <UsForm.Item.Group label="价格配置">
          <UsForm.Item label="类型" name="priceType">
            <UsPicker
              modal={{
                title: '类型',
                range: priceTypeRange
              }}
            />
          </UsForm.Item>
          <UsForm.Item name="price0">
            <UsInput placeholder='请输入...' />
          </UsForm.Item>
          <UsForm.Item name="price1">
            <UsInput placeholder='请输入...' />
          </UsForm.Item>
        </UsForm.Item.Group>
        <UsForm.Item label="所属分类" name="categoryId">
          <UsCascader />
        </UsForm.Item>
        <UsForm.Consumer label="详情配置">
          {initialValues => (
            <React.Fragment>
              {Array.isArray(initialValues.details) && Boolean(initialValues.details.length > 0) ? (
                <View className="inline_detail_list">
                  {initialValues.details.map((element, index: number) => {
                    switch (element.key) {
                      case 'title':
                        return (
                          <UsInput className="inline_input" key={index} placeholder='请输入标题...' onChange={value => console.log(value)} />
                        )
                      case 'content':
                        return (
                          <UsTextArea key={index} placeholder='请输入描述的内容吧...' onLineChange={value => console.log(value)} />
                        )
                      case 'image':
                        return (
                          <UsUpload key={index} limit={1} />
                        )
                      case 'distance':
                        return (
                          <UsInput className="inline_input" key={index} placeholder='请输入0 ～ ∞范围' />
                        )
                      default:
                        return false
                    }
                  })}
                </View>
              ) : (
                <UsDataNone>暂无数据，点击下方添加相应选项并进行内容编辑</UsDataNone>
              )}
              <View className="block_detail_operate">
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItem('title')}>+ 标题</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItem('content')}>+ 短文</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItem('image')}>+ 图片</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItem('distance')}>+ 间距</UsButton>
              </View>
            </React.Fragment>
          )}
        </UsForm.Consumer>
      </UsForm>
    </UsContainer>
  )

}

export default GoodsUpdate;