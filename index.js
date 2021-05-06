'use strict'

var React = require('react')
var PropTypes = require('prop-types')

function splitClassName (className) {
  return className.split(/\s+/)
}

function buildClassObject (className, uniqueInstanceId) {
  return { className: className, uniqueInstanceId: uniqueInstanceId }
}

function handleStateChangeOnClient (
  stringClassNames,
  uniqueInstanceId,
  Component
) {
  var oldClassNamesForUniqueId = Component.cache.filter(function (
    classNameObj
  ) {
    return classNameObj && classNameObj.uniqueInstanceId === uniqueInstanceId
  })
  var currentClassNames = splitClassName(
    document[Component.classNameTarget].className
  ).filter(function (currentClassName) {
    if (oldClassNamesForUniqueId.length > 0) {
      var classNameForUniqueIdDoesNotExist = true
      oldClassNamesForUniqueId.forEach(function (oldClassNameForUniqueId) {
        if (oldClassNameForUniqueId.className === currentClassName) {
          classNameForUniqueIdDoesNotExist = false
        }
      })
      return classNameForUniqueIdDoesNotExist
    } else {
      return true
    }
  })

  var newClassNames = splitClassName(stringClassNames).filter(function (
    className
  ) {
    return Component.cache.indexOf(className) === -1
  })

  var currentClassNameObjects = currentClassNames.map(function (
    currentClassName
  ) {
    var cachedClassNameByCurrentClassName = Component.cache.find(function (
      classNameObj
    ) {
      return classNameObj && classNameObj.className === currentClassName
    })

    return cachedClassNameByCurrentClassName
      ? buildClassObject(
          currentClassName,
          cachedClassNameByCurrentClassName.uniqueInstanceId
        )
      : undefined
  })

  var newClassNameObjects = newClassNames.map(function (newClassName) {
    return buildClassObject(newClassName, uniqueInstanceId)
  })

  Component.cache = currentClassNameObjects.concat(newClassNameObjects)
  document[Component.classNameTarget].className = currentClassNames
    .concat(newClassNames)
    .join(' ')
    .trim()
}

function HtmlClassName (props) {
  React.useEffect(
    function setHtmlClassNameState () {
      handleStateChangeOnClient(props.className, props.id, HtmlClassName)
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
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
HtmlClassName.classNameTarget = 'documentElement'

function BodyClassName (props) {
  React.useEffect(
    function setBodyClassNameState () {
      handleStateChangeOnClient(props.className, props.id, BodyClassName)
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
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
BodyClassName.classNameTarget = 'body'

module.exports = {
  HtmlClassName,
  BodyClassName
}
