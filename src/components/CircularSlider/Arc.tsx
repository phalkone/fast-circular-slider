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
      start: props.value[0],
      end: props.value[1],
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
    props.setSelected(dragging ? 3 : 0)
  }

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onDrag={onDrag}>
      <path
        d={`M ${props.startPoint.x} ${props.startPoint.y} ` +
        `A ${props.radius} ${props.radius} 0 ${props.largeFlag} 0 ` +
        `${props.endPoint.x} ${props.endPoint.y}`}
        className={styles.arc}
      />
      {(props.value[0] === props.value[1] || Math.abs(props.value[0] - props.value[1]) === 360) &&
        <circle
          cx={props.center}
          cy={props.center}
          r={props.radius}
          className={styles.circle}
        />
      }
    </Draggable>
  )
}
