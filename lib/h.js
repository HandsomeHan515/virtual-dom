import * as _ from '../shared/utils'
/**
 * Virtual DOM
 * @param {String} tagName
 * @param {Object} props
 * @param {Array<Element>|String} children
 */

class h {
    constructor(tagName, props, children) {
        if (!(this instanceof h)) {
            console.log('this', this)
            if (!_.isArray(children) && children !== null) {
                children = _.slice(arguments, 2).filter(_.truthy)
            }
            return new h(tagName, props, children)
        }
        // 未填写 props 选项时，props 置 {}
        if (_.isArray(props)) {
            children = props
            props = {}
        }

        this.tagName = tagName
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : void 666

        let count = 0

        _.each(this.children, (child, i) => {
            if (child instanceof h) {
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
            _.setAttr(el, key, value)
        }

        _.each(this.children, function (child) {
            const childEl = child instanceof h
                ? child.render()
                : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el
    }
}

export default h