<template>
  <div class="com-nav-bar" v-if='$store.state.navBarHide'>
    <div class="nav-side nav-left" @click='goBack'>
      <div class="icon_back"></div>
      <slot name="left"></slot>
    </div>
    <div class="nav-title">{{title}}</div>
    <div class="nav-side nav-right" @click='goHome'>
      <div class="icon_home"></div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    showLeft:false,
    title: {
      type: String,
      default:'标题'
    },
  },
  methods:{
    goHome(){
      this.$router.push({ path: '/Home' })
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
