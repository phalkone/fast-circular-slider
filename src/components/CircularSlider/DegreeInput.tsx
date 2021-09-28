import React, { useContext } from 'react'
import type { ChangeEvent } from 'react'
import type { IDegreeInput } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'
import { CircularSliderContext } from '.'

/**
 * Input field for degrees
 */
export const DegreeInput = (props: IDegreeInput) => {
  const context = useContext(CircularSliderContext)
  const setDegree = (e: ChangeEvent<HTMLInputElement>) => {
    let degree = +e.target.value
    if (degree > 360) degree = 360
    context.setValue(props.id === 1 ? [context.value[0], degree] : [degree, context.value[1]])
  }
  const selected = (context.selectedHandle === props.id || context.selectedHandle === 2)

  return (
    <div
      className={styles.degreeField}
      style= {{
        top: `${context.center - 12}px`,
        left: `${context.center + props.leftOffset}px`
      }}
    >
      <div className={styles.degree}>
        <input
          type='number'
          maxLength={3}
          className={`${styles.input} ${selected ? styles.selectedDegree : ''}`}
          value={context.value[props.id].toString().padStart(3, '0')}
          onChange={setDegree}
        />
      </div>
    </div>
  )
}
