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
      radius={55}
      padding={8}
      value={value}
      onChange={handleChange}
  />, document.getElementById('root'))
```

### PROPS & METHODS

Prop name | Type | Default | Description
----------|------|---------|-------------
radius  | number | 52 | Radius of the circular slider
padding | number | 12 | Padding around the slider circle
value | [number, number] | - | The value of the slider
defaultValue | [number, number] | [320, 40] | The default value of the slider
onChange | (value) => void | null | Callback function that is fired when the user changes the slider's value

## License

[MIT](http://opensource.org/licenses/MIT)
