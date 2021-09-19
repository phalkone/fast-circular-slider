import React, { useState, useEffect, Fragment } from 'react'
import type { IHandle } from '../../types/CircularSlider.types'
import { getXY, toDeg } from '../../utils/CircularSlider.utils'

/**
 * Handle for the slider
 */
export const Handle = (props: IHandle) => {
  const [centerX, setCenterX] = useState<number>(0)
  const [centerY, setCenterY] = useState<number>(0)
  const [dragging, setDragging] = useState<boolean>(false)
  let prev = props.angle.angle

  const setPosition = (mouseX : number, mouseY : number) => {
    const a = Math.atan((mouseX - centerX) / (centerY - mouseY))
    let angle = toDeg(a)
    if (mouseY <= centerY) {
      angle = angle < 0 ? 360 + angle : angle
    } else {
      angle = 180 + angle
    }

    const maxPlus = props.max < props.angle.angle ? props.max + 360 - props.angle.angle : props.max - props.angle.angle
    const diffPlus = angle < props.angle.angle ? angle + 360 - props.angle.angle : angle - props.angle.angle

    const maxMin = props.max > props.angle.angle ? props.max - 360 - props.angle.angle : props.max - props.angle.angle
    const diffMin = angle > props.angle.angle ? angle - 360 - props.angle.angle : angle - props.angle.angle

    console.log(angle + ' ' + prev)

    if ((angle >= prev && diffPlus <= maxPlus) || (angle <= prev && diffMin >= maxMin)) {
      props.setAngle({ angle, ...getXY(angle, props.radius, props.padding) })
    } else {
      props.setAngle({ angle: props.max, ...getXY(props.max, props.radius, props.padding) })
    }
    prev = angle
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
    setPosition(e.pageX, e.pageY)
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
