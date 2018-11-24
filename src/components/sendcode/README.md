# Sendcode 发送验证码

### 代码演示

``` html
<template>
  <div>
    <sendcode
      v-model="sendCodeStatus"
      @click="sendCodeStatus = !sendCodeStatus"
    />
  </div>
</template>
```

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| value | 倒计时状态（可以用v-model绑定） | Boolean | - | false |
| duration | 倒计时时长（秒） | [Number, String] | - | 60 |
| init | 初始化显示文本 | String | - | 获取短信验证码 |
| run | 运行时显示文本 | String | - | {%s}秒后重新获取 |
| reset | 运行结束后显示文本 | String | - | 重新获取验证码 |
| storage-key | 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续 | String | - | - |
