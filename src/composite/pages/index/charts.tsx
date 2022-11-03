import React, { PropsWithChildren } from 'react'
import type { PageChartsProps } from './interface'
import { View } from '@tarojs/components'

import MemberPie from '../../childs/indexCharts/memberPie'

const Charts: React.FC<PropsWithChildren<PageChartsProps>> = () => {

  return (
    <View>
      <MemberPie />
    </View>
  )

}

export default Charts;
