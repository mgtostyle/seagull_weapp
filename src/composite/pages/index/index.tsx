import React, { PropsWithChildren, useState, useRef } from 'react'
import type { TabbarIndex } from './interface'
import { useLoad } from '@tarojs/taro'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { compositeActions } from '@/store/composite'

import { UsContainer, UsTabbar } from '@components/usIndex'
import Charts from './charts'
import Manage from './manage'
import Users from './users'
import Setting from './setting'

const Index: React.FC<PropsWithChildren<{ $apis, $commonLess }>> = ({ $apis, $commonLess }) => {

  const dispatch = useDispatch()
  const mangeRef = useRef<any>()
  const [tabbarIndex, setTabbarIndex] = useState<TabbarIndex>(0)

  const containerColumns = [
    {
      name: '新建平台',
      result: () => mangeRef.current?.toMiniAppEdit()
    },
    {
      name: '重置查询条件',
      result: () => {
        mangeRef.current?.resetFields({})
        mangeRef.current?.setQuerySelect({})
      }
    }
  ]

  const tabbarList = [
    {
      icon: 'icon-line-ranking',
      name: '统计分析'
    },
    {
      icon: 'icon-line-assembly',
      name: 'APP平台'
    },
    {
      icon: 'icon-line-usermanagement',
      name: '通讯录'
    },
    {
      icon: 'icon-line-set',
      name: '设置中心'
    }
  ]

  useLoad(() => {
    dispatch(compositeActions.setLogin({
      status: true,
      setime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }))
  })

  return (
    <UsContainer
      title={tabbarList[tabbarIndex].name}
      back={tabbarIndex !== 1 ? 0 : 1}
      setting
      tabbar
      tcolor={tabbarIndex === 3 ? '#ffffff' : $commonLess.usTextColor }
      isfull={tabbarIndex !== 3}
      columns={containerColumns}
    >
      {((index) => {
        switch (index) {
          case 0:
            return <Charts />
          case 1:
            return <Manage ref={mangeRef} {...{ $apis, $commonLess } as any} />
          case 2:
            return <Users $apis={$apis} />
          case 3:
            return <Setting $apis={$apis} />
        }
      })(tabbarIndex)}
      <UsTabbar
        current={tabbarIndex}
        list={tabbarList}
        onChange={setTabbarIndex}
      />
    </UsContainer>
  )

}

export default Index;
