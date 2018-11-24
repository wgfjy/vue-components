<template>
  <div>
    <router-link :to="{name: 'sendcode'}">Sendcode 发送验证码</router-link>
    <router-link :to="{name: 'rollNotice'}">Rollnotice 滚动公告</router-link>
  </div>
</template>

<script>
export default {
  name: 'IndexList'
}
</script>
