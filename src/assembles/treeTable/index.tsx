import { Component, PropsWithChildren, ReactNode, createContext, Children } from 'react'
import type { PageProps } from './interface'

const Context = createContext({
  title: ''
})

class TreeTable extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    title: ''
  }

  render (): ReactNode {
    const { title }: PageProps = this.props
    return (
      <Context.Provider value={{ title }}>
        {/* <Context.Consumer>{this.props.children}</Context.Consumer> */}
      </Context.Provider>
    )
  }

}

export const Consumer = Context.Consumer

export default TreeTable;