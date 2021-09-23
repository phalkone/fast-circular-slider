import React from 'react'
import { render } from 'react-dom'
import CircularSlider from './components/CircularSlider'

const element = document.createElement('div')

const App = () => {
  const handleChange = (value : number[]) => {
    console.log(`Selected start: ${value[0]} end: ${value[1]}`)
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
      radius={50}
      padding={8}
      start={320}
      end={40}
      onChange={handleChange}
    />
  </div>
  )
}

render(<App />, element)
document.body.appendChild(element)
