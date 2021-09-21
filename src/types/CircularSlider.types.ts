import type { Dispatch, SetStateAction } from 'react'

export interface ICircularSlider {
  /**
   * Default start angle
   */
   defaultStart: number,
   /**
   * Default end angle
   */
   defaultEnd: number,
  /**
   * Radius of the slider
   */
  radius: number,
  /**
   * Padding of the slider element
   */
  padding: number
}

export interface IHandle {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<number>>,
  /**
   * Properties of the handle
   */
  angle : {
    x: number,
    y: number
  },
  /**
   * Relative center
   */
  center: number
}

export interface IDegreeInput {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<number>>,
  /**
   * Value of the field
   */
  value: string,
  /**
   * To position the input field
   */
  leftOffset: number
  /**
   * Relative center
   */
  center: number
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
   setStart: Dispatch<SetStateAction<number>>,
  /**
    * Method to set parent state end angle
    */
   setEnd: Dispatch<SetStateAction<number>>,
  /**
   * Relative center
   */
  center: number,
  /**
   * Radius of the circle
   */
  radius: number
}
