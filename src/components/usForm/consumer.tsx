import React, { Component, PropsWithChildren, createContext } from 'react'
import type { PageConsumerProps, PageConsumerState } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsFormConsumer extends Component<PropsWithChildren<PageConsumerProps>, PageConsumerState> {

  static defaultProps: PageConsumerProps = {
    label: '',
    initialValues: {},
    shouldComponentUpdate: true
  }

  shouldComponentUpdate(nextProps: Readonly<React.PropsWithChildren<PageConsumerProps>>): boolean {
    console.log(1)
    if (nextProps.shouldComponentUpdate === true && this.props.shouldComponentUpdate === false) {
      return true
    } else {
      return nextProps.shouldComponentUpdate
    }
  }

  render () {
    const { label, initialValues, setFieldValue }: PageConsumerProps = this.props
    const TableContext = createContext({ initialValues, setFieldValue })
    return (
      <React.Fragment>
        {label && (<View className={less.block_item_group_label}>{label}</View>)}
        <View className={less.block_index_consumer}>
          <TableContext.Provider value={{
            initialValues,
            setFieldValue
          }}>
            <TableContext.Consumer>{this.props.children}</TableContext.Consumer>
          </TableContext.Provider>
        </View>
      </React.Fragment>
    )
  }

}

export default UsFormConsumer