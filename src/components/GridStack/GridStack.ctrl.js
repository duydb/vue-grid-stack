import GridStack from 'gridstack/dist/gridstack.all.js'
import 'gridstack/dist/gridstack.css'

export default {
  name: 'GridStack',
  props: {
    options: {
      type: Object,
      default: () => ({
        // resizable: {
        //   handles: 'e, se, s, sw, w, n, nw, ne'
        // }
      })
    }
  },
  data () {
    return {
      instance: null,
      pre: []
    }
  },
  provide () {
    return {
      addItem: this.addItem,
      removeItem: this.removeItem
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs)
      this.instance = GridStack.init(this.options, this.$refs.gs)
      this.instance.on('change', function (e, items) {
        console.log(e)
        console.log(items)
        items.forEach(item => {
          if (item.el && typeof item.el.$gs_change === 'function') {
            item.el.$gs_change(item)
          }
        })
      })
      console.log(this.instance)
      while (this.pre.length > 0) {
        const args = this.pre.shift()
        console.log(args)
        this.instance.addWidget(...args)
        // this.instance.$compile(args[0])
      }
      // this.initItems()
    })
    // window.$(this.$el).girdstack(this.options)// GridStack.init(this.options)
    // console.log(this)
    // console.log(this.$slots)
    // grid.addWidget('<div><div class="grid-stack-item-content">Item 1</div></div>', { width: 2 })
  },
  updated () {
    // console.log(this.$slots)
    // this.initItems()
  },
  methods: {
    addItem (...args) {
      if (this.instance) {
      //   this.instance.addWidget(`
      //   <grid-stack-item data-gs-x="0" data-gs-y="0"
      //     data-gs-width="1" data-gs-height="1"><div class="grid-stack-item-content ui-draggable-handle">
      //   <p>Vue (added)</p>
      // </div></grid-stack-item>
      // `, 0, 0, 1, 1, true)
        this.instance.addWidget(...args)
      } else {
        this.pre.push(args)
      }
      // this.instance.addWidget(...args)
    },
    removeItem (...args) {
      this.instance.removeWidget(...args)
    },
    initItems () {
      const nodeList = this.$refs.temps.querySelectorAll('.grid-stack-item')
      for (let i = 0; i < nodeList.length; i++) {
        console.log(nodeList[i])
        this.instance.addWidget(nodeList[i])
        // this.instance.addWidget(nodeList[i], 0, 0, 1, 1, true)
        // nodeList[i].classList.add('grid-stack-item')
        // nodeList[i].classList.remove('grid-stack-item-pre')
      }
      // this.instance.addWidget(`
      //   <grid-stack-item data-gs-x="0" data-gs-y="0"
      //     data-gs-width="1" data-gs-height="1"><div class="grid-stack-item-content ui-draggable-handle">
      //   <p>Vue (added)</p>
      // </div></grid-stack-item>
      // `, 0, 0, 1, 1, true)
      // console.log(this.$el.querySelectorAll('.grid-stack-item-pre'))
      // this.$slots.default.forEach(item => {
      //   console.log(item)
      //   console.log(item.elm, 0, 0, 1, 1, true)
      // //   this.instance.addWidget(`
      // //   <grid-stack-item data-gs-x="0" data-gs-y="0"
      // //     data-gs-width="1" data-gs-height="1"><div class="grid-stack-item-content ui-draggable-handle">
      // //   <p>Vue (added)</p>
      // // </div></grid-stack-item>
      // // `, 0, 0, 1, 1, true)
      // })
    }
  }
}
