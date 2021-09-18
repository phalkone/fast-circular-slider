# FAST circular slider

## Introduction

## Installation

You can install `fast-circular-slider` via Yarn or npm:

```bash
# If using Yarn:
yarn add fast-circular-slider

# If using npm:
npm install --save fast-circular-slider
```

The core component from fast-circular-slider is `Slider`.
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
    radius={1}
  />, document.getElementById('root'))
```

### PROPS & METHODS

Prop name | Type | Default | Description
----------|------|---------|-------------
radius  | number | 100 | Radius of the circular slider

## License

[MIT](http://opensource.org/licenses/MIT)
