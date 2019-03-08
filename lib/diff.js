import * as _ from '../shared/utils'
import listDiff from '../shared/list-diff'
// import listDiff from 'list-diff2'
import { DIFF_STATE } from '../shared/constants'

let key = 0

export default function diff(oldDomTree, newDomTree) {
    const index = 0
    const patches = {} // Record differences
    dfs(oldDomTree, newDomTree, index, patches)
    return patches
}

/**
 * function dfs
 * @param {Object} oldNode 
 * @param {Object} newNode 
 * @param {Number} index 
 * @param {Object} patches 
 */
function dfs(oldNode, newNode, index, patches) {
    let currentPatch = []

    if (!newNode) {
        // old node removed, as no new Nodes
    } else if (_.isString(oldNode) && _.isString(newNode)) { 
        // TextNode content replacing
        if (newNode !== oldNode) currentPatch.push({ type: DIFF_STATE.TEXT, content: newNode })
    } else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) { 
        // Nodes are the same, diff old node's props and children

        // Diff props
        const propsPatches = diffProps(oldNode.props, newNode.props)
        if (propsPatches) currentPatch.push({ type: DIFF_STATE.PROPS, props: propsPatches })

        // Diff children
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
    } else { 
        // Nodes are not the same, replace the old node with new node
        currentPatch.push({ type: DIFF_STATE.REPLACE, node: newNode })
    }

    if (currentPatch.length) patches[index] = currentPatch
}

/**
 * function diffProps
 * @param {Ojbect} oldProps 
 * @param {Object} newProps 
 */
function diffProps(oldProps, newProps) {
    let count = 0,
        key, 
        propsPatches = {}

    // Find out different properties
    for(key in oldProps) {
        if (newProps[key] !== oldProps[key]) {
            count ++
            propsPatches[key] = newProps[key]
        }
    }

    // Find out new property
    for (key in newProps) {
        if (!oldProps.hasOwnProperty(key)) {
            count ++
            propsPatches[key] = newProps[key]
        }
    }
    return count !== 0 ? propsPatches : null 
}

let count = 0
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    const diffs = listDiff(oldChildren, newChildren, 'key')
    newChildren = diffs.children
    if (diffs.moves.length) currentPatch.push({ type: DIFF_STATE.REORDER, moves: diffs.moves })

    let currentNodeIndex = index
    _.each(oldChildren, function(child, i) {
        count ++
        currentNodeIndex = count
        const newChild = newChildren[i]
        dfs(child, newChild, currentNodeIndex, patches)
    })
}