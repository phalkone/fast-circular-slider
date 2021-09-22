import React from 'react'
import type { IHandle, IPosition, IMousePos } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const onMouseDown = (parent : IMousePos) : IPosition => {
    return {
      x: parent.x + props.center,
      y: parent.y + props.center
    }
  }

  const onMouseMove = (x: number, y: number, initial: IPosition) : void => {
    const angle : number = getAngle(x, y, initial)
    props.setAngle(angle)
  }

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      initial={{ x: 0, y: 0 }}
      onTop>
      <circle
        cx={props.angle.x}
        cy={props.angle.y}
        r={6}
        stroke="#69c0ff"
        fill="white"
        strokeWidth="2"
      />
    </Draggable>
  )
}
