import React from 'react'
import type { ChangeEvent } from 'react'
import type { IDegreeInput } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Input field for degrees
 */
export const DegreeInput = (props: IDegreeInput) => {
  const setDegree = (e: ChangeEvent<HTMLInputElement>) => {
    let degree = +e.target.value
    if (degree > 360) {
      degree = 360
    }
    props.setAngle(degree)
  }

  return (
    <div
      className={styles.degreeField}
      style= {{
        top: `${props.center - 12}px`,
        left: `${props.center + props.leftOffset}px`
      }}
    >
      <div className={styles.degree}>
        <input
          type='number'
          maxLength={3}
          className={styles.input}
          value={props.value}
          onChange={setDegree}
        />
      </div>
    </div>
  )
}
