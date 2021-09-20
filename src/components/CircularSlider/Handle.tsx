import React, { useState, useEffect, Fragment } from 'react'
import type { IHandle } from '../../types/CircularSlider.types'
import { getXY, getAngle } from '../../utils/CircularSlider.utils'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [centerX, setCenterX] = useState<number>(0)
  const [centerY, setCenterY] = useState<number>(0)
  const [dragging, setDragging] = useState<boolean>(false)

  const onMouseDown = (e : any) => {
    if (e.button !== 0) return
    setDragging(true)
    const parent : DOMRect = e.target.parentNode.getBoundingClientRect()
    setCenterX(parent.x + props.padding + props.radius)
    setCenterY(parent.y + props.padding + props.radius)
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
    const angle = getAngle(e.pageX, e.pageY, { x: centerX, y: centerY })
    props.setAngle({ angle: angle, ...getXY(angle, props.radius, props.padding) })
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
    <>
    <circle
      id={dragging ? 'active' : 'non-active'}
      onMouseDown={onMouseDown}
      cx={props.angle.x}
      cy={props.angle.y}
      r={6}
      stroke="#69c0ff"
      fill="white"
      strokeWidth="2"
    />
    </>

  )
}
