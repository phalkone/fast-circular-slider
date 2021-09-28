import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React from 'react'

export interface ICircularSlider {
  /**
   * Value of the slider
   */
  value?: [number, number]
  /**
   * Default value of the slider
   */
  defaultValue: [number, number]
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
  onChange?(value : [number, number]) : any
  /**
   * Pass a custom style
   */
   style? : React.CSSProperties
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
  setAngle: (value: number) => void,
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
  setAngle: (value: number) => void,
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
   * Value of the slider
   */
   value: [number, number],
  /**
   * Flag to set correct arc
   */
   largeFlag: number
   /**
    * Method to set parent state start angle
    */
   setValue: Dispatch<SetStateAction<[number, number]>>,
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
