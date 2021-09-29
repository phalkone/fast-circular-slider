import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React from 'react'

interface ICommon {
  /**
   * Radius of the circle
   */
  circleRadius: number,
  /**
   * Radius of the handle
   */
  handleRadius: number,
  /**
   * Disable the slider
   */
  disabled: boolean,
  sliderColor: string,
  disabledColor: string,
  hoverColor: string,
  circleColor: string,
  focusColor: string,
  arcWidth: number,
  circleWidth: number,
  handleWidth: number
}

export interface ICircularSlider extends ICommon {
  /**
   * Value of the slider
   */
  value?: [number, number]
  /**
   * Default value of the slider
   */
  defaultValue: [number, number]
  ,
  /**
   * Callback function to get set values
   */
  onChange?(value : [number, number]) : any
  /**
   * Pass a custom style
   */
   style?: React.CSSProperties
}

export interface ICircularSliderContext extends ICommon {
  /**
   * Relative center
   */
  center: number,
  /**
   * Value of the slider
   */
  value: [number, number],
  /**
    * Method to set parent state start angle
    */
  setValue: Dispatch<SetStateAction<[number, number]>>,
  /**
    * Id of selected handle
    */
  selectedHandle: number,
  /**
   * Method to set parent state start angle
   */
  setSelectedHandle: Dispatch<SetStateAction<number>>,
  /**
   * The start and end point
   */
  points: [IPosition, IPosition]
  /**
   * Id to put svg element on top
   */
   onTop: string,
   hover: boolean,
   setHover: Dispatch<SetStateAction<boolean>>
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
   * Id to identify if it is the start or end handle
   */
    id: number
}

export interface IDegreeInput {
  /**
   * Id of degree field
   */
  id: number,
  /**
   * To position the input field
   */
  leftOffset: number,
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
  onTop?: string,
  /**
   * Callback function when dragging
   */
  onDrag?(dragging: boolean) : void
}
