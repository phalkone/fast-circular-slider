import React, { useState, useContext } from 'react'
import type { IHandle, IPosition, IMousePos } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'
import { Draggable } from './Draggable'
import { CircularSliderContext } from '.'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const context = useContext(CircularSliderContext)
  const [selected, setSelected] = useState(false)
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
    setSelected(dragging)
    context.setSelectedHandle(dragging ? props.id : 3)
  }

  return (
    <Draggable
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onTop={context.onTop}
      onDrag={onDrag}>
      {selected &&
        <circle
        cx={context.points[props.id].x}
        cy={context.points[props.id].y}
        r={10}
        className={styles.selected}
      />}
      <circle
        cx={context.points[props.id].x}
        cy={context.points[props.id].y}
        r={6}
        className={styles.handle}
      />
    </Draggable>
  )
}
