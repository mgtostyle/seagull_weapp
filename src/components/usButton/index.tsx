import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Button } from '@tarojs/components'
import { connect } from 'react-redux'

class UsButton extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  static defaultProps: PageProps = {
    block: true,
    theme: 'primary',
    ghost: false,
    width: 'auto'
  }

  get style () {
    const { block, theme, ghost, size, width }: PageProps = this.props
    const style = Object.assign(
      {
        display: block ? 'block' : 'inline',
        width: typeof width === 'number' ? `${width}rpx` : width
      },
      size === 'mini' && {
        lineHeight: '70rpx'
      },
      theme === 'primary' ? this.ghost(ghost, this.props.global.theme)
        : theme === 'danger' ? this.ghost(ghost, '#e34d59')
        : theme === 'default' && this.ghost(true, '#262626')
    )
    return style
  }

  private ghost (status: boolean, rgba: string) {
    return status ? {
      color: rgba,
      ['box-sizing']: 'border-box',
      border: `1PX solid ${rgba}`,
      backgroundColor: '#ffffff'
    } : {
      color: '#ffffff',
      background: `linear-gradient(45deg, ${rgba}, ${rgba}AA)`
    }
  }

  render (): ReactNode {
    const { block, theme, ghost, children, nodeKey, ...params } = this.props
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    const value = typeof children === 'string' && children?.length == 2 ? children.split('').join(' ') : children
    return (
      <Button
        className={`${less.block_container} ${less[nodeClass]} ${ghost && less.ghost}`}
        {...params}
        style={this.style}
      >&nbsp;{value}&nbsp;</Button>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsButton);
