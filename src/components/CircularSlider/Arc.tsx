import React, { useState, useEffect } from 'react'
import type { IArc } from '../../types/CircularSlider.types'
import { getXY, getAngle, bound } from '../../utils/CircularSlider.utils'

/**
 * Arc for the slider
 */
export const Arc = (props: IArc) => {
  const [initial, setInitial] = useState<{
    x: number,
    y: number,
    first: number,
    second:number,
    arc: number }>({
      x: 0,
      y: 0,
      first: 0,
      second: 0,
      arc: 0
    })
  const [dragging, setDragging] = useState<boolean>(false)

  const onMouseDown = (e : any) => {
    if (e.button !== 0) return
    setDragging(true)
    const parent : DOMRect = e.target.parentNode.getBoundingClientRect()
    const initialCenter = {
      x: parent.x + props.padding + props.radius,
      y: parent.y + props.padding + props.radius
    }
    setInitial({
      ...initialCenter,
      first: props.first,
      second: props.second,
      arc: getAngle(e.pageX, e.pageY, initialCenter)
    })
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseUp = (e : any) => {
    setDragging(false)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseMove = (e : any) => {
    if (!dragging) return
    const newAngle = getAngle(e.pageX, e.pageY, { x: initial.x, y: initial.y })
    const diff = newAngle - initial.arc
    const first = bound(initial.first + diff)
    const second = bound(initial.second + diff)
    props.setFirst({ angle: first, ...getXY(first, props.radius, props.padding) })
    props.setSecond({ angle: second, ...getXY(second, props.radius, props.padding) })
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  }, [dragging])

  return (
    <path
      d={`M ${props.start.x} ${props.start.y} ` +
      `A ${props.radius} ${props.radius} 0 ${props.largeFlag} 0` +
      `${props.end.x} ${props.end.y}`}
      fill='none'
      stroke='#69c0ff'
      strokeWidth='4'
      onMouseDown={onMouseDown}
    />
  )
}
