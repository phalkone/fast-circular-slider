import React, { useState } from 'react'
import type { IHandle, IPosition, IMousePos } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [selected, setSelected] = useState(false)
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

  const onDrag = (dragging: boolean) : void => {
    setSelected(dragging)
  }

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTop
      onDrag={onDrag}>
      {selected &&
        <circle
        cx={props.angle.x}
        cy={props.angle.y}
        r={10}
        className={styles.selected}
      />}
      <circle
        cx={props.angle.x}
        cy={props.angle.y}
        r={6}
        className={styles.handle}
      />
    </Draggable>
  )
}
