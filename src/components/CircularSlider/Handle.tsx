import React, { useState, useEffect, Fragment } from 'react'
import type { IHandle } from '../../types/CircularSlider.types'
import { getAngle } from '../../utils/CircularSlider.utils'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [center, setCenter] = useState<{x: number, y: number}>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<boolean>(false)

  const onMouseDown = (e : React.MouseEvent<SVGElement>) : void => {
    if (e.button !== 0) return
    setDragging(true)
    const target = e.target as SVGElement
    if (target.parentNode) {
      const parent : DOMRect = (target.parentNode as SVGElement).getBoundingClientRect()
      setCenter({
        x: parent.x + props.center,
        y: parent.y + props.center
      })
    }
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseUp = (e : MouseEvent) => {
    setDragging(false)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseMove = (e : MouseEvent) => {
    if (!dragging) return
    const angle = getAngle(e.pageX, e.pageY, center)
    props.setAngle(angle)
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
