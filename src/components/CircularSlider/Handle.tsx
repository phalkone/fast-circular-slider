import React from 'react'
import type { IHandle, IPosition, IMousePos } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const onMouseEnter = () => props.setHover(true)
  const onMouseLeave = () => props.setHover(false)
  const onMouseDown = (parent : IMousePos) : IPosition => {
    return {
      x: parent.x + props.center,
      y: parent.y + props.center
    }
  }

  const onMouseMove = (x: number, y: number, initial: IPosition) : void => {
    const angle : number = getAngle(x, y, initial)
    props.setValue(props.id === 1 ? [props.value[0], angle] : [angle, props.value[1]])
  }

  const onDrag = (dragging: boolean) : void => {
    props.setSelectedHandle(dragging ? props.id : 3)
  }

  let handle = (
    <circle
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cx={props.points[props.id].x}
      cy={props.points[props.id].y}
      r={props.style.handleRadius}
      fill='white'
      data-testid={props.id === 0 ? 'startHandle' : 'endHandle'}
      strokeWidth={props.style.handleWidth}
      stroke={props.style.disabled ? props.style.disabledColor : (props.hover || props.selectedHandle !== 3) ? props.style.hoverColor : props.style.sliderColor}
    />
  )

  if (!props.style.disabled) {
    handle = (
      <Draggable
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTop={props.onTop}
        onDrag={onDrag} >
        {props.selectedHandle === props.id &&
          <circle
            cx={props.points[props.id].x}
            cy={props.points[props.id].y}
            r={props.style.handleRadius + props.style.handleWidth + 2}
            fill={`${props.style.hoverColor}`}
            opacity={0.2}
          />}
          {handle}
      </Draggable>
    )
  }

  return handle
}
