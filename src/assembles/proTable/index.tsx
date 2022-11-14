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
    setList
  }))

  const defaultProps: ProTableProps = Object.assign({
    refresh: false,
    hitbottom: false,
    className: '',
    noneConfig: {}
  }, props)

  const [initialValues, setInitialValues] = useState(Object.assign({
    page: 1,
    limit: 10
  }, props?.initialValues))
  const [list, setList] = useState<Array<T>>([])
  const [count, setCount] = useState<number>(0)
  const [refresh, setRefresh] = useState<'start' | 'loading' | 'end'>('start')
  const [hitbottom, setHitbottom] = useState<'hidden' | 'loading' | 'finish'>('hidden')

  useEffect(() => {
    useRequest({ ...props?.initialValues, page: 1, limit: 10 })
  }, [props.initialValues])

  const useRequest = async (formValues = initialValues, isRefresh: boolean = false) => {
    let result = await props.request(formValues)
    let currentList = formValues.page > 1 ? list.concat(result.list) : result.list
    formValues.page === 1 && Taro.pageScrollTo({
      scrollTop: 0
    });
    setInitialValues(formValues)
    setList(currentList)
    setCount(result.count)
    isRefresh && setRefresh('end');
    isRefresh && setTimeout(() => {
      Taro.stopPullDownRefresh()
      setRefresh('start')
    }, 2000)
    setHitbottom(currentList.length < result.count ? 'hidden' : 'finish')
  }

  usePullDownRefresh(() => {
    console.log('下拉')
    if (defaultProps.refresh) {
      setRefresh('loading')
      useRequest({ ...initialValues, page: 1 }, true)
    } else {
      Taro.stopPullDownRefresh()
    }
  })

  useReachBottom(() => {
    console.log('上推')
    if (hitbottom === 'finish') {
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
                return '放开刷新';
              case 'loading':
                return '正在刷新...';
              case 'end':
                return '刷新完成';
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
            >{hitbottom === 'loading' ? '加载中...' : hitbottom === 'finish' && '已加载完全部数据'}</View>
          )}
        </React.Fragment>
      ) : (
        <UsDataNone {...defaultProps.noneConfig} />
      )}
    </React.Fragment>
  )

})

export default ProTable;
