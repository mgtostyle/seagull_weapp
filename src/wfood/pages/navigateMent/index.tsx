import React, { PropsWithChildren, useRef, useState } from 'react'
import './index.less'
import type { NavigateUpdateParams } from './interface'
import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'


import { UsContainer, UsButton } from '@components/usIndex'
import { QuerySelect, ProTable } from '@assembles/moduleIndex'

const NavigateMap: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const proTableRef = useRef<any>()
  const [isJump, setIsJump] = useState<boolean>(false)

  const containerColumns = [
    {
      name: '创建模块',
      result: () => toUpdateNavigate({
        type: 'CREATE',
        level: 1
      })
    },
    {
      name: '重置查询条件及内容',
      result: () => console.log('重置')
    }
  ]

  useDidShow(() => isJump && proTableRef.current.reLoad())

  const getNavigateList = async () => {
    try {
      let result = await $apis.wfood.setting.navigateMap.post()
      setIsJump(false)
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

  const toUpdateNavigate = (params: NavigateUpdateParams) => {
    Taro.navigateTo({
      url: `/wfood/pages/navigateMent/update?navigateParams=${encodeURIComponent(JSON.stringify(params))}`,
      success: () => setIsJump(true)
    })
  }

  const setVisible = (id: string, type?: string, value?) => {
    proTableRef.current.setList(list => {
      const isChange = (currList) => {
        return currList.map(item => {
          if (item.id === id) {
            switch (type) {
              case 'status':
                item.status = value
                break;
              default:
                item.visible = !Boolean(item.visible)
                break;
            }
          }
          else if (item?.list && Array.isArray(item.list)) isChange(item.list)
          return item
        })
      }
      return isChange(list)
    })
  }

  const setNavigateStatus = (detail) => {
    let { id, status } = detail
    $apis.wfood.setting.navigateStatus.get(`/${id}/${status === 1 ? 2 : 1}`).then(res => {
      res.data.status === 1 && Taro.showToast({
        title: status === 1 ? '已隐藏' : '已展示',
        icon: 'success',
        duration: 3000,
        success: () => setVisible(id, 'status', status === 1 ? 2 : 1)
      })
    })
  }

  const setNavigateDelete = (id: string) => {
    Taro.showModal({
      title: '提示',
      content: '是否删除该导航栏信息，将无法恢复此选项，请谨慎操作！！！',
      success: resModal => {
        if (resModal.confirm) {
          $apis.wfood.setting.navigateDelete.delete(`/${id}`).then(res => {
            res.data.status === 1 && proTableRef.current?.reLoad()
          })
        }
      }
    })
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
                onClick={() => setVisible(detail.id)}
              />
            </View>
            {Boolean(detail?.visible) && (
              <View className="inline_detail_button">
                <UsButton
                  size="mini"
                  theme="primary"
                  onClick={() => toUpdateNavigate({
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
                  onClick={() => toUpdateNavigate({
                    type: 'MODIFY',
                    level: 1,
                    detail: {
                      id: detail.id
                    }
                  })}
                >编辑</UsButton>
                <UsButton
                  size="mini"
                  ghost
                  theme={detail.status === 1 ? 'danger' : 'primary'}
                  onClick={() => setNavigateStatus(detail)}
                >{detail.status === 1 ? '隐藏' : '展示'}</UsButton>
                <UsButton
                  size="mini"
                  theme="danger"
                  onClick={() => setNavigateDelete(detail.id)}
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
                    onClick={() => setVisible(secDetail.id)}
                  />
                </View>
                {Boolean(secDetail?.visible) && (
                  <View className="inline_detail_button">
                    <UsButton
                      size="mini"
                      theme="primary"
                      onClick={() => toUpdateNavigate({
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
                      onClick={() => toUpdateNavigate({
                        type: 'MODIFY',
                        level: 2,
                        detail: {
                          id: secDetail.id
                        }
                      })}
                    >编辑</UsButton>
                    <UsButton
                      size="mini"
                      ghost
                      theme={secDetail.status === 1 ? 'danger' : 'primary'}
                      onClick={() => setNavigateStatus(secDetail)}
                    >{secDetail.status === 1 ? '隐藏' : '展示'}</UsButton>
                    <UsButton
                      size="mini"
                      theme="danger"
                      onClick={() => setNavigateDelete(detail.id)}
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
                        onClick={() => setVisible(thrDetail.id)}
                      />
                    </View>
                    {Boolean(thrDetail?.visible) && (
                      <View className="inline_detail_button">
                        <UsButton
                          size="mini"
                          theme="default"
                          onClick={() => toUpdateNavigate({
                            type: 'MODIFY',
                            level: 3,
                            detail: {
                              id: thrDetail.id
                            }
                          })}
                        >编辑</UsButton>
                        <UsButton
                          size="mini"
                          ghost
                          theme={thrDetail.status === 1 ? 'danger' : 'primary'}
                          onClick={() => setNavigateStatus(thrDetail)}
                        >{thrDetail.status === 1 ? '隐藏' : '展示'}</UsButton>
                        <UsButton
                          size="mini"
                          theme="danger"
                          onClick={() => setNavigateDelete(thrDetail.id)}
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