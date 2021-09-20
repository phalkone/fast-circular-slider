import React, { useState } from 'react'
import type { ICircularSlider } from '../../types/CircularSlider.types'
import { Handle } from './Handle'
import { Arc } from './Arc'
import { getXY } from '../../utils/CircularSlider.utils'
import { DegreeInput } from './DegreeInput'

/**
 * Draws a circular slider for provided relative wind data
 * @param {ICircularSlider} props Properties of the CircularSlider as descibed by ICircularSlider.
 */
const CircularSlider = (props: ICircularSlider) => {
  const center = props.radius + props.padding
  const [first, setFirst] = useState({ angle: 320, ...getXY(320, props.radius, props.padding) })
  const [second, setSecond] = useState({ angle: 40, ...getXY(40, props.radius, props.padding) })

  return (
    <div>
      <DegreeInput
        leftOffset={-32}
        value={first.angle.toString().padStart(3, '0')}
        setAngle={setFirst}
        radius={props.radius}
        padding={props.padding}
      />
      <DegreeInput
        leftOffset={11}
        value={second.angle.toString().padStart(3, '0')}
        setAngle={setSecond}
        radius={props.radius}
        padding={props.padding}
      />
      <svg
        version='1.1'
        width={props.radius * 2 + 16}
        height={props.radius * 2 + 16}
      >
        <circle
          cx={center}
          cy={center}
          r={props.radius}
          stroke="#dedede"
          fill="transparent"
          strokeWidth="4"
        />
        {first.angle === second.angle &&
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
          largeFlag={ (second.angle < first.angle ? 360 - first.angle + second.angle : second.angle - first.angle) > 180 ? 1 : 0 }
          start={{ x: second.x, y: second.y }}
          end={{ x: first.x, y: first.y }}
          radius={props.radius}
          padding={props.padding}
        />
        <Handle
          setAngle={setFirst}
          angle={first}
          radius={props.radius}
          padding={props.padding}
        />
        <Handle
          setAngle={setSecond}
          angle={second}
          radius={props.radius}
          padding={props.padding}
        />
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
