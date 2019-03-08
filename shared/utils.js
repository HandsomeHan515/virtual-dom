export const type = function (obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

export const isArray = function (obj) {
    return type(obj) === 'Array'
}

export const isString = function (obj) {
    return type(obj) === 'String'
}

export const slice = function (arr, index) {
    return Array.prototype.slice.call(arr, index)
}

export const truthy = function (value) {
    return !!value
}

export const each = function (arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i)
    }
}

export const toArray = function (arr) {
    if (!arr) return []

    let list = []
    for (var i = 0, len = arr.length; i < len; i++) {
        list.push(arr[i])
    }
    return []
}

export const setAttr = function (node, key, value) {
    switch (key) {
        case 'style':
            node.style.cssText = value
            break
        case 'value':
            let tagName = node.tagName || ''
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

export const remove = function (list, i) {
    list.splice(i, 1)
}