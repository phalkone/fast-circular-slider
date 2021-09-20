import React from 'react'
import type { IDegreeInput } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'
import { getXY } from '../../utils/CircularSlider.utils'

/**
 * Input field for degrees
 */
export const DegreeInput = (props: IDegreeInput) => {
  const center = props.radius + props.padding

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
          onChange={e => props.setAngle({ angle: +e.target.value, ...getXY(+e.target.value, props.radius, props.padding) })}
        />
      </div>
    </div>
  )
}
