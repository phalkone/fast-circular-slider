import React, { useContext } from 'react'
import type { IMousePos, IInitialArc } from '../../types/CircularSlider.types'
import { getAngle, bound } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import { CircularSliderContext } from '.'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Arc for the slider
 */
export const Arc = () => {
  const context = useContext(CircularSliderContext)
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

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onDrag={onDrag}>
      <path
        d={`M ${context.points[1].x} ${context.points[1].y} ` +
        `A ${context.radius} ${context.radius} 0 ${largeFlag} 0 ` +
        `${context.points[0].x} ${context.points[0].y}`}
        className={styles.arc}
      />
      {(start === end || Math.abs(start - end) === 360) &&
        <circle
          cx={context.center}
          cy={context.center}
          r={context.radius}
          className={styles.circle}
        />
      }
    </Draggable>
  )
}
