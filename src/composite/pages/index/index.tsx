import React, { PropsWithChildren, useState } from 'react'
import type { PageProps, TabbarIndex } from './interface'

import { UsContainer, UsTabbar } from '@/components/usIndex'
import Apps from './apps'
import Users from './users'

const Index: React.FC<PropsWithChildren<{ props: PageProps }>> = () => {

  const [tabbarIndex, setTabbarIndex] = useState<TabbarIndex>(0)

  const tabbarList = [
    {
      icon: 'icon-line-home',
      name: '首页'
    },
    {
      icon: 'icon-line-user',
      name: '我的'
    }
  ]

  return (
    <UsContainer title={tabbarList[tabbarIndex].name}>
      {((index) => {
        switch (index) {
          case 0:
            return <Apps/>
          case 1:
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
