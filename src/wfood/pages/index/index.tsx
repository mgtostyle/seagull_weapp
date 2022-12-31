import React, { PropsWithChildren, useState } from "react"
import type { TabbarIndex } from './interface'

import { UsContainer, UsTabbar } from "@components/usIndex"
import Gallery from './gallery'
import Users from './users'

const Index: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const [tabbarIndex, setTabbarIndex] = useState<TabbarIndex>(1)

  const tabbarList = [
    {
      icon: 'icon-line-ranking',
      name: '统计分析'
    },
    {
      icon: 'icon-line-pc',
      name: '工作台'
    },
    {
      icon: 'icon-line-userset1',
      name: '个人中心'
    }
  ]

  return (
    <UsContainer
      title={tabbarList[tabbarIndex].name}
      isfull={tabbarIndex !== tabbarList.length - 1}
    >
      <Gallery visible={tabbarIndex === 1} $apis={$apis} />
      <Users visible={tabbarIndex === tabbarList.length - 1} $apis={$apis} />
      <UsTabbar
        current={tabbarIndex}
        list={tabbarList}
        onChange={setTabbarIndex}
      />
    </UsContainer>
  )

}

export default Index