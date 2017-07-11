<template>
  <div id="wrapper-customer-list" class='wrapper' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-title data-title="客户列表">
    <vDialog v-show='isDialogShow' @close='closeDialogShow' @comfirm='comfirm' tips='确定清空搜索记录？' confirmText='确定' />
    <div class='filter_fixed'>
      <NavBar title='客户列表' />
      <div class='com-search-bar-box'  @click='goToSearch' >
        <div class="com-search-bar">
          <span>输入客户手机号码或姓名</span>
          <div class="com-isearch"></div>
        </div>
      </div>
      <div class='filter-bar aui-border-b'>
        <div class='filter-bar-item' @click='changeFilter'>{{this.statusText}}<span class='icon icon-down'></span></div>
        <div class='filter-bar-item' :class='{font:!isActive1}' @click='filterBy(1)'>按分配时间<span class='icon icon-sort' :class="{icon_sort_active9: order&&isActive1, icon_sort_active: !order&&isActive1}"></span></div>
        <div class='filter-bar-item' :class='{font:!isActive2}' @click='filterBy(2)'>按更新时间<span class='icon icon-sort' :class="{icon_sort_active9: order&&isActive2, icon_sort_active: !order&&isActive2}"></span></div>
        <div class='filter-bar-item the-tag aui-border-l' @click='changeActionSheet'>标签</div>
      </div>
    </div>
    <!--默认 -1 全部，0 待服务,1 服务中,2 已合作3 未合作-->
    <div class="filter-content-box" v-show='isShowFilter' :class="{searchPageWithNav:$store.state.navBarHide}">
      <div class="filter-content">
        <div class="filter-item aui-border-b" @click='changeFilter(-1,"全部")'>
          <input type="radio" name="aaa">
          <i>全部</i>
          <span></span>
        </div>
        <div class="filter-item aui-border-b" checked @click='changeFilter(0,"待服务")'>
          <input type="radio" name="aaa">
          <i>待服务</i>
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(1,"服务中")'>
          <input type="radio" name="aaa">
          <i>服务中</i>
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(2,"已合作")'>
          <input type="radio" name="aaa">
          <i>已合作</i>
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(3,"未合作")'>
          <input type="radio" name="aaa">
          <i>未合作</i>
          <span></span>
        </div>
      </div>
      <div class="filter-flex" @click='hideFilter'></div>
    </div>
    <div class="list" v-if='listData.length' :class="{searchPageWithNav2:$store.state.navBarHide}">
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
    <Empty :title='statusText' v-else  class='empty' />
    <div class="actionSheet" :class='{active:isShowTag}'>
      <div class="mask" @click='changeActionSheet'>
      </div>
      <div class="content right">
          <div class="title">自定义标签</div>
        <div class="checkboxs">
          <label v-for='tag in tagListData' @click='filterTag(tag.name)'>
            <input type="radio" name="aaa" >
            <span>{{tag.name}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/components/Mixin';
  import SearchBar from '@/components/SearchBar';
  import vDialog from '@/components/Dialog';
  import Empty from '@/components/Empty';
  import store from '../store';
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
      search:'',
      tag:'',
      isDialogShow:false,
      isActive1:false,
      isActive2:false,
      isShowTag:false,
      tagListData:[],
      loadMoreText:'上拉加载更多',
      showLoadMore:true,

    }
  },
  components:{
    SearchBar,vDialog,Empty,NavBar
  },
  methods:{
      hideFilter(){
        this.isShowFilter=false;
      },
    changeFilter(status,statusText){
      this.isShowFilter = !this.isShowFilter;
      if(arguments.length==2){
        this.status = status;
        this.statusText = statusText;
        this.page=1;
        this.search='';
        this.tag = '';
        this.listData=[];
        this.loadMoreText = '上拉加载更多';
        this.loadMore()
      }
    },
    filterBy(a){
      if(a==1){
        this.isActive1=true;
        this.isActive2=false;
        this.order_by=1;
      }
      if(a==2){
        this.isActive2=true;
        this.isActive1=false;
        this.order_by=2;
      }

      if(this.order){
        this.order=0
      }else{
        this.order=1
      }

      this.listData=[];
      this.loadMoreText = '上拉加载更多';
      this.page=1;


      this.loadMore()
    },
    loadMore(){
//      0默认 1分配时间 2更新时间
      var me = this;
      this.postData('index/page-order',{
        order:me.order,
        order_by:me.order_by,
        page:me.page,
        search:me.search,
        tag:me.tag,
        status:me.status,
      },function (res) {

        if(res.data.code==0){

            if(res.data.data.data.length){
              me.listData = me.listData.concat(res.data.data.data);
              me.page++;
            }else{
              me.loadMoreText = '没有更多了'
            }

          //console.log(me.listData,me.page)
        }
//        else if(res.data.code==-101){
//          alert(res.data.msg);
//          me.goTo('/')
//        }else{
//          alert(res.data.msg)
//        }

      })
    },
    closeDialogShow(){
      this.isDialogShow = false;
    },
    clearSearch(){
      this.isDialogShow = true;
    },
    comfirm(){
      this.isDialogShow = false;
      localStorage.setItem('allSearchHistory','[]')
      //store.dispatch('clearSearchHistory')//清除历史记录

    },
    changeActionSheet(){
        this.isShowTag = !this.isShowTag;
    },
    filterTag(tag){
      this.changeActionSheet();
      this.tag = tag;
      this.listData=[];
      this.loadMoreText = '上拉加载更多';
      this.page=1;
      this.loadMore();
    },

    goToSearch(){
      this.goTo('/SearchPage');
      store.dispatch('changeSearchBar')
    }
  },

  mounted(){
      var me = this;
    this.postData('index/tag',{},function (res) {
      if(res.data.code==0){
        me.tagListData = res.data.data.tags;
      }
    });

    if(this.$route.query.id==0){
//      默认 -1 全部，0 待服务,1 服务中,2 已合作3 未合作
      this.statusText = '待服务';
    }
    if(this.$route.query.id==1){
      this.statusText = '服务中';
    }
    if(this.$route.query.id==2){
      this.statusText = '已合作';
    }
    if(this.$route.query.id==3){
      this.statusText = '未合作';
    }

    this.status = this.$route.query.id;

//    this.page=1;
//    this.order=0;
//    this.order_by=0;
//    this.search='';
//    this.tag = '';
//    this.listData=[];
//    this.loadMoreText = '上拉加载更多';
//    this.loadMore()

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.empty{
  padding-top: 5rem;
}
</style>
