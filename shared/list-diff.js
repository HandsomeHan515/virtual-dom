import * as _ from './utils'

/**
 * Diff two list in O(n)
 * @param {Array} oldList 
 * @param {Array} newList 
 * @param {String} key 
 */
export default function listDiff(oldList, newList, key) {
    const oldMap = getKeyIndexAndFree(oldList, key)
    const newMap = getKeyIndexAndFree(newList, key)

    const oldKeyIndex = oldMap.keyIndex
    const newKeyIndex = newMap.keyIndex
    const newFree = newMap.free

    let moves = [],
        children = [],
        freeIndex = 0

    _.each(oldList, item => {
        let itemKey = getItemKey(item, key)

        if (itemKey) {
            if (!newKeyIndex.hasOwnProperty(itemKey)) {
                children.push(null)
            } else {
                let newItemIndex = newKeyIndex[itemKey]
                children.push(newList[newItemIndex])
            }
        } else {
            const freeItem = newFree[freeIndex++] || null
            children.push(freeItem)
        }
    })

    let simulateList = children.slice(0)
    // Remove null element
    _.each(simulateList, (item, i) => {
        if (item === null) {
            remove(i)
            _.remove(simulateList, i)
        }
    })

    let j = 0,
        i = 0

    while (i < newList.length) {
        const item = newList[i]
        const itemKey = getItemKey(item, key)

        const simulateItem = simulateList[j]
        const simulateItemKey = getItemKey(simulateItem, key)

        if (simulateItem) {
            if (itemKey === simulateItemKey) {
                j++
            } else {
                if (!oldKeyIndex.hasOwnProperty(itemKey)) {
                    insert(i, item)
                } else {
                    let nextItemKey = getItemKey(simulateList[j + 1], key)
                    if (nextItemKey === itemKey) {
                        remove(i)
                        _.remove(simulateList, j)
                        j++
                    } else {
                        insert(i, item)
                    }
                }
            }
        } else {
            insert(i, item)
        }
        i++
    }

    function remove(index) {
        const move = { index, type: 0 }
        moves.push(move)
    }
    
    function insert(index, item) {
        const move = { index, item, type: 1 }
        moves.push(move)
    }

    return { moves, children }
}

/**
 * Transfer list to key-item keyIndex
 * @param {Array} list 
 * @param {String|Function} key default is key
 */
function getKeyIndexAndFree(list, key) {
    let keyIndex = {},
        free = []

    _.each(list, (item, i) => {
        const itemKey = getItemKey(item, key)

        if (itemKey) {
            keyIndex[itemKey] = i // { key: index }
        } else {
            free.push(item)
        }
    })
    
    return { keyIndex, free }
}

function getItemKey (item, key) {
    if (!item || !key) return
    return typeof key === 'string' ? item[key] : key(item)
}