<template>
  <div id="wrapper-home" class='wrapper' v-title data-title="商家通服务端">
    <vDialog v-show='isDialogShow' @close='close' @comfirm='logout'/>
    <div class="header">
      <div class="top-box">
        <div class="top">
          <span class='user-name'>{{data.admin_name}}</span>
          <div class="logout"  @click='close'>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="text1">潜在客户</div>
        <div class="num">{{data.count.all}}</div>
        <div class="text2">还有{{data.count.uncontact}}位客户等待您处理</div>
      </div>


    </div>
    <div class="main-content">
      <div class="search-bar" @click="goToSearch">
        <span>输入客户手机号码或姓名</span>
        <div class="isearch"></div>
      </div>
      <div class="menu-list">
        <div class="menu-list-item-box" @click="goTo('/CustomerList',{id:0})">
          <div class="menu-list-item aui-border-b press-active">
            <div class="col1">
              <div class="icon1"></div>
              <span>待服务</span>
            </div>
            <div class="col2">
              <span class="col2-number">{{data.count.uncontact}}</span>
              <div class="icon-arrow"></div>
            </div>
          </div>
        </div>
        <div class="menu-list-item-box" @click="goTo('/CustomerList',{id:1})">
          <div class="menu-list-item aui-border-b press-active">
            <div class="col1">
              <div class="icon2"></div>
              <span>服务中</span>
            </div>
            <div class="col2">
              <span class="col2-number">{{data.count.working}}</span>
              <div class="icon-arrow"></div>
            </div>
          </div>
        </div>
        <div class="menu-list-item-box" @click="goTo('/CustomerList',{id:2})">
          <div class="menu-list-item aui-border-b press-active">
            <div class="col1">
              <div class="icon3"></div>
              <span>已合作</span>
            </div>
            <div class="col2">
              <span class="col2-number">{{data.count.work}}</span>
              <div class="icon-arrow"></div>
            </div>
          </div>
        </div>
        <div class="menu-list-item-box" @click="goTo('/CustomerList',{id:3})">
          <div class="menu-list-item  press-active">
            <div class="col1">
              <div class="icon4"></div>
              <span>未合作</span>
            </div>
            <div class="col2">
              <span class="col2-number">{{data.count.refuse}}</span>
              <div class="icon-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      2017©商家通
    </div>
  </div>
</template>

<script>
  import mixin from '@/components/Mixin';
  import vDialog from '@/components/Dialog';
  import store from '../store'
  import {DEV_URL} from './utils';
export default {
  mixins:[mixin],
  name: 'home',
  data () {
    return {
      isDialogShow:false,
      data:{
        activity_name: "",
        admin_name: "",
        count:{
          all:0,
          refuse:0,
          uncontact:0,
          work:0,
          working:0
        }
      }
    }
  },
  methods:{
    close(){
      this.isDialogShow = !this.isDialogShow ;
    },
    logout(){
        var me = this;
      this.$http({
        method: 'get',
        url: DEV_URL+'default/logout',
        headers: {
          'contentType': 'application/x-www-form-urlencoded',
          'Authorization': 'ActivityToken '+ localStorage.getItem('token'),
        },
      })
        .then(function (res) {
          if(res.data.code==0){
              me.goTo('/');
              me.isDialogShow = !me.isDialogShow ;
              localStorage.removeItem('token');
          }else{
              alert(response.data.msg)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sure(){

    },
    goToSearch(){
      this.goTo('/SearchPage');
    }
  },
  components:{
    vDialog
  },
  mounted(){
      var me = this;
    this.postData('index/index',{},function (res) {
      if(res.data.code==0){
          console.log(res)
        me.data = res.data.data;
      }
    })

    console.log(this.$store.state.navBarHide)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
