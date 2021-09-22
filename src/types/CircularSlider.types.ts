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

export interface IPosition {
  /**
   * x coordinate
   */
  x: number,
  /**
   * y coordinate
   */
  y: number,
}

export interface IMousePos extends IPosition {
  /**
   * Mouse x coordinate
   */
  pageX: number,
  /**
   * Mouse y coordinate
   */
  pageY: number
}

export interface IInitialArc extends IPosition {
  /**
    * The starting angle
    */
  start: number,
   /**
    * The ending angle
    */
  end: number,
   /**
    * Angle of arc at mouse position
    */
  arc: number
}

export interface IHandle {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<number>>,
  /**
   * Properties of the handle
   */
  angle : IPosition,
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
   startPoint: IPosition,
   /**
   * The end point
   */
    endPoint: IPosition,
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

export interface IDraggable {
  initial: any,
  onMouseDown: any,
  onMouseMove: any,
  children: any,
  onTop: boolean
}
