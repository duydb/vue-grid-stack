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
      this.instance = GridStack.init(this.options, this.$refs.gs)
      this.instance.on('change', (e, items) => {
        items.forEach(item => {
          this.processItemChange(item)
        })
      })
      this.instance.on('added', (e, items) => {
        items.forEach(item => {
          this.processItemChange(item)
        })
      })
      while (this.pre.length > 0) {
        const args = this.pre.shift()
        this.addItem(...args)
      }
    })
  },
  methods: {
    addItem (...args) {
      if (this.instance) {
        this.instance.addWidget(...args)
      } else {
        this.pre.push(args)
      }
    },
    removeItem (...args) {
      if (this.instance) {
        this.instance.removeWidget(...args)
      }
    },
    processItemChange (item) {
      if (item.el && typeof item.el.$gs_change === 'function') {
        item.el.$gs_change(item)
      }
    }
  }
}
