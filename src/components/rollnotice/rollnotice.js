export default {
  name: 'Rollnotice',
  props: {
    height: {
      validator (val) {
        return /^\d*$/.test(val)
      },
      default: 40
    },
    speed: {
      validator (val) {
        return /^\d*$/.test(val)
      },
      default: 300
    },
    duration: {
      validator (val) {
        return /^\d*$/.test(val)
      },
      default: 4000
    },
    align: {
      validator (val) {
        return ['left', 'center', 'right'].indexOf(val) > -1
      },
      default: 'left'
    },
    direction: {
      validator (dir) {
        return ['up', 'down'].indexOf(dir) > -1
      },
      default: 'up'
    }
  },
  data () {
    return {
      items: [],
      index: 0,
      timer: null,
      transitionDuration: this.speed,
      translate: 0,
      firstItemTranslate: 0,
      lastItemTranslate: 0
    }
  },
  computed: {
    count () {
      return this.items.length
    },
    styles () {
      let style = {}
      style.transition = `transform ${this.transitionDuration}ms ease-in`
      style.transform = `translate3d(0, ${this.translate}px, 0)`
      return style
    },
    classes () {
      return [
        'rollnotice__content',
        {
          [`rollnotice__align-${this.align}`]: !!this.align
        }
      ]
    }
  },
  methods: {
    autoPlay () {
      window.clearInterval(this.timer)
      this.timer = window.setInterval(() => {
        this.transitionDuration = this.speed
        if (this.direction === 'up') {
          this.index++
          if (this.index === this.count) {
            this.firstItemTranslate = this.count * this.height
          }
        }
        if (this.direction === 'down') {
          if (this.index === 0) {
            this.lastItemTranslate = -this.count * this.height
          }
          this.index--
        }
        this.translate = -this.index * this.height
      }, this.duration)
    },
    onTransitionEnd () {
      if (this.direction === 'up') {
        if (this.index === this.count) {
          this.index = 0
          this.transitionDuration = 0
          this.translate = 0
          this.firstItemTranslate = 0
        }
      }
      if (this.direction === 'down') {
        if (this.index === -1) {
          this.index = this.count - 1
          this.transitionDuration = 0
          this.translate = -this.index * this.height
          this.lastItemTranslate = 0
        }
      }
    }
  },
  render (h) {
    const { classes, styles, onTransitionEnd, $slots, height } = this
    const content = h('div', {
      class: classes,
      style: styles,
      on: {
        transitionend: onTransitionEnd
      }
    }, $slots.default)
    return h('div', {
      class: 'rollnotice',
      style: { height: `${height}px` }
    }, [content])
  }
}
