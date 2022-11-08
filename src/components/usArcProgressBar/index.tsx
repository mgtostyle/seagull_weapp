import React, { PropsWithChildren, useEffect } from "react"
import type { PageProps } from './interface'
import less from './index.module.less'
import { createCanvasContext } from "@tarojs/taro"
import { View, Canvas } from '@tarojs/components'
import { useSelector } from 'react-redux'

const UsArcProgressBar: React.FC<PropsWithChildren<PageProps>> = (props) => {

  const storeGlobal = useSelector(state => (state as any).global)

  const defaultProps = Object.assign({
    canvasId: '',
    textValue: '',
    textColor: less.usTextColor,
    textSize: 28,
    boxSize: 200,
    percent: 50,
    lineWidth: 5,
    lineColor: storeGlobal.theme,
    lineBack: less.usBackGColor
  }, props)

  useEffect(() => setArcProgressBar(), [props.percent])

  useEffect(() => setArcProgressBack(), [])

  const setArcProgressBar = () => {
    console.log('bar')
    const query = createCanvasContext('arc_progress_bar' + props.canvasId)
    query.beginPath()
    query.clearRect(0, 0, defaultProps.boxSize, defaultProps.boxSize)
    query.setLineWidth(defaultProps.lineWidth)
    query.setStrokeStyle(defaultProps.lineColor)
    query.beginPath()
    query.arc(defaultProps.boxSize / 2, defaultProps.boxSize / 2, (defaultProps.boxSize - defaultProps.lineWidth) / 2, 1.5 * Math.PI, defaultProps.percent / 100 * 2 * Math.PI + 1.5 * Math.PI, false)
    query.stroke()
    query.draw()
  }

  const setArcProgressBack = () => {
    console.log('back')
    const query = createCanvasContext('arc_progress_back' + props.canvasId)
    query.beginPath()
    query.setLineWidth(defaultProps.lineWidth)
    query.setStrokeStyle(defaultProps.lineBack)
    query.arc(defaultProps.boxSize / 2, defaultProps.boxSize / 2, (defaultProps.boxSize - defaultProps.lineWidth) / 2, 1.5 * Math.PI,  3.5 * Math.PI, false)
    query.stroke()
    query.draw()
  }

  return (
    <View className={less.block_index_container}>
      <View
        className={less.inline_text}
        style={{
          color: defaultProps.textColor,
          fontSize: `${defaultProps.textSize}rpx`
        }}
      >{defaultProps.textValue}</View>
      <Canvas
        className={less.inline_canvas}
        style={{
          width: defaultProps.boxSize,
          height: defaultProps.boxSize
        }}
        canvasId={'arc_progress_bar' + props.canvasId}
      />
      <Canvas
        className={less.inline_canvas_back}
        style={{
          width: defaultProps.boxSize,
          height: defaultProps.boxSize
        }}
        canvasId={'arc_progress_back' + props.canvasId}
      />
    </View>
  )

}

export default UsArcProgressBar;