import * as _ from '../shared/utils'
import { DIFF_STATE } from '../shared/constants'

export default function patch(node, patches) {
    const walker = { index: 0 }
    dfs(node, walker, patches)
}

function dfs(node, walker, patches) {
    const currentPatches = patches[walker.index]

    const len = node.childNodes ? node.childNodes.length : 0
    for (let i = 0; i < len; i++) {
        const child = node.childNodes[i]
        walker.index++
        dfs(child, walker, patches)
    }

    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

function applyPatches(node, currentPatches) {
    _.each(currentPatches, currentPatch => {
        switch (currentPatch.type) {
            case DIFF_STATE.REPLACE:
                const newNode = typeof currentPatch.node === 'string'
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break
            case DIFF_STATE.REORDER:
                reorderChildren(node, currentPatch.moves)
                break
            case DIFF_STATE.PROPS:
                setProps(node, currentPatch.props)
                break
            case DIFF_STATE.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    // for ie
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
        if (!props[key]) {
            node.removeAttribute(key)
        } else {
            _.setAttr(node, key, props[key])
        }
    }
}

function reorderChildren(node, moves) {
    const staticNodeList = _.toArray(node.childNodes)
    let maps = {}

    _.each(staticNodeList, node => {
        if (node.nodeType === 1) { // 1 is Element
            const key = node.getAttribute('key')
            if (key) {
                maps[key] = node
            }
        }
    })

    _.each(moves, move => {
        const { index } = move
        const currentNode = node.childNodes[index]

        if (move.type === 0) { // 0 is remove 1 is insert
            if (staticNodeList[index] === currentNode) {
                node.removeChild(currentNode)
            }
            staticNodeList.splice(index, 1)
        } else if (move.type === 1) {
            const insertNode = maps[move.item.key]
                ? maps[move.item.key].cloneNode(true)
                : typeof move.item === 'object'
                    ? move.item.render()
                    : document.createTextNode(move.item)
            staticNodeList.splice(index, 0, insertNode)
            node.insertBefore(insertNode, currentNode || null)
        }
    })
}