/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).diff


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff (oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key)

  var newFree = newMap.free

  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex

  var moves = []

  // a simulate list to manipulate
  var children = []
  var i = 0
  var item
  var itemKey
  var freeIndex = 0

  // fist pass to check item in old list: if it's removed or not
  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)
      } else {
        var newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      var freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  }

  var simulateList = children.slice(0)

  // remove items no longer exist
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i)
      removeSimulate(i)
    } else {
      i++
    }
  }

  // i is cursor pointing to a item in new list
  // j is cursor pointing to a item in simulateList
  var j = i = 0
  while (i < newList.length) {
    item = newList[i]
    itemKey = getItemKey(item, key)

    var simulateItem = simulateList[j]
    var simulateItemKey = getItemKey(simulateItem, key)

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++
      } else {
        // new item, just inesrt it
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item)
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = getItemKey(simulateList[j + 1], key)
          if (nextItemKey === itemKey) {
            remove(i)
            removeSimulate(j)
            j++ // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item)
          }
        }
      }
    } else {
      insert(i, item)
    }

    i++
  }

  function remove (index) {
    var move = {index: index, type: 0}
    moves.push(move)
  }

  function insert (index, item) {
    var move = {index: index, item: item, type: 1}
    moves.push(move)
  }

  function removeSimulate (index) {
    simulateList.splice(index, 1)
  }

  return {
    moves: moves,
    children: children
  }
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree (list, key) {
  var keyIndex = {}
  var free = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    var itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}

function getItemKey (item, key) {
  if (!item || !key) return void 666
  return typeof key === 'string'
    ? item[key]
    : key(item)
}

exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
exports.diff = diff


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./shared/utils.js
const type = function (obj) {
    return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

const isArray = function (obj) {
    return type(obj) === 'Array'
}

const isString = function (obj) {
    return type(obj) === 'String'
}

const slice = function (arr, index) {
    return Array.prototype.slice.call(arr, index)
}

const truthy = function (value) {
    return !!value
}

const each = function (arr, fn) {
    for (let i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i)
    }
}

const toArray = function (arr) {
    if (!arr) return []

    let list = []
    for (var i = 0, len = arr.length; i < len; i++) {
        list.push(arr[i])
    }
    return []
}

const setAttr = function (node, key, value) {
    switch (key) {
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


// CONCATENATED MODULE: ./lib/h.js

/**
 * Virtual DOM
 * @param {String} tagName
 * @param {Object} props
 * @param {Array<Element>|String} children
 */

class h_h {
    constructor(tagName, props, children) {
        if (!(this instanceof h_h)) {
            console.log('this', this)
            if (!isArray(children) && children !== null) {
                children = slice(arguments, 2).filter(truthy)
            }
            return new h_h(tagName, props, children)
        }
        // 未填写 props 选项时，props 置 {}
        if (isArray(props)) {
            children = props
            props = {}
        }

        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : void 666

        let count = 0

        each(this.children, (child, i) => {
            if (child instanceof h_h) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        })

        this.count = count
    }

    render() {
        const el = document.createElement(this.tagName)
        const props = this.props

        for (let key in props) {
            const value = props[key]
            setAttr(el, key, value)
        }

        each(this.children, function (child) {
            const childEl = child instanceof h_h
                ? child.render()
                : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el
    }
}

/* harmony default export */ var lib_h = (h_h);
// EXTERNAL MODULE: ./node_modules/list-diff2/index.js
var list_diff2 = __webpack_require__(0);
var list_diff2_default = /*#__PURE__*/__webpack_require__.n(list_diff2);

// CONCATENATED MODULE: ./shared/constants.js
const DIFF_STATUS = {
    REPLACE: 0,
    REORDER: 1,
    PROPS: 2,
    TEXT: 3
}
// CONCATENATED MODULE: ./lib/diff.js




function diff(oldTree, newTree) {
    const index = 0
    const patches = {}
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
    let currentPatch = []

    if (newNode === null) {

    } else if (isString(oldNode) && isString(newNode)) { // TextNode content replacing
        if (newNode !== oldNode) {
            currentPatch.push({ type: DIFF_STATUS.TEXT, content: newNode })
        }
    } else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) { // Nodes are the same, diff old node's props and children
        // diff props
        const propsPatches = diffProps(oldNode, newNode)
        if (propsPatches) {
            currentPatch.push({ type: DIFF_STATUS.PROPS, props: propsPatches })
        }
        // diff children If the node has a `ignore` property, do not diff children
        if (!isIgnoreChildren(newNode)) {
            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
        }
    } else { // Nodes are not the same, replace the old node with new node
        currentPatch.push({ type: DIFF_STATUS.REPLACE, node: newNode })
    }

    if (currentPatch.length) patches[index] = currentPatch
}

function isIgnoreChildren (node) {
    return node.props && node.props.hasOwnProperty('ignore')
}

function diffProps(oldNode, newNode) {
    const oldProps = oldNode.props
    const newProps = newNode.props

    let count = 0,
        key, 
        value, 
        propsPatches = {}

    //  different properties
    for(key in oldProps) {
        value = oldProps[key]
        if (newProps[key] !== value) {
            count ++
            propsPatches[key] = newProps[key]
        }
    }

    // new property
    for (key in newProps) {
        value = newProps[key]
        if (!oldProps.hasOwnProperty(key)) {
            count ++
            propsPatches[key] = newProps[key]
        }
    }

    if (count === 0) return null
    return propsPatches
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    const diffs = list_diff2_default()(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) currentPatch.push({ type: DIFF_STATUS.REORDER, moves: diffs.moves })
    let leftNode = null
    let currentNodeIndex = index
    each(oldChildren, function(child, i) {
        const newChild = newChildren[i]
        currentNodeIndex = leftNode && leftNode.count 
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches)
        leftNode = child
    })
}
// CONCATENATED MODULE: ./lib/patch.js



function patch(node, patches) {
    const walker = { index: 0 }
    patch_dfsWalk(node, walker, patches)
}

function patch_dfsWalk(node, walker, patches) {
    const currentPatches = patches[walker.index]

    const len = node.childNodes ? node.childNodes.length : 0

    for (let i = 0; i < len; i++) {
        const child = node.childNodes[i]
        walker.index++
        patch_dfsWalk(child, walker, patches)
    }

    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

function applyPatches(node, currentPatches) {
    each(currentPatches, currentPatch => {
        switch (currentPatch.type) {
            case DIFF_STATUS.REPLACE:
                const newNode = typeof currentPatch.node === 'string'
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break
            case DIFF_STATUS.REORDER:
                reorderChildren(node, currentPatch.moves)
                break
            case DIFF_STATUS.PROPS:
                setProps(node, currentPatch.props)
                break
            case DIFF_STATUS.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch type ' + currentPatch.type)
        }
    })
}

function setProps(node, props) {
    for (let key in props) {
        if (props[key] === void 666) {
            node.removeAttribute(key)
        } else {
            setAttr(node, key, props[key])
        }
    }
}

function reorderChildren(node, moves) {
    const staticNodeList = toArray(node.childNodes)
    let maps = {}

    each(staticNodeList, node => {
        if (node.nodeType === 1) {
            const key = node.getAttribute('key')
            if (key) {
                maps[key] = node
            }
        }
    })

    each(moves, move => {
        const index = move.index

        if (move.type === 0) {
            if (staticNodeList[index] === node.childNodes[index]) {
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
        } else if (move.type === 1) {
            const insertNode = maps[move.item.key]
                ? maps[move.item.key].cloneNode(true)
                : typeof move.item === 'object'
                    ? move.item.render()
                    : document.createTextNode(move.item)
            staticNodeList.splice(index, 0, insertNode)
            node.insertBefore(insertNode, node.childNodes[index] || null)
        }
    })
}
// CONCATENATED MODULE: ./index.js
/* concated harmony reexport h */__webpack_require__.d(__webpack_exports__, "h", function() { return lib_h; });
/* concated harmony reexport diff */__webpack_require__.d(__webpack_exports__, "diff", function() { return diff; });
/* concated harmony reexport patch */__webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });




window.vDom = { h: lib_h, diff: diff, patch: patch }



/***/ })
/******/ ]);