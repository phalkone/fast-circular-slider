import React, { useContext } from 'react'
import type { IDegreeInput } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'
import { getXY } from '../../utils/CircularSlider.utils'
import { CircularSliderContext } from '.'

/**
 * Input field for degrees
 */
export const DegreeInput = (props: IDegreeInput) => {
  const context = useContext(CircularSliderContext)
  const center = context.radius + context.padding

  const setDegree = (e: any) => {
    let degree = +e.target.value
    if (degree > 360) {
      degree = 360
    }
    props.setAngle({ angle: degree, ...getXY(degree, context.radius, context.padding) })
  }

  return (
    <div
      className={styles.degreeField}
      style= {{ top: `${center + 18}px`, left: `${center + props.leftOffset}px` }}
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
