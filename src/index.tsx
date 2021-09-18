import React from 'react'
import { render } from 'react-dom'
import CircularSlider from './components/CircularSlider'

const element = document.createElement('div')

render(
  <div style={{
    position: 'absolute',
    top: '100px',
    left: '100px'
  }} >
    <CircularSlider />
  </div>
  , element)

document.body.appendChild(element)
