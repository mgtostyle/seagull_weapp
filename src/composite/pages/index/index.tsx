import React, { PropsWithChildren } from 'react'
import type { PageProps } from './interface'

import { UsContainer } from '@/components/usIndex'

const Index: React.FC<PropsWithChildren<{ props: PageProps, $api }>> = ({ $api }) => {

  return (
    <UsContainer title="首页"></UsContainer>
  )

}

export default Index;