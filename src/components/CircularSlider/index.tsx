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
  const [hover, setHover] = useState<boolean>(false)
  const id = useRef<string>(_uniqueId('active-handle-circular-slider-'))
  const padding = props.handleRadius + props.handleWidth + 4
  const center = props.circleRadius + padding

  useEffect(() => {
    if (props.onChange) props.onChange(value)
  }, value)

  return (
    <CircularSliderContext.Provider value={{
      center: center,
      value: value,
      setValue: setValue,
      selectedHandle: selectedHandle,
      setSelectedHandle: setSelectedHandle,
      points: [getXY(value[0], props.circleRadius, padding), getXY(value[1], props.circleRadius, padding)],
      hover: hover,
      setHover: setHover,
      onTop: id.current,
      disabled: props.disabled,
      circleRadius: props.circleRadius,
      handleRadius: props.handleRadius,
      sliderColor: props.sliderColor,
      hoverColor: props.hoverColor,
      circleColor: props.circleColor,
      focusColor: props.focusColor,
      arcWidth: props.arcWidth,
      circleWidth: props.circleWidth,
      handleWidth: props.handleWidth,
      disabledColor: props.disabledColor
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
            r={props.circleRadius}
            fill='none'
            strokeWidth={props.circleWidth}
            stroke={props.circleColor}
          />
          <Arc />
          <Handle id={0} />
          <Handle id={1} />
          <use href={`#${id.current}`}/>
        </svg>
      </div>
    </div>
   </CircularSliderContext.Provider>
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

export const CircularSliderContext = createContext<ICircularSliderContext>(undefined!)

export default CircularSlider
