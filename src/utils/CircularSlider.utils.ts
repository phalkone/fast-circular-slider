export const getXY = (angle : number, radius: number, padding: number) : {
  x: number,
  y : number
} => {
  const a = toRad(angle)
  const x = radius + padding + (Math.sin(a) * radius)
  const y = radius + padding - (Math.cos(a) * radius)
  return { x, y }
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

export const getAngle = (mouseX : number, mouseY : number, center : {
  x: number,
  y: number
}) : number => {
  const a = Math.atan((mouseX - center.x) / (center.y - mouseY))
  let angle = Math.round(toDeg(a))
  if (mouseY <= center.y) {
    angle = angle < 0 ? 360 + angle : angle
  } else {
    angle = 180 + angle
  }
  return angle
}
