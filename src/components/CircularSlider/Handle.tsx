import React, { useState, useEffect, Fragment } from 'react'
import type { IHandle } from '../../types/CircularSlider.types'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [x, setX] = useState<number>(props.x)
  const [y, setY] = useState<number>(props.y)
  const [centerX, setCenterX] = useState<number>(0)
  const [centerY, setCenterY] = useState<number>(0)
  const [dragging, setDragging] = useState<boolean>(false)

  const getPosition = (mouseX : number, mouseY : number) => {
    const a = Math.atan((mouseX - centerX) / (centerY - mouseY))
    let angle = a / Math.PI * 180
    if (mouseY <= centerY) {
      const x = props.radius + props.padding + (Math.sin(a) * props.radius)
      const y = props.radius + props.padding - (Math.cos(a) * props.radius)
      angle = angle < 0 ? 360 + angle : angle
      props.setAngle({ angle, x, y })
      return { x, y }
    } else {
      const x = props.radius + props.padding - (Math.sin(a) * props.radius)
      const y = props.radius + props.padding + (Math.cos(a) * props.radius)
      angle = angle < 0 ? 180 + angle : 180 + angle
      props.setAngle({ angle, x, y })
      return { x, y }
    }
  }

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
    const pos = getPosition(e.pageX, e.pageY)
    setX(pos.x)
    setY(pos.y)
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
      cx={x}
      cy={y}
      r={6}
      stroke="#69c0ff"
      fill="white"
      strokeWidth="2"
    />
    </>

  )
}
