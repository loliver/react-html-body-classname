import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { HtmlClassName, BodyClassName } from '../'

describe('HtmlClassName', () => {
  global.beforeEach(() => {
    HtmlClassName.canUseDOM = false
  })

  it('hides itself from the DOM', () => {
    var { container } = render(
      <HtmlClassName className='irrelevant' id='testId'>
        <div>hello</div>
      </HtmlClassName>
    )
    expect(container).toMatchSnapshot()
  })

  it('throws an error if it has multiple children', () => {
    var Component = () => (
      <HtmlClassName className='irrelevant' id='testId'>
        <div>hello</div>
        <div>world</div>
      </HtmlClassName>
    )

    expect(() => {
      render(<Component />)
    }).toThrow(
      /React.Children.only expected to receive a single React element child/
    )
  })

  it('works with complex children', () => {
    var Component1 = () => {
      return (
        <p>
          <span>c</span>
          <span>d</span>
        </p>
      )
    }

    var Component2 = () => {
      return (
        <HtmlClassName className='irrelevant' id='testId'>
          <div>
            <div>a</div>
            <div>b</div>
            <div>
              <Component1 />
            </div>
          </div>
        </HtmlClassName>
      )
    }

    var { container, getByText } = render(<Component2 />)
    expect(container).toMatchSnapshot()
    expect(getByText('a')).toBeDefined()
    expect(getByText('b')).toBeDefined()
    expect(getByText('c')).toBeDefined()
    expect(getByText('d')).toBeDefined()
  })
})

describe('BodyClassName', () => {
  global.beforeEach(() => {
    BodyClassName.canUseDOM = false
  })

  it('hides itself from the DOM', () => {
    var { container } = render(
      <BodyClassName className='irrelevant' id='testId'>
        <div>hello</div>
      </BodyClassName>
    )
    expect(container).toMatchSnapshot()
  })

  it('throws an error if it has multiple children', () => {
    var Component = () => (
      <BodyClassName className='irrelevant' id='testId'>
        <div>hello</div>
        <div>world</div>
      </BodyClassName>
    )

    expect(() => {
      render(<Component />)
    }).toThrow(
      /React.Children.only expected to receive a single React element child/
    )
  })

  it('works with complex children', () => {
    var Component1 = () => (
      <p>
        <span>c</span>
        <span>d</span>
      </p>
    )

    var Component2 = () => (
      <BodyClassName className='irrelevant' id='testId'>
        <div>
          <div>a</div>
          <div>b</div>
          <div>
            <Component1 />
          </div>
        </div>
      </BodyClassName>
    )

    var { container, getByText } = render(<Component2 />)
    expect(container).toMatchSnapshot()
    expect(getByText('a')).toBeDefined()
    expect(getByText('b')).toBeDefined()
    expect(getByText('c')).toBeDefined()
    expect(getByText('d')).toBeDefined()
  })
})
