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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./shared/utils.js
var type = function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
};
var isArray = function isArray(obj) {
  return type(obj) === 'Array';
};
var isString = function isString(obj) {
  return type(obj) === 'String';
};
var slice = function slice(arr, index) {
  return Array.prototype.slice.call(arr, index);
};
var truthy = function truthy(value) {
  return !!value;
};
var each = function each(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    fn(arr[i], i);
  }
};
var toArray = function toArray(arr) {
  if (!arr) return [];
  var list = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    list.push(arr[i]);
  }

  return [];
};
var setAttr = function setAttr(node, key, value) {
  switch (key) {
    case 'style':
      node.style.cssText = value;
      break;

    case 'value':
      var tagName = node.tagName || '';
      tagName = tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }

      break;

    default:
      node.setAttribute(key, value);
  }
};
var utils_remove = function remove(list, i) {
  list.splice(i, 1);
};
// CONCATENATED MODULE: ./lib/h.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Virtual DOM
 * @param {String} tagName
 * @param {Object} props
 * @param {Array<Element>|String} children
 */

var h_Element =
/*#__PURE__*/
function () {
  function Element(tagName, props, children) {
    _classCallCheck(this, Element);

    if (isArray(props)) {
      children = props;
      props = {};
    }

    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : void 0;
  }

  _createClass(Element, [{
    key: "render",
    value: function render() {
      var el = document.createElement(this.tagName);
      var props = this.props;

      for (var key in props) {
        setAttr(el, key, props[key]);
      }

      each(this.children, function (child) {
        var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
      });

      return el;
    }
  }]);

  return Element;
}();

function h(tagName, props, children) {
  return new h_Element(tagName, props, children);
}
// CONCATENATED MODULE: ./shared/list-diff.js

/**
 * Diff two list in O(n)
 * @param {Array} oldList 
 * @param {Array} newList 
 * @param {String} key 
 */

function listDiff(oldList, newList, key) {
  var oldMap = getKeyIndexAndFree(oldList, key);
  var newMap = getKeyIndexAndFree(newList, key);
  var oldKeyIndex = oldMap.keyIndex;
  var newKeyIndex = newMap.keyIndex;
  var newFree = newMap.free;
  var moves = [],
      children = [],
      freeIndex = 0;

  each(oldList, function (item) {
    var itemKey = getItemKey(item, key);

    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null);
      } else {
        var newItemIndex = newKeyIndex[itemKey];
        children.push(newList[newItemIndex]);
      }
    } else {
      var freeItem = newFree[freeIndex++] || null;
      children.push(freeItem);
    }
  });

  var simulateList = children.slice(0); // Remove null element

  each(simulateList, function (item, i) {
    if (item === null) {
      remove(i);

      utils_remove(simulateList, i);
    }
  });

  var j = 0,
      i = 0;

  while (i < newList.length) {
    var item = newList[i];
    var itemKey = getItemKey(item, key);
    var simulateItem = simulateList[j];
    var simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          var nextItemKey = getItemKey(simulateList[j + 1], key);

          if (nextItemKey === itemKey) {
            remove(i);

            utils_remove(simulateList, j);

            j++;
          } else {
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }

    i++;
  }

  function remove(index) {
    var move = {
      index: index,
      type: 0
    };
    moves.push(move);
  }

  function insert(index, item) {
    var move = {
      index: index,
      item: item,
      type: 1
    };
    moves.push(move);
  }

  return {
    moves: moves,
    children: children
  };
}
/**
 * Transfer list to key-item keyIndex
 * @param {Array} list 
 * @param {String|Function} key default is key
 */

function getKeyIndexAndFree(list, key) {
  var keyIndex = {},
      free = [];

  each(list, function (item, i) {
    var itemKey = getItemKey(item, key);

    if (itemKey) {
      keyIndex[itemKey] = i; // { key: index }
    } else {
      free.push(item);
    }
  });

  return {
    keyIndex: keyIndex,
    free: free
  };
}

function getItemKey(item, key) {
  if (!item || !key) return;
  return typeof key === 'string' ? item[key] : key(item);
}
// CONCATENATED MODULE: ./shared/constants.js
/**
 * @param REPLACE Replace origin node
 * @param REORDER Remove node, delete node, add new node
 * @param PROPS Change props content
 * @param TEXT Change text node
 */
var DIFF_STATE = {
  REPLACE: 0,
  REORDER: 1,
  PROPS: 2,
  TEXT: 3
};
// CONCATENATED MODULE: ./lib/diff.js

 // import listDiff from 'list-diff2'


var diff_key = 0;
function diff(oldDomTree, newDomTree) {
  var index = 0;
  var patches = {}; // Record differences

  dfs(oldDomTree, newDomTree, index, patches);
  return patches;
}
/**
 * function dfs
 * @param {Object} oldNode 
 * @param {Object} newNode 
 * @param {Number} index 
 * @param {Object} patches 
 */

function dfs(oldNode, newNode, index, patches) {
  var currentPatch = [];

  if (!newNode) {// old node removed, as no new Nodes
  } else if (isString(oldNode) && isString(newNode)) {
    // TextNode content replacing
    if (newNode !== oldNode) currentPatch.push({
      type: DIFF_STATE.TEXT,
      content: newNode
    });
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // Nodes are the same, diff old node's props and children
    // Diff props
    var propsPatches = diffProps(oldNode.props, newNode.props);
    if (propsPatches) currentPatch.push({
      type: DIFF_STATE.PROPS,
      props: propsPatches
    }); // Diff children

    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
  } else {
    // Nodes are not the same, replace the old node with new node
    currentPatch.push({
      type: DIFF_STATE.REPLACE,
      node: newNode
    });
  }

  if (currentPatch.length) patches[index] = currentPatch;
}
/**
 * function diffProps
 * @param {Ojbect} oldProps 
 * @param {Object} newProps 
 */


function diffProps(oldProps, newProps) {
  var count = 0,
      key,
      propsPatches = {}; // Find out different properties

  for (key in oldProps) {
    if (newProps[key] !== oldProps[key]) {
      count++;
      propsPatches[key] = newProps[key];
    }
  } // Find out new property


  for (key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      count++;
      propsPatches[key] = newProps[key];
    }
  }

  return count !== 0 ? propsPatches : null;
}

var count = 0;

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key');
  newChildren = diffs.children;
  if (diffs.moves.length) currentPatch.push({
    type: DIFF_STATE.REORDER,
    moves: diffs.moves
  });
  var currentNodeIndex = index;

  each(oldChildren, function (child, i) {
    count++;
    currentNodeIndex = count;
    var newChild = newChildren[i];
    dfs(child, newChild, currentNodeIndex, patches);
  });
}
// CONCATENATED MODULE: ./lib/patch.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function patch(node, patches) {
  var walker = {
    index: 0
  };
  patch_dfs(node, walker, patches);
}

function patch_dfs(node, walker, patches) {
  var currentPatches = patches[walker.index];
  var len = node.childNodes ? node.childNodes.length : 0;

  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    walker.index++;
    patch_dfs(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches);
  }
}

function applyPatches(node, currentPatches) {
  each(currentPatches, function (currentPatch) {
    switch (currentPatch.type) {
      case DIFF_STATE.REPLACE:
        var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
        node.parentNode.replaceChild(newNode, node);
        break;

      case DIFF_STATE.REORDER:
        reorderChildren(node, currentPatch.moves);
        break;

      case DIFF_STATE.PROPS:
        setProps(node, currentPatch.props);
        break;

      case DIFF_STATE.TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content;
        } else {
          // for ie
          node.nodeValue = currentPatch.content;
        }

        break;

      default:
        throw new Error('Unknown patch type ' + currentPatch.type);
    }
  });
}

function setProps(node, props) {
  for (var key in props) {
    if (!props[key]) {
      node.removeAttribute(key);
    } else {
      setAttr(node, key, props[key]);
    }
  }
}

function reorderChildren(node, moves) {
  var staticNodeList = toArray(node.childNodes);

  var maps = {};

  each(staticNodeList, function (node) {
    if (node.nodeType === 1) {
      // 1 is Element
      var key = node.getAttribute('key');

      if (key) {
        maps[key] = node;
      }
    }
  });

  each(moves, function (move) {
    var index = move.index;
    var currentNode = node.childNodes[index];

    if (move.type === 0) {
      // 0 is remove 1 is insert
      if (staticNodeList[index] === currentNode) {
        node.removeChild(currentNode);
      }

      staticNodeList.splice(index, 1);
    } else if (move.type === 1) {
      var insertNode = maps[move.item.key] ? maps[move.item.key].cloneNode(true) : _typeof(move.item) === 'object' ? move.item.render() : document.createTextNode(move.item);
      staticNodeList.splice(index, 0, insertNode);
      node.insertBefore(insertNode, currentNode || null);
    }
  });
}
// CONCATENATED MODULE: ./index.js
/* concated harmony reexport h */__webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* concated harmony reexport diff */__webpack_require__.d(__webpack_exports__, "diff", function() { return diff; });
/* concated harmony reexport patch */__webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });



window.vDom = {
  h: h,
  diff: diff,
  patch: patch
};


/***/ })
/******/ ]);