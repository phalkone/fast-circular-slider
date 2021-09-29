import type { Dispatch, ReactNode, SetStateAction } from 'react'
import React from 'react'

export interface ICircularSlider {
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
  /**
   * Color of the circle
   */
  circleColor: string,
  /**
   * Color of the slider when enabled
   */
  sliderColor: string,
  /**
   * Color of the slider when disabled
   */
  disabledColor: string,
  /**
   * Color of the slider on hover
   */
  hoverColor: string,
  /**
   * Color when the degree input field is in focus
   */
  focusColor: string,
  /**
   * Stroke width of the arc
   */
  arcWidth: number,
  /**
   * Stroke of of the circle
   */
  circleWidth: number,
  /**
   * Stroke width of the handle
   */
  handleWidth: number
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

export interface IPosition {
  x: number,
  y: number,
}

export interface IMousePos extends IPosition {
  pageX: number,
  pageY: number
}

export interface IInitialArc extends IPosition {
  start: number,
  end: number,
  arc: number
}

export interface IArc {
  center: number,
  value: [number, number],
  points: [IPosition, IPosition],
  hover: boolean,
  setHover: Dispatch<SetStateAction<boolean>>,
  setValue: Dispatch<SetStateAction<[number, number]>>,
  selectedHandle: number,
  setSelectedHandle: Dispatch<SetStateAction<number>>,
  style: {
    disabled: boolean,
    hoverColor: string,
    sliderColor: string,
    disabledColor: string,
    arcWidth: number,
    circleRadius: number
  }
}

export interface IHandle {
  id: number,
  center: number,
  value: number,
  setValue: (value: number) => void,
  hover: boolean,
  setHover: Dispatch<SetStateAction<boolean>>,
  selectedHandle: number,
  setSelectedHandle: Dispatch<SetStateAction<number>>,
  onTop: string,
  point: IPosition,
  style: {
    disabled: boolean,
    hoverColor: string,
    sliderColor: string,
    disabledColor: string,
    handleWidth: number,
    handleRadius: number
  }
}

export interface IDegreeInput {
  id: number,
  leftOffset: number,
  value: number,
  setValue: (value: number) => void,
  center: number,
  selectedHandle: number,
  setSelectedHandle: Dispatch<SetStateAction<number>>,
  style: {
    circleColor: string,
    hoverColor: string,
    disabled: boolean
  }
}

export interface IDraggable {
  onMouseDown(parent: IMousePos) : IPosition | IInitialArc,
  onMouseMove(x: number, y: number, initial: IPosition) : void,
  onMouseMove(x: number, y: number, initial: IInitialArc) : void,
  onDrag?(dragging: boolean) : void
  children: ReactNode,
  onTop?: string,
}
