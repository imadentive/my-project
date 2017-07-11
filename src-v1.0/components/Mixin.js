var qs = require('qs');
import {DEV_URL} from './utils';
export default {
  methods:{
    postData(url,data,fn){
      this.$http({
        method: 'post',
        url: DEV_URL+url,
        data: qs.stringify(data),
        headers: {
          'contentType': 'application/x-www-form-urlencoded',
          'Authorization': 'ActivityToken '+ localStorage.getItem('token'),
        },
      })
        .then(function (response) {
          //console.log(response);
          fn(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goTo(router,query){
      //this.$router.push({ path: router })
      // 带查询参数，变成 /register?plan=private
      this.$router.push({ path: router, query: query})
    },
    goToWhere(router,query){
      //this.$router.push({ path: router })
      // 带查询参数，变成 /register?plan=private
      this.$router.replace({ path: router, query: query})
    },
    goTo2(name,params){
      //this.$router.push({ path: router })
      // 带查询参数，变成 /register?plan=private
      //this.$router.push({ path: router, params: params})
      this.$router.push({ name: name, params: params})
    },
    checkLogin(fn){
      if(!localStorage.getItem('token')){
        fn()
      }

    }
  },
  created(){
    var me = this;
    if(this.$route.name=='Login'&&localStorage.getItem('token')){
      return me.goTo('/Home',{});
    }
    this.checkLogin(function () {
      alert('请重新登录');
      me.goTo('/',{})
    })
    // window.onbeforeunload=function(){
    //   localStorage.removeItem('token')
    // };
  }
}

