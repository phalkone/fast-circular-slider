import React, { useState } from 'react'
import type { ICircularSlider } from '../../types/CircularSlider.types'
import * as styles from '../../themes/CircularSlider.css'
import { Handle } from './Handle'
import { Arc } from './Arc'

/**
 * Draws a circular slider for provided relative wind data
 * @param {ICircularSlider} props Properties of the CircularSlider as descibed by ICircularSlider.
 */
const CircularSlider = (props: ICircularSlider) => {
  const center = props.radius + props.padding
  const [first, setFirst] = useState({ angle: 0, x: center, y: props.padding })
  const [second, setSecond] = useState({ angle: 0, x: center, y: props.padding })

  return (
    <div className={styles.container}>
      <svg
        version='1.1'
        width={props.radius * 2 + 16}
        height={props.radius * 2 + 16}
      >
        {/* Background circle */}
        <circle cx={center} cy={center} r={props.radius} stroke="#dedede" fill="transparent" strokeWidth="4" />
        {/* largeFlag={ Math.abs(second.angle - first.angle) > 180 ? 1 : 0 }
          sweepFlag={ second.angle > first.angle ? 1 : 0 } */}
        <Arc
          largeFlag={ Math.abs(second.angle - first.angle) > 180 ? 1 : 0 }
          sweepFlag={ second.angle > first.angle ? 1 : 0 }
          start={{ x: first.x, y: first.y }}
          end={{ x: second.x, y: second.y }}
          radius={props.radius}
          padding={props.padding}
        />
        <Handle
          setAngle={setFirst}
          x={center}
          y={props.padding}
          radius={props.radius}
          padding={props.padding}

        />
        <Handle
          setAngle={setSecond}
          x={center}
          y={props.padding}
          radius={props.radius}
          padding={props.padding}
        />
        <text x={center - 34} y={center + 6}>{`${first.angle.toFixed(0).padStart(3, '0')}° ${second.angle.toFixed(0).padStart(3, '0')}°`}</text>
        <use href='#active' />
      </svg>
    </div>
  )
}

CircularSlider.defaultProps = {
  radius: 50,
  padding: 8
}

export default CircularSlider
