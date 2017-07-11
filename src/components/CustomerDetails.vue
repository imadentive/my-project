<template>
  <div id="wrapper-customer-details" class='wrapper' v-title data-title="客户跟踪">
    <NavBar title='客户跟踪' />
    <div class="header-bar">
      <div class="row1">
        <div class="name">{{data.name}}<span>{{data.mobile}}</span></div>
        <div class="state">{{data.status_name}}</div>
      </div>
      <div class="row2" v-if='data.extra'>
        {{data.extra}}
      </div>
    </div>
    <div class="details" v-if='hasData'>
      <ul>
        <li v-for='action in actions'>
          <div class="li-box aui-border-b">
            <div class="row1">
              <div class="state">{{action.status_name}}</div>
            </div>
            <div class="row2">{{action.remark}}</div>
            <div class="row3">{{action.created_at}}</div>
          </div>
        </li>
      </ul>
    </div>
    <Empty title='跟踪服务' v-else/>
    <div class="fixed-btns">
      <a :href="mobile" class="btn-tel">拨打电话</a>
      <a @click='goTo("/CustomerRemark",{id:$route.query.id})' class="btn-details">跟踪服务</a>
    </div>
  </div>
</template>

<script>
  import Empty from '@/components/Empty';
  import mixin from '@/components/Mixin';
  import NavBar from '@/components/NavBar';
export default {
  mixins:[mixin],
  name: 'customer_details',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data:{
        extra:'',
        id:66,
        mobile:'',
        name:'',
        shop_status:'',
        status_name:'""',
      },
      hasData:1,
      actions:[]
    }
  },
  components:{
    Empty,NavBar
  },
  computed:{
     mobile(){
         return 'tel:'+this.data.mobile;
     }
  },
  mounted(){
    var id = this.$route.query.id;
    var me = this;
    this.postData('index/order-detail',{id:id},function (res) {
      if(res.data.code==0){
          me.data = res.data.data.customer_order;
          me.hasData = res.data.data.actions.length;
          me.actions = res.data.data.actions
      }else{
          aler(res.data.msg)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
