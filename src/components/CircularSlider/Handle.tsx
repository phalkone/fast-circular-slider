import React, { useContext } from 'react'
import type { IHandle, IPosition, IMousePos } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import { CircularSliderContext } from '.'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const context = useContext(CircularSliderContext)
  const onMouseEnter = () => context.setHover(true)
  const onMouseLeave = () => context.setHover(false)
  const onMouseDown = (parent : IMousePos) : IPosition => {
    return {
      x: parent.x + context.center,
      y: parent.y + context.center
    }
  }

  const onMouseMove = (x: number, y: number, initial: IPosition) : void => {
    const angle : number = getAngle(x, y, initial)
    context.setValue(props.id === 1 ? [context.value[0], angle] : [angle, context.value[1]])
  }

  const onDrag = (dragging: boolean) : void => {
    context.setSelectedHandle(dragging ? props.id : 3)
  }

  let handle = (
    <circle
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cx={context.points[props.id].x}
      cy={context.points[props.id].y}
      r={context.handleRadius}
      fill='white'
      strokeWidth={context.handleWidth}
      stroke={context.disabled ? context.disabledColor : (context.hover || context.selectedHandle !== 3) ? context.hoverColor : context.sliderColor}
    />
  )

  if (!context.disabled) {
    handle = (
      <Draggable
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTop={context.onTop}
        onDrag={onDrag} >
        {context.selectedHandle === props.id &&
          <circle
            cx={context.points[props.id].x}
            cy={context.points[props.id].y}
            r={context.handleRadius + context.handleWidth + 2}
            fill={`${context.hoverColor}`}
            opacity={0.2}
          />}
          {handle}
      </Draggable>
    )
  }

  return handle
}
