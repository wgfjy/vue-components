<template>
  <div class="demo-collapse">
    <nav-bar title="Collapse 折叠面板" />
    <div class="demo-collapse-box">
      <collapse accordion v-model="value">
        <collapse-panel title="静夜思">
          <span slot="extra">100分</span>
          <p>床前明月光，</p>
          <p>疑似地上霜。</p>
          <p>举头望明月，</p>
          <p>低头思故乡。</p>
        </collapse-panel>
        <collapse-panel>
          <span slot="title">早发白帝城</span>
          <p>朝辞白帝彩云间，</p>
          <p>千里江陵一日还。</p>
          <p>两岸猿声啼不住，</p>
          <p>轻舟已过万重山。</p>
        </collapse-panel>
      </collapse>
    </div>
  </div>
</template>

<script>
import NavBar from './common/header'
import { Collapse, CollapsePanel } from '@/components/collapse'
export default {
  name: 'collapse-demo',
  components: {
    NavBar,
    Collapse,
    CollapsePanel
  },
  data () {
    return {
      value: 0
    }
  }
}
</script>

<style lang="scss">
  .demo-collapse {
    &-box {
      padding: 20px;
    }
  }
</style>
