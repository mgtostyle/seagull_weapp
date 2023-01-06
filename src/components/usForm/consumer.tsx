import React, { createContext, ReactElement } from 'react'
import less from './index.module.less'
import { View } from '@tarojs/components'

const UsFormConsumer = <T extends unknown>(props): ReactElement | null => {

  const TableContext = createContext<T>(props.initialValues)

  return (
    <React.Fragment>
      {props.label && (<View className={less.block_item_group_label}>{props.label}</View>)}
      <View className={less.block_index_consumer}>
        <TableContext.Provider value={props.initialValues}>
          <TableContext.Consumer>{props.children}</TableContext.Consumer>
        </TableContext.Provider>
      </View>
    </React.Fragment>
  )

}

export default UsFormConsumer