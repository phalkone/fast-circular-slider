import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ICircularSlider {
  /**
   * Default start angle
   */
  start: number,
  /**
    * Default end angle
    */
  end: number,
  /**
   * Radius of the slider
   */
  radius: number,
  /**
   * Padding of the slider element
   */
  padding: number,
  /**
   * Callback function to get set values
   */
  onChange?(value : number[]) : any
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
  center: number,
  /**
   * Selected callback of the slider
   */
   setSelected: Dispatch<SetStateAction<number>>,
   /**
   * Id to identify if it is the start or end handle
   */
    id: number
}

export interface IDegreeInput {
  /**
   * Angle callback of the slider
   */
  setAngle: Dispatch<SetStateAction<number>>,
  /**
   * Value of the field
   */
  value: number,
  /**
   * To position the input field
   */
  leftOffset: number
  /**
   * Relative center
   */
  center: number,
  /**
   * Indicates to highlight textfield
   */
  selected?: boolean
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
   * Default start angle
   */
   start: number,
   /**
   * Default end angle
   */
   end: number,
  /**
   * Flag to set correct arc
   */
   largeFlag: number
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
  radius: number,
  /**
   * Selected callback of the slider
   */
   setSelected: Dispatch<SetStateAction<number>>,
}

export interface IDraggable {
  /**
   * Callback method for onMouseDown event
   */
  onMouseDown(parent: IMousePos) : IPosition | IInitialArc,
  /**
   * Callback method for onMouseMove event
   */
  onMouseMove(x: number, y: number, initial: IPosition) : void,
  onMouseMove(x: number, y: number, initial: IInitialArc) : void,
  /**
   * Children of props
   */
  children: ReactNode,
  /**
   * If true component will be on top during dragging
   */
  onTop?: boolean,
  /**
   * Callback function when dragging
   */
  onDrag?(dragging: boolean) : void
}
