export interface ICircularSlider {
  /**
   * Radius of the slider
   */
   radius: number,
   /**
   * Padding of the slider element
   */
   padding: number
}

export interface IHandle extends ICircularSlider {
  /**
   * Angle callback of the slider
   */
  setAngle: any,
  /**
   * Properties of the handle
   */
  angle : {angle: number, x: number, y: number},
}

export interface IDegreeInput extends ICircularSlider {
  /**
   * Angle callback of the slider
   */
  setAngle: any,
  /**
   * Value of the field
   */
  value: string,
  /**
   * To position the input field
   */
  leftOffset: number
}

export interface IArc extends ICircularSlider {
  /**
   * The start position
   */
   start: any,
   /**
   * The end position
   */
    end: any,
  /**
   * Flag to set correct arc
   */
   largeFlag: number
   first: number,
   second: number,
   setFirst: any,
   setSecond: any
}
