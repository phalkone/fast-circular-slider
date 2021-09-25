import type React from 'react'

export const getXY = (angle : number, radius: number, padding: number) : {
  x: number,
  y : number
} => {
  const a = toRad(angle)
  const x = radius + padding + (Math.sin(a) * radius)
  const y = radius + padding - (Math.cos(a) * radius)
  return { x, y }
}

export const getPosition = (e : React.MouseEvent<SVGElement>
  | React.TouchEvent<SVGElement> |
  MouseEvent | TouchEvent) : {x: number, y: number} => {
  let page : {x: number, y: number} = { x: 0, y: 0 }
  if ('changedTouches' in e) {
    page = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
  } else if ('pageX' in e) {
    page = { x: e.pageX, y: e.pageY }
  }
  return page
}

export const getAngle = (mouseX : number, mouseY : number, center : {
  x: number,
  y: number
}) : number => {
  const a = Math.atan((mouseX - center.x) / (center.y - mouseY))
  let angle = Math.round(toDeg(a))
  if (mouseY <= center.y) {
    angle = bound(angle)
  } else {
    angle = 180 + angle
  }
  return angle
}

export const toDeg = (angle : number) : number => angle * (180 / Math.PI)

export const toRad = (angle : number) : number => angle * (Math.PI / 180)

export const bound = (angle : number) : number => {
  if (angle >= 360) {
    return angle - 360
  } else if (angle < 0) {
    return angle + 360
  } else {
    return angle
  }
}
