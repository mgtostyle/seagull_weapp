import React, { PropsWithChildren, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { UsContainer, UsForm, UsInput, UsUpload } from '@components/usIndex'

const CategoryList: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { categoryParams } = (getCurrentInstance as any)().router.params
  const { type, level, detail } = JSON.parse(decodeURIComponent(categoryParams))

  const [formRef, setFormRef]= useState<any>(null)

  const getCategoryDetail = async () => {
    try {
      let result = await $apis.wfood.category.indexDetail.get(`/id/${detail?.id}`)
      let { image, ...params } = result.data.detail
      return {
        ...params,
        image: [{ url: image }]
      }
    } catch (error) {
      return {}
    }
  }

  const onSubmit = (values) => {
    const params = Object.assign(
      {
        ...values,
        image: values?.image?.[0]?.url || '',
        level: isNaN(Number(level)) ? 1 : + level
      },
      type === 'MODIFY' && {
        id: detail.id
      },
      type === 'CREATE' && +level !== 1 && {
        connect_id: detail.connect_id
      }
    )
    $apis.wfood.category.indexUpdate.post(params).then(res => res.data.status === 1 && Taro.navigateBack({
      delta: 1,
      success: () => Taro.showToast({
        title: type === 'MODIFY' ? '更新成功' : '创建成功',
        icon: 'success',
        duration: 1500
      })
    }))
  }

  return (
    <UsContainer title={detail?.id ? '编辑' : '创建'} back={1}>
      <UsForm
        formRef={node => setFormRef(node)}
        request={detail?.id ? getCategoryDetail : false}
        buttonConfig={{
          submitText: detail?.id ? '更新' : '创建'
        }}
        onReset={() => formRef?.resetFields()}
        onSubmit={onSubmit}
      >
        <UsForm.Item label="名称" name="name">
          <UsInput placeholder='请输入...' />
        </UsForm.Item>
        <UsForm.Item label="图片" name="image">
          <UsUpload limit={1} />
        </UsForm.Item>
        {Number(level) === 2 && (
          <UsForm.Item label="所属类目">
            <UsInput value={detail?.parent_name} disabled={true} />
          </UsForm.Item>
        )}
        <UsForm.Item label="权重" name="weight">
          <UsInput placeholder='请输入...' />
        </UsForm.Item>
      </UsForm>
    </UsContainer>
  )

}

export default CategoryList;