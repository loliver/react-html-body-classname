'use strict'

var React = require('react')
var PropTypes = require('prop-types')

function splitClassName (className) {
  return className.split(/\s+/)
}

function handleHtmlStateChangeOnClient (stringClassNames) {
  var currentHtmlClassNames = splitClassName(document.documentElement.className)

  var newHtmlClassNames = splitClassName(stringClassNames).filter(function (
    className
  ) {
    return currentHtmlClassNames.indexOf(className) === -1
  })

  HtmlClassName.cache = newHtmlClassNames
  document.documentElement.className = currentHtmlClassNames
    .concat(newHtmlClassNames)
    .join(' ')
    .trim()
}

function HtmlClassName (props) {
  React.useEffect(
    function setHtmlClassName() {
      handleHtmlStateChangeOnClient(props.className)
    },
    [props.className]
  )
  if (props.children) {
    return React.Children.only(props.children)
  } else {
    return null
  }
}

HtmlClassName.displayName = 'HtmlClassName'
HtmlClassName.cache = []
HtmlClassName.propTypes = {
  className: PropTypes.string.isRequired
}

function handleBodyStateChangeOnClient (stringClassNames) {
  var currentBodyClassNames = splitClassName(document.body.className)

  var newBodyClassNames = splitClassName(stringClassNames).filter(function (
    className
  ) {
    return currentBodyClassNames.indexOf(className) === -1
  })

  BodyClassName.cache = newBodyClassNames
  document.body.className = currentBodyClassNames
    .concat(newBodyClassNames)
    .join(' ')
    .trim()
}

function BodyClassName (props) {
  React.useEffect(
    function setBodyClassName() {
      handleBodyStateChangeOnClient(props.className)
    },
    [props.className]
  )
  if (props.children) {
    return React.Children.only(props.children)
  } else {
    return null
  }
}

BodyClassName.displayName = 'BodyClassName'
BodyClassName.cache = []
BodyClassName.propTypes = {
  className: PropTypes.string.isRequired
}

module.exports = {
  HtmlClassName,
  BodyClassName
}
