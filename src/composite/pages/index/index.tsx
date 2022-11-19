import React, { PropsWithChildren, useState, useRef } from 'react'
import type { PageProps, TabbarIndex } from './interface'

import { UsContainer, UsTabbar } from '@components/usIndex'
import Charts from './charts'
import Manage from './manage'
import Users from './users'

const Index: React.FC<PropsWithChildren<PageProps>> = (props) => {

  const mangeRef = useRef<any>()
  const [tabbarIndex, setTabbarIndex] = useState<TabbarIndex>(1)

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
      icon: 'icon-line-ranking1',
      name: '数据面板'
    },
    {
      icon: 'icon-line-organizational',
      name: '平台管理'
    },
    {
      icon: 'icon-line-set',
      name: '设置中心'
    }
  ]

  return (
    <UsContainer
      title={tabbarList[tabbarIndex].name}
      back={tabbarIndex !== 1 ? 0 : 1}
      setting
      tabbar
      columns={containerColumns}
    >
      {((index) => {
        switch (index) {
          case 0:
            return <Charts />
          case 1:
            return <Manage ref={mangeRef} {...(props as any)} />
          case 2:
            return <Users />
        }
      })(tabbarIndex)}
      <UsTabbar
        current={tabbarIndex}
        list={tabbarList as any}
        onChange={setTabbarIndex}
      />
    </UsContainer>
  )

}

export default Index;
