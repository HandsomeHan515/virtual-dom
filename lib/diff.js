import * as _ from '../shared/utils'
import listDiff from 'list-diff2'
import { DIFF_STATUS } from '../shared/constants'

export default function diff(oldTree, newTree) {
    const index = 0
    const patches = {}
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
    let currentPatch = []

    if (newNode === null) {

    } else if (_.isString(oldNode) && _.isString(newNode)) { // TextNode content replacing
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
    const diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children

    if (diffs.moves.length) currentPatch.push({ type: DIFF_STATUS.REORDER, moves: diffs.moves })
    let leftNode = null
    let currentNodeIndex = index
    _.each(oldChildren, function(child, i) {
        const newChild = newChildren[i]
        currentNodeIndex = leftNode && leftNode.count 
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1
        dfsWalk(child, newChild, currentNodeIndex, patches)
        leftNode = child
    })
}