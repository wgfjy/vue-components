<template>
  <div class="collapse-panel" :class="{'collapse-panel--active': isActive}">
    <div class="collapse-panel__header"
      @click="toggle"
    >
      <div class="collapse-panel__icon">
        <slot name="icon" />
      </div>
      <div class="collapse-panel__title">
        <template v-if="title">
          {{title}}
        </template>
        <template v-else>
          <slot name="title" />
        </template>
      </div>
      <div class="collapse-panel__extra">
        <template v-if="extra">
          {{extra}}
        </template>
        <template v-else>
          <slot name="extra" />
        </template>
      </div>
      <div class="collapse-panel__arrow" v-if="!hideArrow">
        <slot name="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" :style="{fill: arrowColor}">
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/>
          </svg>
        </slot>
      </div>
    </div>
    <collapse-transition>
      <div class="collapse-panel__transition" v-show="isActive">
        <div class="collapse-panel__content">
          <slot />
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from './collapse-transition'
export default {
  name: 'CollapsePanel',
  components: {
    CollapseTransition
  },
  props: {
    name: String,
    title: String,
    extra: String,
    hideArrow: Boolean,
    arrowColor: {
      type: String,
      default: '#333'
    }
  },
  data () {
    return {
      index: 0, // use index for default when name is null
      isActive: false
    }
  },
  computed: {
    panelClasses () {
      return [
        'collapse-panel',
        {
          'collapse-panel--active': this.isActive
        }
      ]
    }
  },
  methods: {
    toggle () {
      this.$parent.toggle({
        name: this.name || this.index,
        isActive: this.isActive
      })
    }
  }
}
</script>
