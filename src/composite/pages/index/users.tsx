import React, { PropsWithChildren, useState } from 'react'
import type {} from './interface'
import './users.less'

import { QuerySelect, ProTable } from '@/assembles/moduleIndex'

const Users: React.FC<PropsWithChildren<{ $apis }>> = ({ $apis }) => {

  const [querySelect, setQuerySelect] = useState<any>({})

  const getAccountList = async () => {
    try {
      let result = await $apis.composite.administrator.accountList.get()
      return {
        list: result.data.list,
        count: result.data.list?.length || 0
      }
    } catch (error) {
      return {
        list: [],
        count: 0
      }
    }
  }

  return (
    <React.Fragment>
      <QuerySelect
        search
        onSubmit={setQuerySelect}
      />
      <ProTable
        initialValues={querySelect}
        request={getAccountList}
      ></ProTable>
    </React.Fragment>
  )

}

export default Users;
