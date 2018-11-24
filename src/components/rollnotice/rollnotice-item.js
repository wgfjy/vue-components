export default {
  name: 'RollnoticeItem',
  computed: {
    parent () {
      let parent = this.$parent
      let name = parent.$options.name
      while (parent && (!name || name !== 'Rollnotice')) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
      }
      return parent
    },
    index () {
      let index = 0
      if (!this.parent) return index
      return this.parent.$children.indexOf(this)
    },
    styles () {
      const style = {}
      if (!this.parent) return style
      const count = this.parent.$children.length
      const { firstItemTranslate, lastItemTranslate } = this.parent
      let translate
      if (this.index === 0) {
        translate = firstItemTranslate
      } else if (this.index === count - 1) {
        translate = lastItemTranslate
      }
      if (translate) {
        style.transform = `translate3d(0, ${translate}px, 0)`
      }
      return style
    }
  },
  created () {
    this.parent.items.push(this)
  },
  mounted () {
    this.parent.autoPlay()
  },
  beforeDestroy () {
    this.parent.items.slice(this.index, 1)
  },
  render (h) {
    return h('div', {
      class: 'rollnotice__item',
      style: this.styles
    }, [this.$slots.default])
  }
}
