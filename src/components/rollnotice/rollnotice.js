function whichTransitionEvent () {
  const el = document.createElement('fakeelement')
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (let k in transitions) {
    if (el.style[k] !== undefined) {
      return transitions[k]
    }
  }
}

function whichCss3Prop (prop) {
  const el = document.createElement('fakeelement')
  const obj = {
    'transition': {
      'transition': 'transition',
      'OTransition': '-o-transition',
      'MozTransition': '-moz-transition',
      'WebkitTransition': '-webkit-transition'
    },
    'transform': {
      'transform': 'transform',
      'MozTransform': '-moz-transform',
      'WebkitTransform': '-webkit-transform'
    }
  }

  const curProp = obj[prop]
  if (!prop || !curProp) return

  for (let p in curProp) {
    if (p in el.style) {
      return curProp[p]
    }
  }
}

export default {
  name: 'Rollnotice',
  props: {
    auto: {
      type: Number,
      default: 4000
    },
    speed: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 40
    },
    direction: {
      validator (value) {
        return ['up', 'down'].includes(value)
      },
      default: 'up'
    },
    align: {
      validator (value) {
        return ['left', 'center', 'right'].includes(value)
      },
      default: 'left'
    }
  },
  data () {
    return {
      ready: false,
      index: 0,
      rollItems: [],
      timer: null,
      reInitTimer: null
    }
  },
  computed: {
    rollCount () {
      return this.rollItems.length
    },
    noRoll () {
      return this.rollCount === 1
    },
    contentCls () {
      return [
        'rollnotice__content',
        {
          [`rollnotice__align-${this.align}`]: !!this.align
        }
      ]
    }
  },
  watch: {
    index () {
      this.$emit('on-change', this.index)
    }
  },
  mounted () {
    this.ready = true
    this.reInitItems()
    this.initTimer()
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer)
      this.reInitTimer = null
    }
  },
  methods: {
    createdItem () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitItems()
      }, 100)
    },
    destroyedItem () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitItems()
      }, 100)
    },
    initTimer () {
      if (this.auto > 0 && !this.timer && this.rollCount > 1) {
        this.timer = setInterval(() => {
          this.doAnimate()
        }, this.auto)
      }
    },
    reInitItems () {
      const children = this.$children
      const items = []
      children.forEach((child, index) => {
        items.push(child.$el)
        child.$el.classList.remove('is-active')
        if (index === this.index) {
          child.$el.classList.add('is-active')
        }
      })
      this.rollItems = items
    },
    doAnimate () {
      if (this.rollCount === 0) return
      const { index, rollCount, rollItems, speed, height, translate, direction } = this
      let prevItem = rollItems[index - 1]
      let currentItem = rollItems[index]
      let nextItem = rollItems[index + 1]
      if (!prevItem) {
        prevItem = rollItems[rollCount - 1]
      }
      if (!nextItem) {
        nextItem = rollItems[0]
      }

      [prevItem, nextItem].forEach(item => {
        // item.style.display = 'block'
        item.classList.add('visible')
        translate(item, item === prevItem ? -height : height)
      })

      const oldItem = rollItems[index]
      let newIndex
      if (direction === 'up') {
        newIndex = index < rollCount - 1 ? index + 1 : 0
      } else {
        newIndex = index > 0 ? index - 1 : rollCount - 1
      }

      const callback = () => {
        const newItem = rollItems[newIndex]
        oldItem.classList.remove('is-active')
        newItem.classList.add('is-active')
        this.index = newIndex
        // prevItem.style.display = ''
        // nextItem.style.display = ''
        prevItem.classList.remove('visible')
        nextItem.classList.remove('visible')
      }

      setTimeout(() => {
        if (direction === 'up') {
          translate(prevItem, -height * 2, speed, callback)
          translate(currentItem, -height, speed, callback)
          translate(nextItem, 0, speed)
        } else {
          translate(prevItem, 0, speed, callback)
          translate(currentItem, height, speed, callback)
          translate(nextItem, height * 2, speed)
        }
      }, 10)
    },
    translate (element, offset, speed, callback) {
      const transformProp = whichCss3Prop('transform')
      const transitionProp = whichCss3Prop('transition')
      if (speed) {
        if (transformProp && transitionProp) {
          element.style[transitionProp] = `${transformProp} ${speed}ms ease-in-out`
        }
        setTimeout(() => {
          if (transformProp) {
            element.style[transformProp] = `translate3d(0, ${offset}px, 0)`
          }
        }, 50)

        let called = false
        let transitionEndCallback = () => {
          if (called) return
          called = true
          if (transformProp) element.style[transformProp] = ''
          if (transitionProp) element.style[transitionProp] = ''
          callback && callback.apply(this, arguments)
        }
        const transitionEvent = whichTransitionEvent()
        transitionEvent && element.addEventListener(transitionEvent, transitionEndCallback)
        setTimeout(transitionEndCallback, speed + 100)
      } else {
        if (transitionProp) element.style[transitionProp] = ''
        if (transformProp) element.style[transformProp] = `translate3d(0, ${offset}px, 0)`
      }
    }
  },
  render (h) {
    const { height, $slots, contentCls } = this
    const content = h('div', {
      class: contentCls
    }, $slots.default)
    return h('div', {
      class: 'rollnotice',
      style: {
        height: `${height}px`
      }
    }, [content])
  }
}
