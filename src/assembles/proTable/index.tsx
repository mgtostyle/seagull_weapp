import React, { ReactElement, createContext, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { ProTableProps } from './interface'
import less from './index.module.less'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { UsDataNone } from '@components/usIndex'

const ProTableItem = <T extends unknown>(props): ReactElement | null => {

  const TableContext = createContext<T>(props.detail)

  return (
    <TableContext.Provider value={props.detail}>
      <TableContext.Consumer>{props.children}</TableContext.Consumer>
    </TableContext.Provider>
  )

}

const ProTable = forwardRef(<T extends unknown>(props: ProTableProps, ref): ReactElement | null => {

  useImperativeHandle(ref, () => ({
    setList,
    setQuerySelect,
    reLoad: () => useRequest({ ...initialValues, page: 1 })
  }))

  const defaultProps: ProTableProps = Object.assign({
    refresh: false,
    hitbottom: false,
    className: '',
    noneConfig: {}
  }, props)

  const [initialValues, setInitialValues] = useState<any>(Object.assign(typeof props?.limit === 'number' && {
    page: 1,
    limit: props.limit
  }, props?.initialValues))
  const [list, setList] = useState<Array<T>>([])
  const [count, setCount] = useState<number>(0)
  const [refresh, setRefresh] = useState<'start' | 'loading' | 'end'>('start')
  const [hitbottom, setHitbottom] = useState<'hidden' | 'loading' | 'finish'>('hidden')

  useEffect(() => setQuerySelect(props?.initialValues), [])

  const setQuerySelect = (formValues: {[propsName: string]: any} = initialValues) => {
    if (typeof props.limit === 'number') {
      formValues.page = 1
      formValues.limit = props.limit
    }
    useRequest(formValues)
  }

  const useRequest = async (formValues = initialValues, isRefresh: boolean = false) => {
    let result = await props.request<T>(formValues)
    let currentList = typeof props.limit === 'number' && formValues.page > 1 ? list.concat(result.list) : result.list
    typeof props.limit === 'number' && formValues.page === 1 && Taro.pageScrollTo({
      scrollTop: 0
    });
    setInitialValues(formValues)
    setList(currentList)
    typeof props.limit === 'number' && setCount(result?.count || 0)
    isRefresh && setRefresh('end');
    isRefresh && setTimeout(() => {
      Taro.stopPullDownRefresh()
      setRefresh('start')
    }, 800)
    setHitbottom(currentList.length < result.count ? 'hidden' : 'finish')
  }

  usePullDownRefresh(() => {
    console.log('??????')
    if (defaultProps.refresh) {
      setRefresh('loading')
      const currentValues: any = initialValues
      if (typeof props.limit === 'number') {
        currentValues.page = 1
      }
      useRequest(currentValues, true)
    } else {
      Taro.stopPullDownRefresh()
    }
  })

  useReachBottom(() => {
    console.log('??????')
    if (hitbottom === 'finish' || props.limit === false) {
      return false;
    } else if (!defaultProps.hitbottom) {
      setHitbottom('hidden')
    } else if (list.length < count) {
      setHitbottom('loading')
      useRequest({ ...initialValues, page: initialValues.page + 1 })
    } else {
      setHitbottom('finish')
    }
  })

  return (
    <React.Fragment>
      {defaultProps.refresh && (
        <View className={less.block_index_refresh}>
          {((value) => {
            switch (value) {
              case 'start':
                return '????????????';
              case 'loading':
                return '????????????...';
              case 'end':
                return '????????????';
            }
          })(refresh)}
        </View>
      )}
      {Boolean(list?.length > 0) ? (
        <React.Fragment>
          <View className={defaultProps?.className ? defaultProps?.className : less.block_index_list}>
            {list.map((detail: T, index: number) => (
              <React.Fragment key={index}>
                <ProTableItem<T> detail={detail} children={props.children} />
              </React.Fragment>
            ))}
          </View>
          {hitbottom !== 'hidden' && (
            <View
              className={less.block_index_hitbottom}
            >{hitbottom === 'loading' ? '?????????...' : hitbottom === 'finish' && '????????????????????????'}</View>
          )}
        </React.Fragment>
      ) : (
        <UsDataNone {...defaultProps.noneConfig} />
      )}
    </React.Fragment>
  )

})

export default ProTable;
