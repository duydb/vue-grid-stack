<template>
  <div class="grid-stack-item">
    <div class="grid-stack-item-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GridStackItem',
  props: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },
  inject: ['addItem', 'removeItem'],
  mounted () {
    this.$el.$gs_change = this.onChange
    this.addItem(this.$el, this.x, this.y, this.width, this.height, true)
  },
  destroyed () {
    this.removeItem(this.$el)
  },
  methods: {
    onChange (e) {
      this.$emit('change', e)
      this.$emit('update:x', e.x)
      this.$emit('update:y', e.y)
      this.$emit('update:width', e.width)
      this.$emit('update:height', e.height)
    }
  }
}
</script>
