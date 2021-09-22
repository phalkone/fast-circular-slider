import React, { useState, useEffect } from 'react'
import type { IDraggable } from '../../types/CircularSlider.types'

/**
 * To make component draggable
 */
export const Draggable = (props: IDraggable) => {
  const [initial, setInitial] = useState(props.initial)
  const [dragging, setDragging] = useState<boolean>(false)

  const onMouseDown = (e : React.MouseEvent<SVGElement>) : void => {
    if (e.button !== 0) return
    setDragging(true)
    const target = e.target as SVGElement
    if (target.parentNode) {
      const parent : DOMRect = (target.parentNode.parentNode as SVGElement).getBoundingClientRect()
      setInitial(props.onMouseDown({
        x: parent.x,
        y: parent.y,
        pageX: e.pageX,
        pageY: e.pageY
      }))
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
    props.onMouseMove(e.pageX, e.pageY, initial)
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
    <g
      onMouseDown={onMouseDown}
      {...(dragging && props.onTop ? { id: 'active' } : {})}
      >
      {props.children}
    </g>
  )
}
