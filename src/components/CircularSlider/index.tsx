import React, { useState, useEffect, useRef, createContext } from 'react'
import type { ICircularSlider, ICircularSliderContext } from '../../types/CircularSlider.types'
import _uniqueId from 'lodash/uniqueId'
import { getXY } from '../../utils/CircularSlider.utils'
import * as styles from '../../themes/CircularSlider.css'
import { Handle } from './Handle'
import { Arc } from './Arc'
import { DegreeInput } from './DegreeInput'

/**
 * Draws a circular slider for provided relative directional data
 * @param {ICircularSlider} props Properties of the CircularSlider as descibed by ICircularSlider.
 */
const CircularSlider = (props: ICircularSlider) => {
  const [value, setValue] = useState<[number, number]>(props.value ? props.value : props.defaultValue)
  const [selectedHandle, setSelectedHandle] = useState<number>(3)
  const id = useRef<string>(_uniqueId('active-handle-circular-slider-'))
  const center = props.radius + 12

  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, value)

  return (
    <CircularSliderContext.Provider value={{
      center: center,
      radius: props.radius,
      value: value,
      setValue: setValue,
      selectedHandle: selectedHandle,
      setSelectedHandle: setSelectedHandle,
      points: [getXY(value[0], props.radius, 12), getXY(value[1], props.radius, 12)],
      onTop: id.current,
      disabled: props.disabled
    }}>
    <div style={props.style}>
      <div className={styles.container}>
        <DegreeInput
          id={0}
          leftOffset={-40}
        />
        <DegreeInput
          id={1}
          leftOffset={3}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={center * 2}
          height={center * 2}
          className={styles.slider}
        >
          <circle
            cx={center}
            cy={center}
            r={props.radius}
            className={`${styles.circle} ${styles.backgroundCircle}`}
          />
          <Arc />
          <Handle id={0} />
          <Handle id={1} />
          <use href={`${id.current}`}/>
        </svg>
      </div>
    </div>
   </CircularSliderContext.Provider>
  )
}

CircularSlider.defaultProps = {
  radius: 52,
  defaultValue: [320, 40],
  disabled: false
}

export const CircularSliderContext = createContext<ICircularSliderContext>(undefined!)

export default CircularSlider
