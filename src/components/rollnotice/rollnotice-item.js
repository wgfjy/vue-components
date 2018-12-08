export default {
  name: 'RollnoticeItem',
  created () {
    this.$parent && this.$parent.createdItem()
  },
  destroyed () {
    this.$parent && this.$parent.destroyedItem()
  },
  render (h) {
    return h('div', {
      class: 'rollnotice__item'
    }, [this.$slots.default])
  }
}
