import React from 'react'
import { render } from 'react-dom'
import CircularSlider from './components/CircularSlider'

const element = document.createElement('div')

render(
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
      radius={50}
      padding={8}
      start={320}
      end={40}
    />
  </div>
  , element)

document.body.appendChild(element)
