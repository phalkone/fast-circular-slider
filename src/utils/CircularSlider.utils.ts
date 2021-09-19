export const getXY = (angle : number, radius: number, padding: number) : { x: number, y : number} => {
  const a = toRad(angle)
  const x = radius + padding + (Math.sin(a) * radius)
  const y = radius + padding - (Math.cos(a) * radius)
  return { x, y }
}

export const toDeg = (angle : number) => angle * (180 / Math.PI)

export const toRad = (angle : number) => angle * (Math.PI / 180)
