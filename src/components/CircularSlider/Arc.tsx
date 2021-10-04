import React from 'react'
import type { IArc, IMousePos, IInitialArc } from '../../types/CircularSlider.types'
import { getAngle, bound } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'

/**
 * Arc for the slider
 */
export const Arc = (props: IArc) => {
  const onMouseEnter = () => props.setHover(true)
  const onMouseLeave = () => props.setHover(false)
  const start = props.value[0]
  const end = props.value[1]
  const largeFlag = (end < start ? 360 - start + end : end - start) > 180 ? 1 : 0

  const onMouseDown = (parent : IMousePos) : IInitialArc => {
    const initialCenter = {
      x: parent.x + props.center,
      y: parent.y + props.center
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
    props.setValue(value)
  }

  const onDrag = (dragging: boolean) : void => {
    props.setSelectedHandle(dragging ? 2 : 3)
  }

  const stroke = props.style.disabled ? props.style.disabledColor : (props.hover || props.selectedHandle !== 3) ? props.style.hoverColor : props.style.sliderColor

  let arc = (
    <>
    <path
      d={`M ${props.points[1].x} ${props.points[1].y} ` +
        `A ${props.style.circleRadius} ${props.style.circleRadius} 0 ${largeFlag} 0 ` +
        `${props.points[0].x} ${props.points[0].y}`}
      stroke={stroke}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      fill='none'
      strokeWidth={props.style.arcWidth}
    />
    {(start === end || Math.abs(start - end) === 360) &&
    <circle
      cx={props.center}
      cy={props.center}
      r={props.style.circleRadius}
      fill='none'
      strokeWidth={props.style.arcWidth}
      stroke={stroke}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid='fullCircle' />}
    </>
  )

  if (!props.style.disabled) {
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
