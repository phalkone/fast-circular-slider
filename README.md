# FAST circular slider

## Introduction

Circular slider with start and end handle designed for the FAST project.

## Installation

You can install `fast-circular-slider` via Yarn or npm:

```bash
# If using Yarn:
yarn add fast-circular-slider

# If using npm:
npm install --save fast-circular-slider
```

The core component from fast-circular-slider is `CircularSlider`.
This module can be required via ES imports or CommonJS require.

```js
import CircularSlider from 'fast-circular-slider';

// using require
const CircularSlider = require('fast-circular-slider');
```

## Usage

```jsx
import React, { useState } from 'react'
import { render } from 'react-dom'
import CircularSlider from 'fast-circular-slider'

const [value, setValue] = useState<[number, number]>([320, 40])

const handleChange = (value : [number, number]) => {
  setValue(value)
}

render(
  <CircularSlider
      value={value}
      onChange={handleChange}
  />, document.getElementById('root'))
```

### PROPS & METHODS

Prop name | Type | Default | Description
----------|------|---------|-------------
value | [number, number] | [320, 40] | The value of the slider
onChange | (value) => void | null | Callback function that is fired when the user changes the slider's value
disabled | boolean | false | If true, the slider will not be interactable
circleRadius | number | 67 | Radius of the circle
circleWidth | number | 4 | Stroke width of the circle
circleColor | string | '#dedede' | Color of the circle
handleRadius | number | 6 | Radius of the handle
handleWidth | number | 2 | Stroke width of the handle
arcWidth | number | 4 | Stroke width of the arc
sliderColor | string | #91d5ff | Color of the slider when enabled
disabledColor | string | #b8b8b8 | Color of the slider when disabled
hoverColor | string | #69c0ff | Color of the slider on hover
focusColor | string | #69c0ff | Color when the degree input field is in focus
ship | boolean | false | If true, ship outline will be shown

## License

[MIT](http://opensource.org/licenses/MIT)
