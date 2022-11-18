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
    width: 'auto',
    shape: 'round'
  }

  get style (): {[propsName: string]: any} {
    const { block, theme, ghost, size, width, shape }: PageProps = this.props
    const style = Object.assign(
      {
        display: block ? 'block' : 'inline',
        width: typeof width === 'number' ? `${width}rpx` : width,
        borderRadius: shape === 'round' ? '50PX' : '12rpx'
      },
      size === 'mini' ? {
        paddingTop: '6PX',
        paddingBottom: '6PX'
      } : {
        paddingTop: '12PX',
        paddingBottom: '12PX'
      },
      theme === 'primary' ? this.ghost(ghost, this.props.global.theme)
        : theme === 'authorize' ? this.ghost(ghost, less.usAuthorizeColor)
        : theme === 'danger' ? this.ghost(ghost, less.usDangerColor)
        : theme === 'forbid' ? this.ghost(ghost, less.usForbidColor)
        : theme === 'warn' ? this.ghost(ghost, less.usWarnColor)
        : theme === 'default' && this.ghost(true, less.usTextColor)
    )
    return style
  }

  private ghost (status: boolean, rgba: string) {
    return status ? {
      color: rgba,
      border: `1PX solid ${rgba}`,
      backgroundColor: '#ffffff',
      paddingTop: this.props.size === 'mini' ? '5PX' : '11PX',
      paddingBottom: this.props.size === 'mini' ? '5PX' : '11PX'
    } : {
      color: '#ffffff',
      background: `linear-gradient(45deg, ${rgba}, ${rgba}AA)`
    }
  }

  render (): ReactNode {
    const { block, theme, ghost, children, nodeKey, className, style, hoverClass, ...params } = (this.props as PageProps)
    const nodeClass = `inline${(nodeKey || '').replace(/[A-Z]/g, value => `_${value.toLocaleLowerCase()}`)}`
    const value = typeof children === 'string' && children?.length == 2 ? children.split('').join(' ') : children
    return (
      <Button
        className={`${less.block_container} ${less[nodeClass]} ${ghost ? less.ghost : less.full} ${className} ${params.disabled && less.disabled}`}
        {...params}
        style={{ ...this.style, ...(style as any) }}
        hoverClass={`${less.inline_hover_class} ${hoverClass}`}
      >&nbsp;{value}&nbsp;</Button>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsButton);
