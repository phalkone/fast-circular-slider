import React from 'react'
import { IShip } from '../../types/CircularSlider.types'

/**
 * Outline of the ship
 */
export const Ship = (props: IShip) => {
  return (
    <path
      d={`M ${props.center + 10} ${props.center - 31} ` +
         `C ${props.center + 10} ${props.center - 35} ${props.center + 7} ` +
         `${props.center - 51} ${props.center} ${props.center - 51} ` +
         `C ${props.center - 7} ${props.center - 51} ${props.center - 10} ` +
         `${props.center - 35} ${props.center - 10} ${props.center - 31} ` +
         `L ${props.center - 10} ${props.center + 23} ` +
         `C ${props.center - 10} ${props.center + 33} ${props.center - 4} ` +
         `${props.center + 51} ${props.center - 4} ${props.center + 51} ` +
         `L ${props.center + 5} ${props.center + 51} ` +
         `C ${props.center + 5} ${props.center + 51} ${props.center + 10} ` +
         `${props.center + 33} ${props.center + 10} ${props.center + 23} ` +
         `L ${props.center + 10} ${props.center - 31} Z`}
      fill='none'
      stroke={props.circleColor}
      strokeWidth='4'
    />
  )
}
