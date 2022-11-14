import React, { PropsWithChildren, useState, forwardRef, useImperativeHandle } from 'react'
import type { PageProps, QuerySelectColumns, ColumnItem } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View, Form, Text, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsInput, UsRadio, UsButton, UsDataNone } from '@components/usIndex'

const QuerySelect: React.FC<PropsWithChildren<PageProps>> = forwardRef(({ children, ...props }, ref) => {

  useImperativeHandle(ref, () => ({
    resetFields
  }))

  const storeGlobal = useSelector(state => (state as any).global)

  const defaultProps: PageProps = Object.assign({
    position: 'fixed',
    placeholder: '请输入关键词...',
    search: true,
    select: false,
    columns: []
  }, props)

  const [initialValues, setInitialValues] = useState<any>({})
  const [cursor, setCursor] = useState<number>(0)
  const [columns, setColumns] = useState<QuerySelectColumns>(defaultProps.columns || [])
  const [visible, setVisible] = useState<boolean>(false)
  const [selects, setSelects] = useState<ColumnItem | null>(null)

  const onInput = (e) => {
    setCursor(e.detail.cursor)
    setInitialValues({ keyword: e.detail.value })
  }

  const setFieldValues = (values) => {
    const params = Object.assign(initialValues, values)
    setInitialValues(params)
    typeof props.onSubmit === 'function' && props.onSubmit(params)
  }

  const onSelectChange = async (detail: ColumnItem, index: number) => {
    const { request, valueEnum, ...params } = detail
    if (visible && detail.dataIndex === selects?.dataIndex) {
      return setVisible(false)
    }
    else if (typeof request === 'function') {
      (params as ColumnItem).valueEnum = (await request())?.reduce((obj, item): any => {
        obj[item.value] = item.label
        return obj
      }, {})
    } else {
      (params as ColumnItem).valueEnum = valueEnum || {}
    }
    columns[index] = params
    setVisible(true)
    setColumns(columns)
    setSelects(params)
  }

  const onRadioChange = (key: string, value: string) => {
    setVisible(false)
    key ? setFieldValues({ [key]: value }) : Taro.showToast({
      title: '未定义key值，该条件无法支持查询',
      icon: 'none',
      duration: 2000
    })
  }

  const resetFields = (params?: {[propsName: string]: any}) => {
    setCursor(0)
    setInitialValues(params || {})
  }

  return (defaultProps.search || defaultProps.select) ? (
    <React.Fragment>
      <View
        className={less.block_index_container}
        style={{
          position: defaultProps.position,
          top: defaultProps.position === ('relative' || 'sticky') ? 'none' : `${storeGlobal.navigateHeight}px`
        }}
      >
        <Form onSubmit={e => setFieldValues(e.detail.value)}>
          {defaultProps.search && (
            <View
              className={less.inline_search}
              style={{
                padding: `0 ${storeGlobal.navigate.xBetween}px`
              }}
            >
              <UsInput
                className={less.input}
                name="keyword"
                placeholder={defaultProps.placeholder}
                value={initialValues.keyword}
                confirmType="search"
                onInput={(e) => onInput(e)}
                onConfirm={(e) => setFieldValues({ keyword: e.detail.value })}
              />
              {Boolean(cursor) && (
                <UsButton
                  className={less.button}
                  size="mini"
                  formType="submit"
                >搜索</UsButton>
              )}
            </View>
          )}
          {defaultProps.select && Boolean(columns?.length) && (
            <View className={less.inline_select_inner}>
              <ScrollView
                className={less.select_scroll}
                scrollX
              >
                {columns?.map((element: ColumnItem, index: number) => {
                  let initialValue = initialValues?.[element?.dataIndex] && element?.valueEnum?.[initialValues?.[element?.dataIndex]]
                  return (
                    <View
                      className={less.select_title}
                      key={element.dataIndex}
                      onClick={() => onSelectChange(element, index)}
                    >
                      <Text className={less.title}>{element.title}{initialValue && ` - ${initialValue}`}</Text>
                      <Text className={`${less.icon} iconfont ${visible && element.dataIndex===selects?.dataIndex?'icon-fill-up1':'icon-fill-down1'}`} />
                    </View>
                  )
                })}
              </ScrollView>
              {visible && (
                <React.Fragment>
                  <View className={less.select_back} />
                  {Boolean(Object.keys(selects?.valueEnum || {}).length) ? (
                    <ScrollView
                      className={less.select_column}
                      scrollY
                    >
                      <UsRadio.Group
                        initialValue={initialValues?.[(selects as ColumnItem)?.dataIndex]}
                        onChange={(e) => onRadioChange((selects as ColumnItem)?.dataIndex, e.value)}
                      >
                        {Object.keys(selects?.valueEnum || {}).map((value: string, index: number) => (
                          <UsRadio
                            value={value}
                            key={index}
                          >{selects?.valueEnum?.[value]}</UsRadio>
                        ))}
                      </UsRadio.Group>
                    </ScrollView>
                  ) : (
                    <View className={less.select_none}>
                      <UsDataNone>暂无筛选条件{selects?.dataIndex}</UsDataNone>
                    </View>
                  )}
                </React.Fragment>
              )}
            </View>
          )}
        </Form>
      </View>
      {defaultProps.position !== ('relative' || 'sticky') && (
        <View
          className={less.block_index_move}
          style={{
            paddingBottom: `${(defaultProps.search ? 100 : 0) + (defaultProps.select ? 90 : 0)}rpx`
          }}
        />
      )}
    </React.Fragment>
  ) : (<React.Fragment></React.Fragment>)

})

export default QuerySelect;
