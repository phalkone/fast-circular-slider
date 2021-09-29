import React, { useContext } from 'react'
import type { IMousePos, IInitialArc } from '../../types/CircularSlider.types'
import { getAngle, bound } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import { CircularSliderContext } from '.'

/**
 * Arc for the slider
 */
export const Arc = () => {
  const context = useContext(CircularSliderContext)
  const onMouseEnter = () => context.setHover(true)
  const onMouseLeave = () => context.setHover(false)
  const start = context.value[0]
  const end = context.value[1]
  const largeFlag = (end < start ? 360 - start + end : end - start) > 180 ? 1 : 0
  console.log(largeFlag)

  const onMouseDown = (parent : IMousePos) : IInitialArc => {
    const initialCenter = {
      x: parent.x + context.center,
      y: parent.y + context.center
    }
    return {
      ...initialCenter,
      start: start,
      end: end,
      arc: getAngle(parent.pageX, parent.pageY, initialCenter)
    }
  }

  const onMouseMove = (x: number, y: number, initial: IInitialArc) : void => {
    const newAngle = getAngle(x, y, initial)
    const diff = newAngle - initial.arc
    const value : [number, number] = [bound(initial.start + diff), bound(initial.end + diff)]
    context.setValue(value)
  }

  const onDrag = (dragging: boolean) : void => {
    context.setSelectedHandle(dragging ? 2 : 3)
  }

  const stroke = context.disabled ? context.disabledColor : (context.hover || context.selectedHandle !== 3) ? context.hoverColor : context.sliderColor

  let arc = (
    <>
    <path
      d={`M ${context.points[1].x} ${context.points[1].y} ` +
        `A ${context.circleRadius} ${context.circleRadius} 0 ${largeFlag} 0 ` +
        `${context.points[0].x} ${context.points[0].y}`}
      stroke={stroke}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      fill='none'
      strokeWidth={context.arcWidth}
    />
    {(start === end || Math.abs(start - end) === 360) &&
    <circle
      cx={context.center}
      cy={context.center}
      r={context.circleRadius}
      fill='none'
      strokeWidth={context.arcWidth}
      stroke={stroke}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}/>}
    </>
  )

  if (!context.disabled) {
    arc = (
      <Draggable
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onDrag={onDrag}>
        {arc}
      </Draggable>
    )
  }

  return arc
}
