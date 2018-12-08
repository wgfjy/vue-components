# Rollnotice 滚动公告

### 代码演示

``` html
<rollnotice>
  <rollnotice-item>
    <a href="javascript:;"><span class="red">HOT</span>电信、联通相继公布5G资费：5毛10G，移动迟迟不表态</a>
  </rollnotice-item>
  <rollnotice-item>
    <a href="javascript:;"><span class="red">推荐</span>为让路麒麟980，华为麒麟970大放血，买旧不买新没错</a>
  </rollnotice-item>
  <rollnotice-item>
    <a href="javascript:;"><span class="red">最新</span>屏下指纹要被淘汰，更强的指纹识别要来了！</a>
  </rollnotice-item>
  <rollnotice-item>
    <a href="javascript:;"><span class="red">热门</span>惊喜！6S可免费换iPhone XR！果粉：有这好事？</a>
  </rollnotice-item>
</rollnotice>
```

### Rollnotice API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| height | 高度（px） | Number | - | 40 |
| speed | 切换速度（毫秒） | Number | - | 300 |
| auto | 自动播放时间（毫秒） | Number | - | 4000 |
| align | 对齐方式 | String | left, center, right | left |
| direction | 滚动方向 | String | up, down | up |

### Rollnotice Slots

| name | 描述 |
| ---- | ---- |
| - | 内容 |

### Rollnotice Event

| 名称 | 返回值 |
| ---- | ---- |
| on-change | index: Number |

### RollnoticeItem Slots

| name | 描述 |
| ---- | ---- |
| - | 内容 |