import React, { PropsWithChildren, useRef } from 'react'
import './index.less'
import type { NavigateUpdateParams } from './interface'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'


import { UsContainer, UsButton } from '@components/usIndex'
import { QuerySelect, ProTable } from '@assembles/moduleIndex'

const NavigateMap: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const proTableRef = useRef<any>()

  const containerColumns = [
    {
      name: '创建模块',
      result: () => toCreateNavigate({
        type: 'CREATE',
        level: 1
      })
    },
    {
      name: '重置查询条件及内容',
      result: () => console.log('重置')
    }
  ]

  const getNavigateList = async () => {
    try {
      let result = await $apis.wfood.setting.navigateMap.post()
      return {
        list: result.data,
        count: result.data.length
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  const toCreateNavigate = (params: NavigateUpdateParams) => {
    Taro.navigateTo({
      url: `/wfood/pages/navigateMent/update?navigateParams=${encodeURIComponent(JSON.stringify(params))}`
    })
  }

  const setVisible = () => {
    // proTableRef.current.setList(list => {
    //   console.log(
    //     list.reduce((prev, curr) => {
    //       return curr
    //     }, [])
    //   )
    //   return list
    // })
  }

  return (
    <UsContainer
      title="菜单设置"
      back={2}
      columns={containerColumns}
    >
      <QuerySelect />
      <ProTable
        ref={proTableRef}
        limit={false}
        request={getNavigateList}
      >
        {detail => (
          <View className="block_index_detail">
            <View className="inline_detail_header">
              <View className="header_detail">
                <View className="iconfont icon-fill-down1" />
                <View className={`iconfont icon ${detail.app_icon}`} />
                <View className="name">{detail.name}</View>
                <View className="key">{detail.symbol}</View>
                <View className="weight">{detail.weight}</View>
              </View>
              <View
                className="header_operate iconfont icon-line-open"
              />
            </View>
            {Boolean(detail?.visible) && (
              <View className="inline_detail_button">
                <UsButton
                  size="mini"
                  theme="primary"
                  onClick={() => toCreateNavigate({
                    type: 'CREATE',
                    level: 2,
                    detail: {
                      connect_id: detail.id
                    }
                  })}
                >创建标签组</UsButton>
                <UsButton
                  size="mini"
                  theme="default"
                  onClick={() => toCreateNavigate({
                    type: 'MODITY',
                    level: 1,
                    detail: {
                      id: detail.id
                    }
                  })}
                >编辑</UsButton>
                <UsButton
                  size="mini"
                  theme="danger"
                >删除</UsButton>
              </View>
            )}
            {detail.list.map((secDetail, secIndex: number) => (
              <View className="block_second_back" key={secIndex}>
                <View className="inline_detail_header">
                  <View className="header_detail">
                    <View className="iconfont icon-fill-down1" />
                    <View className={`iconfont icon ${secDetail.app_icon}`} />
                    <View className="name">{secDetail.name}</View>
                    <View className="key">{secDetail.symbol}</View>
                    <View className="weight">{secDetail.weight}</View>
                  </View>
                  <View
                    className="header_operate iconfont icon-line-open"
                  />
                </View>
                {Boolean(secDetail?.visible) && (
                  <View className="inline_detail_button">
                    <UsButton
                      size="mini"
                      theme="primary"
                      onClick={() => toCreateNavigate({
                        type: 'CREATE',
                        level: 3,
                        detail: {
                          connect_id: secDetail.id
                        }
                      })}
                    >创建菜单项</UsButton>
                    <UsButton
                      size="mini"
                      theme="default"
                      onClick={() => toCreateNavigate({
                        type: 'MODITY',
                        level: 2,
                        detail: {
                          id: secDetail.id
                        }
                      })}
                    >编辑</UsButton>
                    <UsButton
                      size="mini"
                      theme="danger"
                    >删除</UsButton>
                  </View>
                )}
                {secDetail.list.map((thrDetail, thrIndex: number) => (
                  <View className="block_third_back" key={thrIndex}>
                    <View className="inline_detail_header">
                      <View className="header_detail">
                        <View className="iconfont icon-fill-down1" />
                        <View className={`iconfont icon ${thrDetail.app_icon}`} />
                        <View className="name">{thrDetail.name}</View>
                        <View className="key">{thrDetail.symbol}</View>
                        <View className="weight">{thrDetail.weight}</View>
                      </View>
                      <View
                        className="header_operate iconfont icon-line-open"
                      />
                    </View>
                    {Boolean(thrDetail?.visible) && (
                      <View className="inline_detail_button">
                        <UsButton
                          size="mini"
                          theme="default"
                          onClick={() => toCreateNavigate({
                            type: 'MODITY',
                            level: 3,
                            detail: {
                              id: thrDetail.id
                            }
                          })}
                        >编辑</UsButton>
                        <UsButton
                          size="mini"
                          theme="danger"
                        >删除</UsButton>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </ProTable>
    </UsContainer>
  )

}

export default NavigateMap;