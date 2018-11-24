<template>
  <div class="demo-rollnotice">
    <nav-bar title="Rollnotice 滚动公告" />
    <div class="demo-rollnotice-box">
      <img src="//m.360buyimg.com/mobilecms/jfs/t14752/82/2574581467/6535/c8158ace/5aa8935bN94e31ff6.jpg.dpg" class="jd">
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
    </div>
    <p class="wraning">注：离开窗口几秒后再进入有bug！</p>
  </div>
</template>

<script>
import NavBar from './common/header'
import { Rollnotice, RollnoticeItem } from '@/components/rollnotice'
export default {
  name: 'rollnotice-demo',
  components: {
    NavBar,
    Rollnotice,
    RollnoticeItem
  }
}
</script>

<style lang="scss" scoped>
  .demo-rollnotice {
    &-box {
      display: flex;
      align-items: center;
      margin: 20px 15px;
      .jd {
        width: 72px;
      }
      a {
        display: block;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .red {
    color: #f23030;
    padding: 0 .3rem 0 .4rem
  }
  .wraning {
    padding: 0 15px;
    color: red;
  }
</style>
