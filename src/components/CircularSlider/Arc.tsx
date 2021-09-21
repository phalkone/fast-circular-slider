import React, { useState, useEffect, useContext } from 'react'
import type { IArc } from '../../types/CircularSlider.types'
import { getXY, getAngle, bound } from '../../utils/CircularSlider.utils'
import { CircularSliderContext } from '.'

/**
 * Arc for the slider
 */
export const Arc = (props: IArc) => {
  const [initial, setInitial] = useState<{
    x: number,
    y: number,
    start: number,
    end:number,
    arc: number }>({
      x: 0,
      y: 0,
      start: 0,
      end: 0,
      arc: 0
    })
  const [dragging, setDragging] = useState<boolean>(false)
  const context = useContext(CircularSliderContext)

  const onMouseDown = (e : any) => {
    if (e.button !== 0) return
    setDragging(true)
    const parent : DOMRect = e.target.parentNode.getBoundingClientRect()
    const initialCenter = {
      x: parent.x + context.padding + context.radius,
      y: parent.y + context.padding + context.radius
    }
    setInitial({
      ...initialCenter,
      start: props.start,
      end: props.end,
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
    const start = bound(initial.start + diff)
    const end = bound(initial.end + diff)
    props.setStart({ angle: start, ...getXY(start, context.radius, context.padding) })
    props.setEnd({ angle: end, ...getXY(end, context.radius, context.padding) })
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
      d={`M ${props.startPoint.x} ${props.startPoint.y} ` +
      `A ${context.radius} ${context.radius} 0 ${props.largeFlag} 0` +
      `${props.endPoint.x} ${props.endPoint.y}`}
      fill='none'
      stroke='#69c0ff'
      strokeWidth='4'
      onMouseDown={onMouseDown}
    />
  )
}
