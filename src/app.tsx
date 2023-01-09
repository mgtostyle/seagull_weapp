import { Component, PropsWithChildren, Children, cloneElement } from 'react'
import './app.less'
import store from './store/index'
import { Provider } from 'react-redux'

import apis from './config/apis/index/index'
import commonLess from '@assets/less/common.module.less'
import * as filter from './config/handler/filter'

class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return (
      <Provider store={store}>
        {Children.map(this.props.children, (childrenNode) => {
          let childrenProps: {[propsName: string]: any} = {
            $apis: apis,
            $commonLess: commonLess,
            $filter: filter
          }
          return cloneElement((childrenNode as any), childrenProps)
        })}
      </Provider>
    )
  }
}

Component.prototype.$apis = apis
Component.prototype.$commonLess = commonLess
Component.prototype.$filter = filter

export default App
