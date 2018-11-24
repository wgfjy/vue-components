export default {
  name: 'Sendcode',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    value: Boolean,
    duration: {
      validator (val) {
        return /^\d*$/.test(val)
      },
      default: 120
    },
    init: {
      type: String,
      default: '获取短信验证码'
    },
    run: {
      type: String,
      default: '{%s}秒后重新获取'
    },
    reset: {
      type: String,
      default: '重新获取验证码'
    },
    storageKey: String
  },
  data () {
    return {
      tmpStr: this.init,
      timer: null,
      start: false,
      lastSecond: 0
    }
  },
  computed: {
    classes () {
      return [
        'sendcode',
        {
          'sendcode--disabled': this.start
        }
      ]
    }
  },
  watch: {
    value (bool) {
      this.start = bool
      if (!bool) {
        // window.clearInterval(this.timer)
        // this.tmpStr = this.init
        if (this.storageKey) {
          window.sessionStorage.removeItem(this.storageKey)
          this.lastSecond = 0
        }
      } else {
        this.countingDown()
      }
    }
  },
  created () {
    const lastSecond = ~~((window.sessionStorage.getItem(this.storageKey) - Date.now()) / 1000)
    if (lastSecond > 0 && this.storageKey) {
      this.$emit('input', true)
      this.tmpStr = this.getStr(lastSecond)
      this.lastSecond = lastSecond
    }
  },
  beforeDestroy () {
    !this.storageKey && this.timeout()
  },
  methods: {
    handleClick () {
      if (!this.start) this.$emit('click')
    },
    countingDown () {
      const lastSecond = this.lastSecond
      let second = lastSecond || this.duration
      if (this.storageKey) {
        const runSecond = Date.now() + second * 1000
        window.sessionStorage.setItem(this.storageKey, runSecond)
      }
      if (!lastSecond) {
        this.tmpStr = this.getStr(second)
      }
      this.timer = setInterval(() => {
        second--
        this.tmpStr = this.getStr(second)
        second <= 0 && this.timeout()
      }, 1000)
    },
    timeout () {
      this.tmpStr = this.reset
      this.start = false
      this.$emit('input', false)
      window.clearInterval(this.timer)
    },
    getStr (second) {
      return this.run.replace(/\{([^{]*?)%s(.*?)\}/g, second)
    }
  },
  render (h) {
    const { tag, classes, handleClick, tmpStr } = this
    return h(tag, {
      class: classes,
      on: {
        click: handleClick
      }
    }, tmpStr)
  }
}
