import React, { useState } from 'react'
import { render } from 'react-dom'
import CircularSlider from './components/CircularSlider'

const element = document.createElement('div')

const App = () => {
  const [value, setValue] = useState<[number, number]>([320, 40])

  const handleChange = (value : [number, number]) => {
    setValue(value)
  }

  return (
  <div style={{ fontFamily: 'Roboto, "Open Sans", sans-serif' }} >
    <div>
        <label style={{
          fontVariant: 'tabular-nums',
          color: '#16304e',
          marginBottom: '4px',
          fontWeight: 500,
          fontSize: '14px'
        }}>Wind direction (°)</label>
    </div>
    <CircularSlider
      value={value}
      onChange={handleChange}
      circleRadius={55}
      handleRadius={8}
      sliderColor='#91d5ff'
      disabledColor='#b8b8b8'
      hoverColor='#69c0ff'
      circleColor='#dedede'
      focusColor='#69c0ff'
      arcWidth={6}
      circleWidth={6}
      handleWidth={4}
    />
  </div>
  )
}

render(<App />, element)
document.body.appendChild(element)
