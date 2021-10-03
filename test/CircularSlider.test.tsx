import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CircularSlider from '../src/components/CircularSlider'
import { getXY } from '../src/utils/CircularSlider.utils'

describe('Circular Slider', () => {
  test('renders Circular Slider component', () => {
    render(<CircularSlider
            value={[340, 60]} />)

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(340)
    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(60)
    expect(screen.getAllByRole('spinbutton')[3]).toBeUndefined()
  })

  test('number validation of input field', () => {
    render(<CircularSlider
            value={[340, 60]} />)

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(340)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}20')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(20)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}460')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(360)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}-20')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(0)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}test')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(0)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}60')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(60)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}2^23')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(223)
  })

  test('slider moving when value of input field', () => {
    render(<CircularSlider
            value={[340, 60]}
            circleRadius={70}
            handleRadius={6}
            handleWidth={2} />)

    userEvent.type(screen.getAllByRole('spinbutton')[0], '{selectall}20')

    expect(screen.getAllByRole('spinbutton')[0]).toHaveValue(20)

    let point = getXY(20, 70, 10)

    expect(screen.getByTestId('startHandle').getAttribute('cx')).toBe(point.x.toString())
    expect(screen.getByTestId('startHandle').getAttribute('cy')).toBe(point.y.toString())

    userEvent.type(screen.getAllByRole('spinbutton')[1], '{selectall}300')

    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(300)

    point = getXY(300, 70, 10)

    expect(screen.getByTestId('endHandle').getAttribute('cx')).toBe(point.x.toString())
    expect(screen.getByTestId('endHandle').getAttribute('cy')).toBe(point.y.toString())
  })

  test('full circle when start and end angle are the same', () => {
    render(<CircularSlider
            value={[340, 20]}
            circleRadius={70}
            handleRadius={6}
            handleWidth={2} />)
    userEvent.type(screen.getAllByRole('spinbutton')[1], '{selectall}340')
    const point = getXY(340, 70, 10)

    expect(screen.getByTestId('startHandle').getAttribute('cx')).toBe(point.x.toString())
    expect(screen.getByTestId('startHandle').getAttribute('cy')).toBe(point.y.toString())
    expect(screen.getByTestId('endHandle').getAttribute('cx')).toBe(point.x.toString())
    expect(screen.getByTestId('endHandle').getAttribute('cy')).toBe(point.y.toString())
    expect(screen.getByTestId('fullCircle')).toBeDefined()

    userEvent.type(screen.getAllByRole('spinbutton')[1], '{selectall}40')
    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(40)
    expect(screen.queryByTestId('fullCircle')).toBeNull()
  })

  test('drag handle to change value of input field', () => {
    render(<CircularSlider
            value={[340, 20]}
            circleRadius={70}
            handleRadius={6}
            handleWidth={2}
            style={{ position: 'absolute', top: 0, left: 0 }}/>)

    const point = getXY(315, 70, 10)
    const endHandle = screen.getByTestId('endHandle')

    fireEvent.mouseDown(endHandle)
    fireEvent.mouseMove(endHandle, { clientX: point.x, clientY: point.y })
    fireEvent.mouseUp(endHandle)
    expect(screen.getAllByRole('spinbutton')[1]).toHaveValue(315)
  })
})

test('Snapshot test of circular slider', () => {
  const { asFragment } = render(
    <CircularSlider
      value={[320, 40]}
    />
  )

  const frag = asFragment()
  const svg = frag.querySelector('svg')
  const use = svg?.querySelector('use')
  if (use) svg?.removeChild(use)

  expect(frag).toMatchSnapshot()
})
