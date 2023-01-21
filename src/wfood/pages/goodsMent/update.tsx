import React, { PropsWithChildren, useState } from 'react'
import type { GoodsDetailsKey } from './interface'
import './update.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsForm, UsUpload, UsInput, UsCascader, UsButton, UsDataNone, UsTextArea } from '@components/usIndex'

const GoodsUpdate: React.FC<PropsWithChildren<{ $apis, $filter }>> = ({ $apis, $filter }) => {

  const { id } = (getCurrentInstance as any)().router.params
  
  const [formRef, setFormRef]= useState<any>(null)

  const goodsInitialValues = {
    priceType: 1
  }

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
      let { headImage, priceLimit, ...params } = result.data.detail
      return Object.assign(goodsInitialValues, params, {
        headImage: [{
          uid: Date.now() + 1,
          status: 'done',
          url: headImage,
          percent: 100
        }],
        price0: priceLimit?.[0] || '',
        price1: priceLimit?.[1] || ''
      })
    } catch (error) {
      return goodsInitialValues
    }
  }

  const getCategorySelect = async () => {
    try {
      let result = await $apis.wfood.select.goodsCategory.post()
      return result.data.list
    } catch (error) {
      return []
    }
  }

  const setGoodsParameterItemCreate = () => {
    let parameters = formRef.getFieldValue('parameters') || []
    formRef.setFieldValue({
      name: 'parameters',
      value: parameters.concat([{ label: '', content: '' }])
    })
  }

  const setGoodsParameterLabelChange = (current: number, params) => {
    let parameters = formRef.getFieldValue('parameters') || []
    formRef.setFieldValue({
      name: 'parameters',
      value: parameters.map((item, index: number) => {
        if (current === index) item.label = params.value
        return item
      }),
      update: params?.update
    })
  }

  const setGoodsParameterContentChange = (current: number, params) => {
    let parameters = formRef.getFieldValue('parameters') || []
    formRef.setFieldValue({
      name: 'parameters',
      value: parameters.map((item, index: number) => {
        if (current === index) item.content = params.value
        return item
      }),
      update: params?.update
    })
  }

  const setGoodsDetailsItemCreate = (key: GoodsDetailsKey) => {
    let details = formRef.getFieldValue('details') || []
    formRef.setFieldValue({
      name: 'details',
      value: details.concat([{ key, value: '' }])
    })
  }

  const setGoodsDetailsItemChange = (current: number, params) => {
    let details = formRef.getFieldValue('details') || []
    formRef.setFieldValue({
      name: 'details',
      value: details.map((item, index: number) => {
        if (current === index) item.value = params.value
        return item
      }),
      update: params?.update
    })
  }

  const setFilterItemUp = (key: 'parameters' | 'details', index: number) => {
    let details = formRef.getFieldValue(key) || []
    formRef.setFieldValue({
      name: key,
      value: $filter.swapItems(details, index, index - 1)
    })
  }

  const setFilterItemDown = (key: 'parameters' | 'details', index: number) => {
    let details = formRef.getFieldValue(key) || []
    formRef.setFieldValue({
      name: key,
      value: $filter.swapItems(details, index, index + 1)
    })
  }

  const setFilterItemDelete = (key: 'parameters' | 'details', index: number) => {
    let details = formRef.getFieldValue(key) || []
    formRef.setFieldValue({
      name: key,
      value: details.filter((_, number: number) => number !== index)
    })
  }

  const onSubmit = (values) => {
    let { headImage, price0, price1, ...params } = values
    $apis.wfood.goods.indexUpdate.post(Object.assign(
      params,
      id && { id },
      {
        headImage: headImage?.[0]?.url || '',
        priceLimit: [price0, price1]
      }
    )).then(res => {
      if (res.data.status === 1) {
        id ? Taro.navigateBack({
          delta: 1,
          success: () => Taro.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1500
          })
        }) : Taro.showModal({
          title: '创建成功',
          content: '该商品已经创建完成待审核，可选择前往审核发布或者继续创建',
          confirmText: '前往审核',
          cancelText: '继续创建',
          success: resModal => resModal.confirm ? Taro.redirectTo({
            url: '/wfood/pages/goodsMent/publish'
          }) : Taro.redirectTo({
            url: '/wfood/pages/goodsMent/update'
          })
        })
      }
    })
  }

  return (
    <UsContainer title={id ? '编辑' : '创建'} back={1}>
      <UsForm
        formRef={node => setFormRef(node)}
        request={id ? getGoodsDetail : async () => goodsInitialValues}
        buttonConfig={{
          submitText: id ? '更新' : '创建'
        }}
        onReset={() => formRef?.resetFields(goodsInitialValues)}
        onSubmit={onSubmit}
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
        <UsForm.Consumer label="价格配置">
          {({ initialValues, setFieldValue }) => (
            <UsForm.Item.Group initialValues={initialValues} setFieldValue={setFieldValue}>
              <UsForm.Item label="类型" name="priceType">
                <UsCascader
                  modal={{
                    title: '类型',
                    range: priceTypeRange
                  }}
                />
              </UsForm.Item>
              <UsForm.Item label={initialValues.priceType === 1 ? '销售价' : '最低价'} name="price0">
                <UsInput placeholder='请输入金额值...（仅保留两位小数）' />
              </UsForm.Item>
              <UsForm.Item label={initialValues.priceType === 1 ? '市场价' : '最高价'} name="price1">
                <UsInput placeholder='请输入金额值...（仅保留两位小数）' />
              </UsForm.Item>
            </UsForm.Item.Group>
          )}
        </UsForm.Consumer>
        <UsForm.Item label="所属分类" name="categoryId">
          <UsCascader request={getCategorySelect} />
        </UsForm.Item>
        <UsForm.Consumer label="规格参数">
          {({ initialValues }) => (
            <React.Fragment>
              {Array.isArray(initialValues?.parameters) && Boolean(initialValues?.parameters?.length) ? (
                <View className="inline_parameter_list">
                  {initialValues.parameters.map((element, index: number, parametersArr) => (
                    <View className="inline_parameter_item" key={index}>
                      <View className="item_cell item_label">
                        <UsInput
                          className="input"
                          placeholder="属性..."
                          value={element.label}
                          setFieldValue={e => setGoodsParameterLabelChange(index, e)}
                        />
                      </View>
                      <View className="item_cell item_value">
                        <UsTextArea
                          className="textarea"
                          placeholder="请输入属性值..."
                          value={element.content}
                          setFieldValue={e => setGoodsParameterContentChange(index, e)}
                        />
                        <View className="block_common_operate" onClick={e => e.stopPropagation()}>
                          {Boolean(parametersArr.length - 1 > index) && (
                            <View className="iconfont" onClick={() => setFilterItemDown('parameters', index)}>↓</View>
                          )}
                          {Boolean(index > 0) && (
                            <View className="iconfont" onClick={() => setFilterItemUp('parameters', index)}>↑</View>
                          )}
                          <View className="iconfont icon-line-delete1" onClick={() => setFilterItemDelete('parameters', index)} />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <UsDataNone>暂无数据，点击下方添加相应选项并进行内容编辑</UsDataNone>
              )}
              <UsButton
                className="inline_parameter_button"
                size="mini"
                ghost
                onClick={setGoodsParameterItemCreate}
              >创建参数例</UsButton>
            </React.Fragment>
          )}
        </UsForm.Consumer>
        <UsForm.Consumer label="详情配置">
          {({ initialValues }) => (
            <React.Fragment>
              {Array.isArray(initialValues?.details) && Boolean(initialValues?.details?.length) ? (
                <View className="inline_detail_list">
                  {initialValues.details.map((element, index: number, detailsArr) => (
                    <View className="inline_detail_item" key={index}>
                      {((detail) => {
                        switch (detail.key) {
                          case 'title':
                            return (
                              <UsInput
                                className="item_input"
                                placeholder='请输入标题...'
                                value={element.value}
                                setFieldValue={e => setGoodsDetailsItemChange(index, e)}
                              />
                            )
                          case 'content':
                            return (
                              <UsTextArea
                                className="item_textarea"
                                placeholder='请输入描述的内容吧...'
                                autoHeight={true}
                                value={element.value}
                                setFieldValue={e => setGoodsDetailsItemChange(index, e)}
                              />
                            )
                          case 'image':
                            return (
                              <UsUpload
                                className="item_upload"
                                mode="widthFix"
                                limit={1}
                                initialValue={Array.isArray(element?.value) ? element.value : []}
                                setFieldValue={e => setGoodsDetailsItemChange(index, e)}
                              />
                            )
                          case 'distance':
                            return (
                              <UsInput
                                className="item_input"
                                placeholder='请输入0 ～ ∞范围'
                                value={element.value}
                                setFieldValue={e => setGoodsDetailsItemChange(index, e)}
                              />
                            )
                          default:
                            return false
                        }
                      })(element)}
                      <View className="block_common_operate" onClick={e => e.stopPropagation()}>
                        {Boolean(detailsArr.length - 1 > index) && (
                          <View className="iconfont" onClick={() => setFilterItemDown('details', index)}>↓</View>
                        )}
                        {Boolean(index > 0) && (
                          <View className="iconfont" onClick={() => setFilterItemUp('details', index)}>↑</View>
                        )}
                        <View className="iconfont icon-line-delete1" onClick={() => setFilterItemDelete('details', index)} />
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <UsDataNone>暂无数据，点击下方添加相应选项并进行内容编辑</UsDataNone>
              )}
              <View className="block_detail_operate">
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItemCreate('title')}>+ 标题</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItemCreate('content')}>+ 短文</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItemCreate('image')}>+ 图片</UsButton>
                <UsButton size="mini" ghost onClick={() => setGoodsDetailsItemCreate('distance')}>+ 间距</UsButton>
              </View>
            </React.Fragment>
          )}
        </UsForm.Consumer>
      </UsForm>
    </UsContainer>
  )

}

export default GoodsUpdate;