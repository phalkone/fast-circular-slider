import React, { Fragment } from 'react'
import { IShip } from '../../types/CircularSlider.types'

/**
 * Outline of the ship
 */
export const Ship = (props: IShip) => {
  return (
  <>
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
    <line x1={props.center} y1={props.center - 41}
          x2={props.center} y2={props.center + 27}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 10} y1={props.center - 41}
          x2={props.center + 10} y2={props.center - 41}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center - 30}
          x2={props.center + 12} y2={props.center - 30}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center - 19}
          x2={props.center + 12} y2={props.center - 19}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center - 8}
          x2={props.center + 12} y2={props.center - 8}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center + 3}
          x2={props.center + 12} y2={props.center + 3}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center + 14}
          x2={props.center + 12} y2={props.center + 14}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <line x1={props.center - 12} y1={props.center + 25}
          x2={props.center + 12} y2={props.center + 25}
          stroke={props.circleColor} strokeWidth="1.5"/>
    <rect x={props.center - 2.5} y={props.center + 40}
          width={5} height={5} fill={props.circleColor}/>
    <path d={`M ${props.center + 15} ${props.center + 33.6} ` +
             `L ${props.center + 15} ${props.center + 30.8} ` +
             `L ${props.center + 4.5} ${props.center + 30.8} ` +
             `L ${props.center + 4.5} ${props.center + 30} ` +
             `L ${props.center + 3} ${props.center + 30} ` +
             `L ${props.center + 1.5} ${props.center + 28} ` +
             `L ${props.center - 2} ${props.center + 28} ` +
             `L ${props.center - 3} ${props.center + 29.6} ` +
             `L ${props.center - 4.5} ${props.center + 29.6} ` +
             `L ${props.center - 4.5} ${props.center + 30.8} ` +
             `L ${props.center - 15} ${props.center + 30.8} ` +
             `L ${props.center - 15} ${props.center + 33.6} ` +
             `L ${props.center - 4.5} ${props.center + 33.6} ` +
             `L ${props.center - 4.5} ${props.center + 35} ` +
             `L ${props.center + 4.5} ${props.center + 35} ` +
             `L ${props.center + 4.5} ${props.center + 33.6}` +
             `L ${props.center + 15} ${props.center + 33.6}Z`}
          fill={props.circleColor} stroke={props.circleColor} strokeWidth={2}/>
  </>
  )
}
