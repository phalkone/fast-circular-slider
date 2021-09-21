import React, { useState, useEffect, useContext, Fragment } from 'react'
import type { IHandle } from '../../types/CircularSlider.types'
import { getXY, getAngle } from '../../utils/CircularSlider.utils'
import { CircularSliderContext } from '.'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [centerX, setCenterX] = useState<number>(0)
  const [centerY, setCenterY] = useState<number>(0)
  const [dragging, setDragging] = useState<boolean>(false)
  const context = useContext(CircularSliderContext)

  const onMouseDown = (e : any) => {
    if (e.button !== 0) return
    setDragging(true)
    const parent : DOMRect = e.target.parentNode.getBoundingClientRect()
    setCenterX(parent.x + context.padding + context.radius)
    setCenterY(parent.y + context.padding + context.radius)
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
    props.setAngle({ angle: angle, ...getXY(angle, context.radius, context.padding) })
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
