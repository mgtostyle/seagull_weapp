import React, { Component, PropsWithChildren, ReactNode, createContext, Children } from 'react'
import type { PageProps } from './interface'

const TableContext = createContext({ title: '来自context' })

class TreeTable extends Component<PropsWithChildren<PageProps>> {

  static contextType = TableContext

  static defaultProps: PageProps = {
    title: ''
  }

  render (): ReactNode {
    return (
      <TableContext.Provider value={{ title: '来自context' }}>
        <TableContext.Consumer>{this.props.children}</TableContext.Consumer>
      </TableContext.Provider>
    )
  }

}

export default TreeTable;