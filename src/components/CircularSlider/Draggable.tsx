import React, { useState, useEffect } from 'react'
import type { IDraggable } from '../../types/CircularSlider.types'

/**
 * To make component draggable
 */
export const Draggable = (props: IDraggable) => {
  const [initial, setInitial] = useState(props.initial)
  const [dragging, setDragging] = useState<boolean>(false)

  const getPosition = (e : React.MouseEvent<SVGElement> |
    React.TouchEvent<SVGElement> | MouseEvent | TouchEvent) : {x: number, y: number} => {
    let page : {x: number, y: number} = { x: 0, y: 0 }
    if (e instanceof TouchEvent) {
      page = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
    } else if (e instanceof MouseEvent) {
      page = { x: e.pageX, y: e.pageY }
    }
    return page
  }

  const onMouseDown = (e : React.MouseEvent<SVGElement> | React.TouchEvent<SVGElement>) : void => {
    const page = getPosition(e)
    if (e instanceof MouseEvent && e.button !== 0) return
    setDragging(true)
    const target = e.target as SVGElement
    if (target.parentNode) {
      const parent : DOMRect = (target.parentNode.parentNode as SVGElement).getBoundingClientRect()
      setInitial(props.onMouseDown({
        x: parent.x,
        y: parent.y,
        pageX: page.x,
        pageY: page.y
      }))
    }
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseUp : { (e: MouseEvent| TouchEvent): void } = (e : MouseEvent | TouchEvent) => {
    setDragging(false)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('touchmove', onMouseMove)
    document.removeEventListener('touchend', onMouseUp)
    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseMove : { (e: MouseEvent | TouchEvent): void } = (e : MouseEvent | TouchEvent) => {
    if (!dragging) return
    const page = getPosition(e)
    props.onMouseMove(page.x, page.y, initial)
    e.stopPropagation()
    e.preventDefault()
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchmove', onMouseMove)
      document.addEventListener('touchend', onMouseUp)
    }
  }, [dragging])

  return (
    <g
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      {...(dragging && props.onTop ? { id: 'active' } : {})}
      >
      {props.children}
    </g>
  )
}
