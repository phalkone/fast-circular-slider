import React, { useState, createContext } from 'react'
import type { ICircularSlider, ICommon } from '../../types/CircularSlider.types'
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
  const [start, setStart] = useState({
    angle: props.defaultStart,
    ...getXY(props.defaultStart, props.radius, props.padding)
  })
  const [end, setEnd] = useState({
    angle: props.defaultEnd,
    ...getXY(props.defaultEnd, props.radius, props.padding)
  })

  return (
    <CircularSliderContext.Provider value={{
      radius: props.radius,
      padding: props.padding
    }}>
    <div>
      <DegreeInput
        leftOffset={-32}
        value={start.angle.toString().padStart(3, '0')}
        setAngle={setStart}
      />
      <DegreeInput
        leftOffset={11}
        value={end.angle.toString().padStart(3, '0')}
        setAngle={setEnd}
      />
      <svg
        version='1.1'
        width={center * 2}
        height={center * 2}
      >
        <circle
          cx={center}
          cy={center}
          r={props.radius}
          stroke="#dedede"
          fill="transparent"
          strokeWidth="4"
        />
        {(start.angle === end.angle || Math.abs(start.angle - end.angle) === 360) &&
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
          largeFlag={ (end.angle < start.angle ? 360 - start.angle + end.angle : end.angle - start.angle) > 180 ? 1 : 0 }
          startPoint={{ x: end.x, y: end.y }}
          endPoint={{ x: start.x, y: start.y }}
          start={start.angle}
          end={end.angle}
          setStart={setStart}
          setEnd={setEnd}
        />
        <Handle
          setAngle={setStart}
          angle={start}
        />
        <Handle
          setAngle={setEnd}
          angle={end}
        />
        <use href='#active' />
      </svg>
    </div>
    </CircularSliderContext.Provider>
  )
}

CircularSlider.defaultProps = {
  radius: 50,
  padding: 8,
  defaultStart: 320,
  defaultEnd: 40
}

const defaultContext : ICommon = {
  radius: 50,
  padding: 8
}

export const CircularSliderContext = createContext(defaultContext)

export default CircularSlider
