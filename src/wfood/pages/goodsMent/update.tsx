import React, { PropsWithChildren, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { UsContainer, UsForm, UsUpload, UsPicker, UsInput } from '@components/usIndex'

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
              setChange={value => setPriceType(value[0])}
            />
          </UsForm.Item>
          <UsForm.Item label={priceType === 1 ? '市场价' : '最低价'} name="price0">
            <UsInput placeholder='请输入...' />
          </UsForm.Item>
          <UsForm.Item label={priceType === 1 ? '销售价' : '最高价'} name="price1">
            <UsInput placeholder='请输入...' />
          </UsForm.Item>
        </UsForm.Item.Group>
      </UsForm>
    </UsContainer>
  )

}

export default GoodsUpdate;