import React, { useState, useEffect, useRef } from 'react'
import type { ICircularSlider, IPosition } from '../../types/CircularSlider.types'
import _uniqueId from 'lodash/uniqueId'
import _pick from 'lodash/pick'
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
  const [hover, setHover] = useState<boolean>(false)
  const id = useRef<string>(_uniqueId('active-handle-circular-slider-'))
  const padding = props.handleRadius + props.handleWidth + 4
  const center = props.circleRadius + padding
  const points : [IPosition, IPosition] = [getXY(value[0], props.circleRadius, padding),
    getXY(value[1], props.circleRadius, padding)]

  const setStart = (start: number) : void => { setValue([start, value[1]]) }
  const setEnd = (end: number) : void => { setValue([value[0], end]) }

  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, value)

  return (
     <div style={props.style}>
      <div className={styles.container}>
        <DegreeInput
          id={0}
          leftOffset={-40}
          value={value[0]}
          setValue={setStart}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          center={center}
          style={_pick(props, ['circleColor', 'hoverColor', 'disabled'])}
        />
        <DegreeInput
          id={1}
          leftOffset={3}
          value={value[1]}
          setValue={setEnd}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
          center={center}
          style={_pick(props, ['circleColor', 'hoverColor', 'disabled'])}
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
          <Arc
            center={center}
            value={value}
            points={points}
            hover={hover}
            setHover={setHover}
            setValue={setValue}
            selectedHandle={selectedHandle}
            setSelectedHandle={setSelectedHandle}
            style={_pick(props, ['disabled', 'hoverColor', 'sliderColor', 'arcWidth', 'circleRadius', 'disabledColor'])}
          />
          <Handle
            id={0}
            center={center}
            value={value[0]}
            setValue={setStart}
            hover={hover}
            setHover={setHover}
            onTop={id.current}
            point={points[0]}
            selectedHandle={selectedHandle}
            setSelectedHandle={setSelectedHandle}
            style={_pick(props, ['disabled', 'hoverColor', 'sliderColor', 'handleWidth', 'handleRadius', 'disabledColor'])}
          />
          <Handle
            id={1}
            center={center}
            value={value[1]}
            setValue={setEnd}
            hover={hover}
            setHover={setHover}
            onTop={id.current}
            point={points[1]}
            selectedHandle={selectedHandle}
            setSelectedHandle={setSelectedHandle}
            style={_pick(props, ['disabled', 'hoverColor', 'sliderColor', 'handleWidth', 'handleRadius', 'disabledColor'])}
          />
          <use href={`#${id.current}`}/>
        </svg>
      </div>
    </div>
  )
}

CircularSlider.defaultProps = {
  circleRadius: 52,
  handleRadius: 6,
  defaultValue: [320, 40],
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
