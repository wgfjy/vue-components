<template>
  <div>
    <ul>
      <li><router-link :to="{name: 'sendcode'}">Sendcode 发送验证码</router-link></li>
      <li><router-link :to="{name: 'rollnotice'}">Rollnotice 滚动公告</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IndexList'
}
</script>
