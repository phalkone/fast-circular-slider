import React, { useState } from 'react'
import type { ICircularSlider } from '../../types/CircularSlider.types'
import { getXY } from '../../utils/CircularSlider.utils'
import * as styles from '../../themes/CircularSlider.css'
import { Handle } from './Handle'
import { Arc } from './Arc'
import { DegreeInput } from './DegreeInput'

/**
 * Draws a circular slider for provided relative wind data
 * @param {ICircularSlider} props Properties of the CircularSlider as descibed by ICircularSlider.
 */
const CircularSlider = (props: ICircularSlider) => {
  const center = props.radius + props.padding
  const [start, setStart] = useState(props.defaultStart)
  const [end, setEnd] = useState(props.defaultEnd)

  return (
    <div className={styles.container}>
      <DegreeInput
        leftOffset={-40}
        value={start.toString().padStart(3, '0')}
        setAngle={setStart}
        center={center}
      />
      <DegreeInput
        leftOffset={3}
        value={end.toString().padStart(3, '0')}
        setAngle={setEnd}
        center={center}
      />
      <svg
        version='1.1'
        width={center * 2}
        height={center * 2}
        id='circular-slider'
      >
        <circle
          cx={center}
          cy={center}
          r={props.radius}
          stroke="#dedede"
          fill="transparent"
          strokeWidth="4"
        />
        {(start === end || Math.abs(start - end) === 360) &&
          <circle
            cx={center}
            cy={center}
            r={props.radius}
            stroke="#69c0ff"
            fill="transparent"
            strokeWidth="4"
          />
        }
        <Arc
          largeFlag={ (end < start ? 360 - start + end : end - start) > 180 ? 1 : 0 }
          startPoint={{ ...getXY(end, props.radius, props.padding) }}
          endPoint={{ ...getXY(start, props.radius, props.padding) }}
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
          radius={props.radius}
          center={center}
        />
        <Handle
          setAngle={setStart}
          angle={{ ...getXY(start, props.radius, props.padding) }}
          center={center}
        />
        <Handle
          setAngle={setEnd}
          angle={{ ...getXY(end, props.radius, props.padding) }}
          center={center}
        />
        <use href='#active' />
      </svg>
    </div>
  )
}

CircularSlider.defaultProps = {
  radius: 50,
  padding: 8,
  defaultStart: 320,
  defaultEnd: 40
}

export default CircularSlider
