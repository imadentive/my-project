<template>
  <div id="wrapper-customer-list" class='wrapper' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-title data-title="搜索">
    <div class='filter_fixed searchPage'>
      <NavBar title='搜索' />
      <div class='com-search-bar-box'   @click='goToSearch'  >
        <div class="com-search-bar">
          <span>输入客户手机号码</span>
          <div class="com-isearch"></div>
        </div>
      </div>
    </div>
    <div class="list searchPage" :class="{searchPageWithNav:$store.state.navBarHide}" v-if='listData.length'>
      <div class="item" @click='goTo("/CustomerDetails",{id:item.id})' v-for="item in listData">
        <div class="row1">
          <div class="name">{{item.name}} {{item.mobile}}</div>
          <div class="state success" v-if='item.class_name=="success"'>{{item.status_name}}</div>
          <div class="state danger" v-if='item.class_name=="danger"'>{{item.status_name}}</div>
          <div class="state default" v-if='item.class_name=="default"'>{{item.status_name}}</div>
          <div class="state warning" v-if='item.class_name=="warning"'>{{item.status_name}}</div>
        </div>
        <div class="row2">
          {{item.extra}}
        </div>
        <div class="row3">
          {{item.time}}
        </div>
      </div>
      <div class="loadMore">{{loadMoreText}}</div>
    </div>
    <Empty :title='search' :other=other v-else  class='empty' />
  </div>
</template>

<script>
  import mixin from '@/components/Mixin';
  import SearchBar from '@/components/SearchBar';
  import vDialog from '@/components/Dialog';
  import Empty from '@/components/Empty';
  import store from '../store';
  import {bus} from './utils';
  import NavBar from '@/components/NavBar';
  export default {
    mixins:[mixin],
    name: 'customer_list',
    data () {
      return {
        isShowFilter: false,
        listData:[],
        busy: false,
        page:1,
        order_by:0,
        status:-1,
        statusText:'全部',
        order:0,
        search:this.$route.query.search,
        tag:'',
        isDialogShow:false,
        isActive1:false,
        isActive2:false,
        isShowTag:false,
        tagListData:[],
        loadMoreText:'上拉加载更多',
        other:true,

      }
    },
    components:{
      SearchBar,vDialog,Empty,NavBar
    },
    methods:{
      loadMore(){
//      0默认 1分配时间 2更新时间
        var me = this;
        this.postData('index/page-order',{
          order:me.order,
          order_by:me.order_by,
          page:me.page,
          search:this.$route.query.search,
          tag:me.tag,
          status:me.status,
        },function (res) {


          if(res.data.data.data.length){
            me.listData = me.listData.concat(res.data.data.data);
            me.page++;
          }else{
            me.loadMoreText = '没有更多了'
          }

        })
      },

      goToSearch(){
        this.goTo('/SearchPage');
      }
    },
    created(){
        var me = this;
//      me.page=1;
//      me.listData=[];
//      me.loadMore();
      bus.$on('loadMore', function () {
        me.page=1;
        me.listData=[];
        me.loadMore();
      })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .empty{
    padding-top: 4rem;
  }
</style>
