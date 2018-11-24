<template>
  <header class="demo-navbar">
    <div class="demo-navbar__left">
      <a href="javascript:;"
        v-if="back"
        @click.prevent="$router.go(-1)"
        class="demo-navbar__back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/>
        </svg>
      </a>
    </div>
    <h1 class="demo-navbar__title">{{title}}</h1>
    <div class="demo-navbar__right">
      <slot name="right" />
    </div>
  </header>
</template>

<script>
export default {
  name: 'demo-header',
  props: {
    title: String,
    back: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">

  .demo-navbar {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 10px;
    background-color: #26a2ff;
    color: #fff;
    &__left, &__right {
      flex: 1;
    }
    &__title {
      flex: 3;
      text-align: center;
      font-size: 16px;
      font-weight: normal;
    }
    &__right {
      text-align: right;
    }
    &__back {
      display: inline-block;
      svg {
        width: 24px;
        height: 24px;
        fill: #fff;
      }
    }
  }

</style>
