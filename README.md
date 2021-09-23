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
import React from 'react'
import { render } from 'react-dom'
import CircularSlider from 'fast-circular-slider'

render(
  <CircularSlider
      radius={50}
      padding={8}
      start={320}
      end={40}
  />, document.getElementById('root'))
```

### PROPS & METHODS

Prop name | Type | Default | Description
----------|------|---------|-------------
radius  | number | 50 | Radius of the circular slider
padding | number | 8 | Padding around the slider circle
start | number | 320 | Initial value of the start angle
end | number | 40 | Initial value of the end angle

## License

[MIT](http://opensource.org/licenses/MIT)
