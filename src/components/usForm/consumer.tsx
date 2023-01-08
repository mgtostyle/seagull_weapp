import React, { Component, PropsWithChildren, createContext } from 'react'
import type { PageConsumerProps, PageConsumerState } from './interface'
import less from './index.module.less'
import { View } from '@tarojs/components'

class UsFormConsumer extends Component<PropsWithChildren<PageConsumerProps>, PageConsumerState> {

  static defaultProps: PageConsumerProps = {
    label: '',
    initialValues: {}
  }

  constructor (props) {
    super (props)
    this.state = {
      updateVisible: true
    }
  }

  shouldComponentUpdate(nextProps: Readonly<React.PropsWithChildren<PageConsumerProps>>, nextState: Readonly<PageConsumerState>): boolean {
    console.log(nextProps.shouldComponentUpdate, nextState.updateVisible)
    if (nextProps.shouldComponentUpdate && !nextState.updateVisible) {
      return true
    } else {
      return nextState.updateVisible
    }
  }

  setFieldValue (params) {
    console.log(params)
    const { setFieldValue }: PageConsumerProps = this.props
    this.setState({
      updateVisible: params.update
    }, () => typeof setFieldValue === 'function' && setFieldValue(params))
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
            setFieldValue: this.setFieldValue.bind(this)
          }}>
            <TableContext.Consumer>{this.props.children}</TableContext.Consumer>
          </TableContext.Provider>
        </View>
      </React.Fragment>
    )
  }

}

export default UsFormConsumer