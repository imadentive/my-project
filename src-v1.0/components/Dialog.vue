<template>
  <div class="dialog-box">
    <div class="com-dialog">
      <div class="title aui-border-b">{{tips}}</div>
      <div class="btns">
        <div class="btn aui-border-r press-active" @click="$emit('comfirm')" >{{confirmText}}</div>
        <div class="btn press-active" @click="$emit('close')">{{cancelText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props:{
     tips:{
       default: '确定退出此次编辑？'
     },
    confirmText:{
      default: '退出'
    },
    cancelText:{
      default: '取消'
    },
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
