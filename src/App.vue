<template>
  <div id="app">
    <Loading v-if='showLoading'  />

      <!-- 这里是需要keepalive的 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <!-- 这里不会被keepalive -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
</template>

<script>
import Loading from '@/components/Loading';
export default {
  name: 'app',
  components:{
    Loading
  },
  computed:{
    showLoading () {
      return this.$store.state.showLoading
    }
  },
  data () {
    return {
      transitionName:'slide-left',
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
}
</script>

<style>
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition: all .3s;
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    transition: all .3s;
  }
</style>
