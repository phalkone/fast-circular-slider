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

export interface IHandle {
  /**
   * Radius of the slider
   */
   radius: number,
   /**
   * Center of the slider
   */
   padding: number,
  /**
   * Angle callback of the slider
   */
  setAngle: any,
  angle : {angle: number, x: number, y: number},
  max: number
}

export interface IArc {
  /**
   * The start position
   */
   start: any,
   /**
   * The end position
   */
    end: any,
  /**
   * Radius of the slider
   */
   radius: number,
   /**
   * Center of the slider
   */
   padding: number,
   sweepFlag: number,
   largeFlag: number
}
