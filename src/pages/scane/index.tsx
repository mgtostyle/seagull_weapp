import React, { PropsWithChildren } from 'react'
import './index.less'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsContainer, UsForm, UsInput, UsTextArea, UsCascader, UsDataNone, UsButton } from '@components/usIndex'

const Scane: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const onScaneCreateByGoods = () => {
    Taro.scanCode({
      success: scaneRes => $apis.product.detail.get(`?sn=${scaneRes.result.split('code/')[1]}`).then(res => {
        console.log(res)
      }),
      fail: err => Taro.showToast({
        title: JSON.stringify(err),
        icon: 'none',
        duration: 3000
      })
    })
  }

  return (
    <UsContainer title="扫一扫" back={1}>
      <UsForm>
        <UsForm.Item label="入库类型名称" name="type">
          <UsInput placeholder="请输入..." />
        </UsForm.Item>
        <UsForm.Item label="入库类型" name="categoryId">
          <UsCascader
            modal={{
              title: '选择',
              range: [
                {
                  label: '入库',
                  value: 1
                },
                {
                  label: '出库',
                  value: 2
                }
              ]
            }}
          />
        </UsForm.Item>
        <UsForm.Consumer label="商品信息">
          {({ initialValues }) => (
            <React.Fragment>
              {Array.isArray(initialValues?.list) && Boolean(initialValues?.list?.length) ? (
                <View className="parameter_index_table">
                  <View className="parameter_row head">
                    <View className="cell">产品编号</View>
                    <View className="cell">产品名称</View>
                    <View className="cell">更多操作</View>
                  </View>
                  {initialValues.list.map((item, index: number) => (
                    <View className="parameter_row" key={index}>
                      <View className="cell">{item.sn}</View>
                      <View className="cell">{item.good_name}</View>
                      <UsButton
                        size="mini"
                        theme="danger"
                      >删除</UsButton>
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
                onClick={onScaneCreateByGoods}
              >扫码添加商品</UsButton>
            </React.Fragment>
          )}
        </UsForm.Consumer>
        <UsForm.Item label="备注" name="desc">
          <UsTextArea placeholder="请输入..." />
        </UsForm.Item>
      </UsForm>
    </UsContainer>
  )

}

export default Scane;