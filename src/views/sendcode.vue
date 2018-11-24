<template>
  <div class="demo-sendcode">
    <nav-bar title="Sendcode 发送验证码" />
    <div class="demo-sendcode-box">
      <sendcode v-model="sendCode" @click="sendCode = !sendCode" />
    </div>
  </div>
</template>
<script>
import NavBar from './common/header'
import Sendcode from '@/components/sendcode'
export default {
  name: 'SendcodeDemo',
  data () {
    return {
      sendCode: false
    }
  },
  components: {
    NavBar,
    Sendcode
  }
}
</script>

<style lang="scss">

  .demo-sendcode-box {
    padding: 20px;
    .sendcode {
      dispaly: block;
      width: 100%;
      display: block;
      height: 40px;
      background-color: #26a2ff;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;
      &--disabled {
        opacity: .6;
      }
    }
  }

</style>
