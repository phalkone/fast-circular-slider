import React, { useState, useEffect, useRef } from 'react'
import type { ICircularSlider, IPosition } from '../../types/CircularSlider.types'
import _uniqueId from 'lodash/uniqueId'
import _pick from 'lodash/pick'
import { getXY } from '../../utils/CircularSlider.utils'
import * as styles from '../../themes/CircularSlider.css'
import { Handle } from './Handle'
import { Arc } from './Arc'
import { DegreeInput } from './DegreeInput'
import { Ship } from './Ship'

/**
 * Draws a circular slider for provided relative directional data
 * @param {ICircularSlider} props Properties of the CircularSlider as descibed by ICircularSlider.
 */
const CircularSlider = (props: ICircularSlider) => {
  const [value, setValue] = useState<[number, number]>(props.value)
  const [selectedHandle, setSelectedHandle] = useState<number>(3)
  const [hover, setHover] = useState<boolean>(false)
  const id = useRef<string>(_uniqueId('active-handle-circular-slider-'))
  const padding = props.handleRadius + props.handleWidth + 2
  const center = props.circleRadius + padding
  const points : [IPosition, IPosition] = [getXY(value[0], props.circleRadius, padding),
    getXY(value[1], props.circleRadius, padding)]

  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, value)

  const commonProps = {
    center: center,
    selectedHandle: selectedHandle,
    setSelectedHandle: setSelectedHandle,
    value: value,
    setValue: setValue
  }

  const sliderProps = {
    points: points,
    hover: hover,
    setHover: setHover
  }

  const degreeProps = {
    ...commonProps,
    style: _pick(props, ['circleColor', 'hoverColor', 'disabled'])
  }

  const handleProps = {
    ...commonProps,
    ...sliderProps,
    onTop: id.current,
    style: _pick(props, ['disabled', 'hoverColor', 'sliderColor',
      'handleWidth', 'handleRadius', 'disabledColor'])
  }

  const arcProps = {
    ...commonProps,
    ...sliderProps,
    style: _pick(props, ['disabled', 'hoverColor', 'sliderColor',
      'arcWidth', 'circleRadius', 'disabledColor'])
  }

  return (
     <div style={props.style}>
      <div className={styles.container}>
        <DegreeInput
          id={0}
          leftOffset={props.ship ? -50 : -42}
          {...degreeProps}
        />
        <DegreeInput
          id={1}
          leftOffset={props.ship ? 15 : 7}
          {...degreeProps}
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
            r={props.circleRadius}
            fill='none'
            strokeWidth={props.circleWidth}
            stroke={props.circleColor}
          />
          {props.ship && <Ship
            center={center}
            circleColor={props.circleColor}
          />}
          {!props.ship && <rect
            width={3} height={1} x={center - 1.5} y={center} fill='#000' />}
          <Arc
            {...arcProps}
          />
          <Handle
            id={0}
            {...handleProps}
          />
          <Handle
            id={1}
            {...handleProps}
          />
          <use href={`#${id.current}`}/>
        </svg>
      </div>
    </div>
  )
}

CircularSlider.defaultProps = {
  circleRadius: 68,
  handleRadius: 6,
  value: [320, 40],
  disabled: false,
  sliderColor: '#91d5ff',
  disabledColor: '#b8b8b8',
  hoverColor: '#69c0ff',
  circleColor: '#dedede',
  focusColor: '#69c0ff',
  arcWidth: 4,
  circleWidth: 4,
  handleWidth: 2
}

export default CircularSlider
