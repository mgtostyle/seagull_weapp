import React, { PropsWithChildren, useState } from 'react'
import './update.less'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsForm, UsInput, UsTextArea, UsDataNone } from '@components/usIndex'

const EntryManageUpdate: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const { key, id } = (getCurrentInstance as any)().router.params

  const getDetail = async () => {
    try {
      let result = await $apis.product.getOrderDetail.get(`/?id=${id}`)
      let { info, list } = result.data.data
      info.list = list
      return info
    } catch (error) {
      return {}
    }
  }

  return (
    <UsContainer title="详情" back={1}>
      <UsForm
        request={key === 'create' ? getDetail : false}
        buttonVisible={Boolean(key === 'create')}
      >
        <UsForm.Item label="订单号" name="sn">
          <UsInput placeholder='请输入...' disabled={Boolean(key === 'look')} />
        </UsForm.Item>
        <UsForm.Item label="制单人" name="author">
          <UsInput placeholder='请输入...' disabled={Boolean(key === 'look')} />
        </UsForm.Item>
        <UsForm.Item label="供应商" name="ban_no">
          <UsInput placeholder='请输入...' disabled={Boolean(key === 'look')} />
        </UsForm.Item>
        <UsForm.Consumer label="商品信息">
          {({ initialValues }) => (
            <React.Fragment>
              {Array.isArray(initialValues?.list) && Boolean(initialValues?.list?.length) ? (
                <View className="parameter_index_table">
                  <View className="parameter_row head">
                    <View className="cell">产品编号</View>
                    <View className="cell">产品名称</View>
                    <View className="cell">入库数</View>
                  </View>
                  {initialValues.list.map((item, index: number) => (
                    <View className="parameter_row" key={index}>
                      <View className="cell">{item.sn}</View>
                      <View className="cell">{item.good_name}</View>
                      <View className="cell">{item.num}</View>
                    </View>
                  ))}
                </View>
              ) : (
                <UsDataNone>暂无数据，点击下方添加相应选项并进行内容编辑</UsDataNone>
              )}
            </React.Fragment>
          )}
        </UsForm.Consumer>
        <UsForm.Item label="备注" name="desc">
          <UsTextArea placeholder='请输入...' disabled={Boolean(key === 'look')} />
        </UsForm.Item>
      </UsForm>
    </UsContainer>
  )

}

export default EntryManageUpdate;