import React from 'react'
import { render } from '@testing-library/react'

import { HtmlClassName, BodyClassName } from '../'

describe('HtmlClassName (in a browser)', () => {
  global.beforeEach(() => {
    HtmlClassName.canUseDOM = true
    global.document.documentElement.className = ''
  })

  it('changes the document html class name on mount', () => {
    var className = 'hello world'
    render(React.createElement(HtmlClassName, { className: className }))
    expect(global.document.documentElement.className).toEqual(className)
  })

  it('does not erase existing html class names', () => {
    global.document.documentElement.className = 'testing'
    var className = 'hello world'
    render(React.createElement(HtmlClassName, { className: className }))
    expect(global.document.documentElement.className).toEqual(
      'testing hello world'
    )
  })

  it('does not erase and or duplicate existing html class names', () => {
    global.document.documentElement.className = 'testing hello'
    var className = 'hello world'
    render(React.createElement(HtmlClassName, { className: className }))
    expect(global.document.documentElement.className).toEqual(
      'testing hello world'
    )
  })

  it('supports nesting, gathering all classNames used', () => {
    var called = jest.fn()
    var firstName = 'hello world'
    var secondName = 'foo bar'

    const Component1 = () => <HtmlClassName className={firstName} />
    const Component2 = () => {
      called()

      return (
        <HtmlClassName className={secondName}>
          <div>
            <Component1 />
          </div>
        </HtmlClassName>
      )
    }

    const { baseElement } = render(<Component2 />)

    expect(called).toHaveBeenCalled()
    expect(baseElement).toMatchSnapshot()
    expect(global.document.documentElement.classList).toContain('hello')
    expect(global.document.documentElement.classList).toContain('world')
    expect(global.document.documentElement.classList).toContain('foo')
    expect(global.document.documentElement.classList).toContain('bar')
  })
})

describe('BodyClassName (in a browser)', () => {
  beforeEach(() => {
    BodyClassName.canUseDOM = true
    global.document.body.className = ''
  })

  it('changes the document body class name on mount', () => {
    var className = 'hello world'
    render(<BodyClassName className={className} />)
    expect(global.document.body.className).toEqual(className)
  })

  it('does not erase existing body class names', () => {
    global.document.body.className = 'testing'
    var className = 'hello world'
    render(<BodyClassName className={className} />)
    expect(global.document.body.className).toEqual('testing hello world')
  })

  it('does not erase and or duplicate existing body class names', () => {
    global.document.body.className = 'testing hello'
    var className = 'hello world'
    render(<BodyClassName className={className} />)
    expect(global.document.body.className).toEqual('testing hello world')
  })

  it('supports nesting, gathering all classNames used', () => {
    var called = jest.fn()
    var firstName = 'hello world'
    var secondName = 'foo bar'

    const Component1 = () => <BodyClassName className={firstName} />
    const Component2 = () => {
      called()

      return (
        <BodyClassName className={secondName}>
          <div>
            <Component1 />
          </div>
        </BodyClassName>
      )
    }

    const { baseElement } = render(<Component2 />)

    expect(called).toHaveBeenCalled()
    expect(baseElement).toMatchSnapshot()
    expect(global.document.body.classList).toContain('hello')
    expect(global.document.body.classList).toContain('world')
    expect(global.document.body.classList).toContain('foo')
    expect(global.document.body.classList).toContain('bar')
  })
})
