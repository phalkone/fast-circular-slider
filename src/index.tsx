import React from 'react'
import { render } from 'react-dom'
import CircularSlider from './components/CircularSlider'
import * as styles from './themes/CircularSlider.css'

const element = document.createElement('div')

render(
  <div className={styles.container} >
    <div>
        <label className={styles.formLabel }>Wind direction (°)</label>
    </div>
    <CircularSlider />
  </div>
  , element)

document.body.appendChild(element)
