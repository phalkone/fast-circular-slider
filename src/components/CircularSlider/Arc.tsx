import React from 'react'
import type { IArc } from '../../types/CircularSlider.types'

/**
 * Arc for the slider
 */
export const Arc = (props: IArc) => {
  return (
    <path
      d={`M ${props.start.x} ${props.start.y} ` +
      `A ${props.radius} ${props.radius} 0 ${props.largeFlag} ${props.sweepFlag}` +
      `${props.end.x} ${props.end.y}`}
      fill='none'
      stroke='#69c0ff'
      strokeWidth='4'
    />
  )
}
