import type { Dispatch, SetStateAction } from 'react'

export interface ICommon {
  /**
   * Radius of the slider
   */
   radius: number,
   /**
   * Padding of the slider element
   */
   padding: number
}

export interface ICircularSlider extends ICommon {
  /**
   * Default start angle
   */
   defaultStart: number,
   /**
   * Default end angle
   */
   defaultEnd: number
}

export interface IHandle {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<{
    x: number,
    y: number,
    angle: number
  }>>,
  /**
   * Properties of the handle
   */
  angle : {angle: number, x: number, y: number},
}

export interface IDegreeInput {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<{
    x: number,
    y: number,
    angle: number
  }>>,
  /**
   * Value of the field
   */
  value: string,
  /**
   * To position the input field
   */
  leftOffset: number
}

export interface IArc {
  /**
   * The start point
   */
   startPoint: {
     x: number,
     y: number
   },
   /**
   * The end point
   */
    endPoint: {
      x: number,
      y: number
    },
  /**
   * Flag to set correct arc
   */
   largeFlag: number
   /**
    * The starting angle
    */
   start: number,
   /**
    * The ending angle
    */
   end: number,
   /**
    * Method to set parent state start angle
    */
   setStart: Dispatch<SetStateAction<{
    x: number,
    y: number,
    angle: number
  }>>,
      /**
    * Method to set parent state end angle
    */
   setEnd: Dispatch<SetStateAction<{
    x: number,
    y: number,
    angle: number
  }>>
}
