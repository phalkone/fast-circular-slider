import React, { useState, useEffect } from 'react'
import type { ICircularSlider } from '../../types/CircularSlider.types'
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
  const [start, setStart] = useState<number>(props.start)
  const [end, setEnd] = useState<number>(props.end)
  const [selectedHandle, setSelectedHandle] = useState<number>(0)
  const startPoint = getXY(start, props.radius, props.padding)
  const endPoint = getXY(end, props.radius, props.padding)

  useEffect(() => {
    if (props.onChange) props.onChange([start, end])
  }, [start, end])

  return (
    <div className={styles.container}>
      <DegreeInput
        leftOffset={-40}
        value={start}
        setAngle={setStart}
        center={center}
        {...((selectedHandle === 1 || selectedHandle === 3) && { selected: true })}
      />
      <DegreeInput
        leftOffset={3}
        value={end}
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
          largeFlag={ (end < start ? 360 - start + end : end - start) > 180 ? 1 : 0 }
          startPoint={endPoint}
          endPoint={startPoint}
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
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
        />
        <Handle
          id={2}
          setAngle={setEnd}
          angle={endPoint}
          center={center}
          setSelected={setSelectedHandle}
        />
        <use href='#active-handle' />
      </svg>
    </div>
  )
}

CircularSlider.defaultProps = {
  radius: 52,
  padding: 12,
  start: 320,
  end: 40
}

export default CircularSlider
