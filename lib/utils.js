const _ = exports

_.type = function type(obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = function isArray(obj) {
    return _.type(obj) === 'Array'
}

_.isString = function isString(obj) {
    return _.type(obj) === 'String'
}

_.slice = function slice(arr, index) {
    return Array.prototype.slice.call(arr, index)
}

_.truthy = function truthy(value) {
    return !!value
}

_.each = function each(arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i)
    }
}

_.toArray = function toArray(arr) {
    if (!arr) return []

    let list = []
    for (var i = 0, len = arr.length; i < len; i++) {
        list.push(arr[i])
    }
    return []
}

_.setAttr = function setAttr(node, key, value) {
    switch(key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            const tagName = node.tagName || ''
            tagName = tagName.toLowerCase()
            if (tagName === 'input' || tagName === 'textarea') {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break
        default:
            node.setAttribute(key, value)
    }
}

