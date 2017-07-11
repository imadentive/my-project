<template>
  <div id="wrapper-customer-list" class='wrapper' v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <vDialog v-show='isDialogShow' @close='closeDialogShow' @comfirm='comfirm' tips='确定清空搜索记录？' confirmText='确定' />
    <div class='filter_fixed'>
      <SearchBar  @clearSearch='clearSearch' @filterSearch='filterSearch'/>
      <div class='filter-bar aui-border-b'>
        <div class='filter-bar-item' @click='changeFilter'>{{this.statusText}}<span class='icon icon-down'></span></div>
        <div class='filter-bar-item' @click='filterBy(1)'>按分配时间<span class='icon icon-sort' :class="{icon_sort_active: isActive1 }"></span></div>
        <div class='filter-bar-item' @click='filterBy(2)'>按更新时间<span class='icon icon-sort' :class="{icon_sort_active:isActive2 }"></span></div>
        <div class='filter-bar-item' @click='changeActionSheet'>标签</div>
      </div>
    </div>
    <!--默认 -1 全部，0 待服务,1 服务中,2 已合作3 未合作-->
    <div class="filter-content-box" v-show='isShowFilter'>
      <div class="filter-content">
        <div class="filter-item aui-border-b" @click='changeFilter(0,"待服务")'>
          <input type="radio" name="aaa">
          待服务
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(1,"服务中")'>
          <input type="radio" name="aaa">
          服务中
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(2,"已合作")'>
          <input type="radio" name="aaa">
          已合作
          <span></span>
        </div>
        <div class="filter-item aui-border-b" @click='changeFilter(3,"未合作")'>
          <input type="radio" name="aaa">
          未合作
          <span></span>
        </div>
      </div>
    </div>
    <div class="list" v-if='listData.length'>
      <div class="item" @click='goTo("/CustomerDetails",{id:item.id})' v-for="item in listData">
        <div class="row1">
          <div class="name">{{item.name}} {{item.mobile}}</div>
          <div class="state">{{item.status_name}}</div>
        </div>
        <div class="row2">
          {{item.extra}}
        </div>
        <div class="row3">
          {{item.time}}
        </div>
      </div>
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
      tagListData:[]

    }
  },
  components:{
    SearchBar,vDialog,Empty
  },
  methods:{
    changeFilter(status,statusText){
      this.isShowFilter = !this.isShowFilter;
      if(arguments.length==2){
        this.status = status;
        this.statusText = statusText;
        this.page=1;
        this.search='';
        this.listData=[];
        this.loadMore()
      }
    },
    filterBy(a){
      if(a==1){
        this.isActive1=true;
        this.order_by=1;
      }
      if(a==2){
        this.isActive2=true;
        this.order_by=2;
      }

      if(this.order){
        this.order=0
      }else{
        this.order=1
      }

      this.listData=[];
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
          me.listData = me.listData.concat(res.data.data.data);
          me.page++;
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
      this.page=1;
      this.loadMore();
    },
    filterSearch(val){
      this.order=0;
        this.order_by=0;
        this.page=1;
        this.search=val;
        this.tag='';
        this.status=-1;
      this.listData=[];
      this.loadMore();
    }
  },
  mounted(){
      var me = this;
    this.postData('index/tag',{},function (res) {
      if(res.data.code==0){
        me.tagListData = res.data.data.tags;
      }
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
