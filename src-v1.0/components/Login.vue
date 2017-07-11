<template>
  <div id="wrapper-login"  class='wrapper' v-title data-title="登录">
    <NavBar title='登录' />
    <Toast :tips='toastTips' v-show='isToastShow'/>
    <div class="form">
      <div class="row aui-border-b">
        <input type="text" placeholder='请输入账号' v-model='username' v-focus id='username'>
      </div>
      <div class="row aui-border-b">
        <input type="password" placeholder='请输入密码' v-model='password' id='password'>
      </div>
      <div class="btn press-active" @click='login'>
         登录
      </div>
    </div>
    <div class="footer">
      2017©商家通
    </div>
  </div>
</template>

<script>
  import mixin from '@/components/Mixin';
  import Toast from '@/components/Toast';
  import NavBar from '@/components/NavBar';
  import Api from '../api';
  import {DEV_URL} from './utils';
  var qs = require('qs');
export default {
  mixins:[mixin],
  name: 'login',
  data () {
    return {
      isToastShow:false,
      username:'',
      password:'',
      toastTips:''
    }
  },
  methods:{
    showToast(tips){
      this.isToastShow = true;
      this.toastTips = tips;
      var _this = this;
      setTimeout(function () {
        _this.isToastShow = false;
      },2000)
    },
    login(){

        if(!this.username){
            this.$el.querySelector('#username').focus();
            return this.showToast('请填写账号');

        }
        if(!this.password){
          this.$el.querySelector('#password').focus();
          return this.showToast('请填写密码');
        }

      var data = {"CcbAdminLoginForm[password]":this.password,"CcbAdminLoginForm[username]":this.username}
      var me = this;
      me.$http({
        method: 'post',
        url: DEV_URL+'default/login/',
        data: qs.stringify(data),
        headers: {
          'contentType': 'application/x-www-form-urlencoded'
        },
      })
        .then(function (response) {
          console.log(response);
          if(response.data.code==0){
              localStorage.setItem('token',response.data.data.token)
            me.$router.push({ path: '/Home' })
          }else{
            return me.showToast(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },
  components:{
    Toast,NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
