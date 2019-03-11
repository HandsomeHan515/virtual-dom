import * as _ from '../shared/utils'
/**
 * Virtual DOM
 * @param {String} tagName
 * @param {Object} props
 * @param {Array<Element>|String} children
 */

class Element {
    constructor(tagName, props, children) {
        if (_.isArray(props)) {
            children = props
            props = {}
        }

        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : void 0
    }

    render() {
        let el = document.createElement(this.tagName)
        let props = this.props

        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                _.setAttr(el, key, props[key])
            }
        }

        _.each(this.children, child => {
            const childEl = child instanceof Element
                ? child.render()
                : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el
    }
}

export default function h(tagName, props, children) {
    return new Element(tagName, props, children)
}