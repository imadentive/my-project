<template>
  <div class="hello">
    <button @click='showToast'>Toast</button>
    <button @click='showDialog'>Dialog</button>
    <Toast tips='这里是提示内容' v-show='isToastShow'/>
    <vDialog v-show='isDialogShow' @close='close'/>
  </div>
</template>

<script>
  import Toast from '@/components/Toast';
  import vDialog from '@/components/Dialog';
export default {
  name: 'hello',
  data () {
    return {
      isToastShow:false,
      isDialogShow:false,
    }
  },
  methods:{
      showToast(){
        this.isToastShow = true;
        var _this = this;
        setTimeout(function () {
          _this.isToastShow = false;
        },2000)
      },
      showDialog(){
        this.isDialogShow = true;
      },
      close(){
        this.isDialogShow = false;
      }
  },
  components:{
      Toast,vDialog
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
  height: 50px;

}
</style>
