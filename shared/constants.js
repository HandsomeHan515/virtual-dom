/**
 * @param REPLACE Replace origin node
 * @param REORDER Remove node, delete node, add new node
 * @param PROPS Change props content
 * @param TEXT Change text node
 */

export const DIFF_STATE = {
    REPLACE: 0, 
    REORDER: 1,
    PROPS: 2,
    TEXT: 3
}