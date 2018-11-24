<template>
  <div class="demo-sendcode">
    <sendcode v-model="sendCode" @click="sendCode = !sendCode" />
  </div>
</template>
<script>
import Sendcode from '@/components/sendcode'
export default {
  name: 'SendcodeDemo',
  data () {
    return {
      sendCode: false
    }
  },
  components: {
    Sendcode
  }
}
</script>
