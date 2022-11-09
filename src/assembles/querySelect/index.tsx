import React, { PropsWithChildren, useState } from 'react'
import type { PageProps, EnumItem } from './interface'
import less from './index.module.less'
import { View, Form, Text, ScrollView } from '@tarojs/components'
import { useSelector } from 'react-redux'

import { UsInput, UsButton } from '@components/usIndex'

const QuerySelect: React.FC<PropsWithChildren<PageProps>> = (props) => {

  const storeGlobal = useSelector(state => (state as any).global)

  const defaultProps: PageProps = Object.assign({
    placeholder: '请输入关键词...',
    search: true,
    select: false,
    valueEnum: []
  }, props)

  const [cursor, setCursor] = useState<number>(0)

  const [initialValues, setInitialValues] = useState({})

  const setFieldValues = (values) => {
    const params = Object.assign(initialValues, values)
    setInitialValues(params)
    typeof props.onSubmit === 'function' && props.onSubmit(params)
  }

  return (
    <React.Fragment>
      <View className={less.block_index_container}>
        <Form
          onSubmit={e => setFieldValues(e.detail.value)}
        >
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
              confirmType="search"
              onInput={(e) => setCursor(e.detail.cursor)}
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
          {defaultProps.select && Boolean(defaultProps.valueEnum?.length) && (
            <ScrollView className={less.inline_select}>
              {defaultProps.valueEnum?.map((element: EnumItem) => (
                <View
                  className={less.inline_select_title}
                  key={element.dataIndex}
                >
                  <Text className={less.title}>{element.title}</Text>
                  <Text className={`${less.icon} iconfont icon-fill-down1`} />
                </View>
              ))}
            </ScrollView>
          )}
        </Form>
      </View>
    </React.Fragment>
  )

}

export default QuerySelect;
