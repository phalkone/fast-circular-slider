import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import renderer from 'react-test-renderer'
import CircularSlider from '../src/components/CircularSlider'

let container : HTMLElement
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

it('change value of first degree field', () => {
  act(() => {
    render(<CircularSlider
      radius={52}
      value={[320, 40]}
    />, container)
  })

  const svg = document.querySelector('svg')

  expect(svg?.classList.length).toBe(1)
})

test('Render a circular slider', () => {
  const comp = renderer.create(
    <CircularSlider
      radius={52}
      value={[320, 40]}
    />
  )
  const tree = comp.toJSON()
  expect(tree).toMatchSnapshot()
})
