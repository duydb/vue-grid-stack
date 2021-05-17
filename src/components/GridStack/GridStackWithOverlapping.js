const HOOK = Object.freeze({
  setAllowOverlapOpt (allowOverlap = false) {
    this._allowOverlap = allowOverlap
  },
  _fixCollisions (Utils) {
    return function (node) {
      if (this._allowOverlap) return
      this._sortNodes(-1)

      let nn = node
      const hasLocked = Boolean(this.nodes.find(n => n.locked))
      if (!this.float && !hasLocked) {
        nn = {
          x: 0,
          y: node.y,
          width: this.column,
          height: node.height
        }
      }
      while (true) {
        const collisionNode = this.nodes.find(n => n !== node && Utils.isIntercepted(n, nn), {
          node: node,
          nn: nn
        })
        if (!collisionNode) {
          return this
        }
        let moved
        if (collisionNode.locked) {
          // if colliding with a locked item, move ourself instead
          moved = this.moveNode(node, node.x, collisionNode.y + collisionNode.height,
            node.width, node.height, true)
        } else {
          moved = this.moveNode(collisionNode, collisionNode.x, node.y + node.height,
            collisionNode.width, collisionNode.height, true)
        }
        if (!moved) {
          return this
        } // break inf loop if we couldn't move after all (ex: maxRow, fixed)
      }
    }
  },
  addNode (Utils) {
    return function (node, triggerAddEvent = false) {
      node = this.prepareNode(node)

      if (!this._allowOverlap && node.autoPosition) {
        this._sortNodes()

        for (let i = 0; ; ++i) {
          const x = i % this.column
          const y = Math.floor(i / this.column)
          if (x + node.width > this.column) {
            continue
          }
          const box = {
            x: x,
            y: y,
            width: node.width,
            height: node.height
          }
          if (!this.nodes.find(n => Utils.isIntercepted(box, n), {
            x: x,
            y: y,
            node: node
          })) {
            node.x = x
            node.y = y
            delete node.autoPosition // found our slot
            break
          }
        }
      }

      this.nodes.push(node)
      if (triggerAddEvent) {
        this.addedNodes.push(node)
      }

      this._fixCollisions(node)
      this._packNodes()
      this._notify()
      return node
    }
  }
})

export default function (GridStack) {
  if (!GridStack) return
  GridStack.Engine.prototype.setAllowOverlapOpt = HOOK.setAllowOverlapOpt
  GridStack.Engine.prototype._fixCollisions = HOOK._fixCollisions(GridStack.Utils)
  GridStack.Engine.prototype.addNode = HOOK.addNode(GridStack.Utils)
}
