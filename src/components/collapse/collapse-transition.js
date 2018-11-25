
function setInlineStyle (el, styles) {
  for (let p in styles) {
    el.style[p] = styles[p]
  }
}

function setCustomData (el, data) {
  for (let p in data) {
    el.customCollapseTransitionData[p] = data[p]
  }
}

const TRANSITION_DURATION = 200

const TRANSITION_VALUE = `
  height ${TRANSITION_DURATION}ms ease-in-out,
  padding-top ${TRANSITION_DURATION}ms ease-in-out,
  padding-bottom ${TRANSITION_DURATION}ms
`

const Transition = {
  beforeEnter (el) {
    el.style.transition = TRANSITION_VALUE
    if (!el.customCollapseTransitionData) el.customCollapseTransitionData = {}

    const { paddingTop, paddingBottom } = el.style
    setCustomData(el, {
      oldPaddingTop: paddingTop,
      oldPaddingBottom: paddingBottom
    })

    setInlineStyle(el, {
      height: 0,
      paddingTop: 0,
      paddingBottom: 0
    })
  },

  enter (el) {
    el.customCollapseTransitionData.oldOverflow = el.style.overflow

    const { oldPaddingTop, oldPaddingBottom } = el.customCollapseTransitionData
    setInlineStyle(el, {
      height: el.scrollHeight !== 0 ? `${el.scrollHeight}px` : '',
      paddingTop: oldPaddingTop,
      paddingBottom: oldPaddingBottom,
      overflow: 'hidden'
    })
  },

  afterEnter (el) {
    el.style.transition = ''
    const { oldOverflow } = el.customCollapseTransitionData
    setInlineStyle(el, {
      height: '',
      overflow: oldOverflow
    })
  },

  beforeLeave (el) {
    if (!el.customCollapseTransitionData) el.customCollapseTransitionData = {}

    const { paddingTop, paddingBottom, overflow } = el.style
    setCustomData(el, {
      oldPaddingTop: paddingTop,
      oldPaddingBottom: paddingBottom,
      oldOverflow: overflow
    })

    setInlineStyle(el, {
      height: `${el.scrollHeight}px`,
      overflow: 'hidden'
    })
  },

  leave (el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = TRANSITION_VALUE
      setInlineStyle(el, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0
      })
    }
  },

  afterLeave (el) {
    el.style.transition = ''
    const { oldOverflow, oldPaddingBottom, oldPaddingTop } = el.customCollapseTransitionData
    setInlineStyle(el, {
      height: '',
      overflow: oldOverflow,
      paddingTop: oldPaddingTop,
      paddingBottom: oldPaddingBottom
    })
  }
}

export default {
  name: 'collapse-transition',
  functional: true,
  render (h, { children }) {
    const data = {
      on: Transition
    }

    return h('transition', data, children)
  }
}
