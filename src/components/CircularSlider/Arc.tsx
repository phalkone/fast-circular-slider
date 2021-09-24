import React from 'react'
import type { IArc, IMousePos, IInitialArc } from '../../types/CircularSlider.types'
import { getAngle, bound } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Arc for the slider
 */
export const Arc = (props: IArc) => {
  const onMouseDown = (parent : IMousePos) : IInitialArc => {
    const initialCenter = {
      x: parent.x + props.center,
      y: parent.y + props.center
    }
    return {
      ...initialCenter,
      start: props.start,
      end: props.end,
      arc: getAngle(parent.pageX, parent.pageY, initialCenter)
    }
  }

  const onMouseMove = (x: number, y: number, initial: IInitialArc) : void => {
    const newAngle = getAngle(x, y, initial)
    const diff = newAngle - initial.arc
    const start = bound(initial.start + diff)
    const end = bound(initial.end + diff)
    props.setStart(start)
    props.setEnd(end)
  }

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}>
      <path
        d={`M ${props.startPoint.x} ${props.startPoint.y} ` +
        `A ${props.radius} ${props.radius} 0 ${props.largeFlag} 0 ` +
        `${props.endPoint.x} ${props.endPoint.y}`}
        className={styles.arc}
      />
    </Draggable>
  )
}
