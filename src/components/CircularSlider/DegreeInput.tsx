import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import type { IDegreeInput } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'

/**
 * Input field for degrees
 */
export const DegreeInput = (props: IDegreeInput) => {
  const setDegree = (e: ChangeEvent<HTMLInputElement>) => {
    let degree = +e.target.value
    if (degree > 360) degree = 360
    props.setValue(props.id === 1 ? [props.value[0], degree] : [degree, props.value[1]])
  }
  const selected = (props.selectedHandle === props.id || props.selectedHandle === 2)
  const [focus, setFocus] = useState<boolean>(false)
  const onFocus = () => { setFocus(true) }
  const onBlur = () => { setFocus(false) }

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
          style={{
            border: (selected || focus) ? `1px solid ${props.style.hoverColor}` : `1px solid ${props.style.circleColor}`,
            boxShadow: focus ? `0 0 0 2px ${props.style.hoverColor}33` : 'none'
          }}
          className={styles.input}
          value={props.value[props.id].toString().padStart(3, '0')}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={setDegree}
          disabled={props.style.disabled}
        />
      </div>
    </div>
  )
}
