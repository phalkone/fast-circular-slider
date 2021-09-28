import React, { useState, useEffect, useRef } from 'react'
import type { ICircularSlider } from '../../types/CircularSlider.types'
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
  const center = props.radius + props.padding
  const [value, setValue] = useState<[number, number]>(props.value ? props.value : props.defaultValue)
  const [selectedHandle, setSelectedHandle] = useState<number>(0)
  const id = useRef<string>(_uniqueId('active-handle-circular-slider-'))
  const startPoint = getXY(value[0], props.radius, props.padding)
  const endPoint = getXY(value[1], props.radius, props.padding)

  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, value)

  const setStart = (start: number) => {
    setValue([start, value[1]])
  }

  const setEnd = (end: number) => {
    setValue([value[0], end])
  }

  return (
    <div className={styles.container}
         style={props.style}>
      <DegreeInput
        leftOffset={-40}
        value={value[0]}
        setAngle={setStart}
        center={center}
        {...((selectedHandle === 1 || selectedHandle === 3) && { selected: true })}
      />
      <DegreeInput
        leftOffset={3}
        value={value[1]}
        setAngle={setEnd}
        center={center}
        {...((selectedHandle === 2 || selectedHandle === 3) && { selected: true })}
      />
      <svg
        version='1.1'
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
        <Arc
          largeFlag={ (value[1] < value[0] ? 360 - value[0] + value[1] : value[1] - value[0]) > 180 ? 1 : 0 }
          startPoint={endPoint}
          endPoint={startPoint}
          value={value}
          setValue={setValue}
          radius={props.radius}
          center={center}
          setSelected={setSelectedHandle}
        />
        <Handle
          id={1}
          setAngle={setStart}
          angle={startPoint}
          center={center}
          setSelected={setSelectedHandle}
          onTop={id.current}
        />
        <Handle
          id={2}
          setAngle={setEnd}
          angle={endPoint}
          center={center}
          setSelected={setSelectedHandle}
          onTop={id.current}
        />
        <use href={`${id.current}`}/>
      </svg>
    </div>
  )
}

CircularSlider.defaultProps = {
  radius: 52,
  padding: 12,
  defaultValue: [320, 40]
}

export default CircularSlider
