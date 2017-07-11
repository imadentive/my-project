<template>
  <div id="wrapper-customer-list" class='wrapper' v-title data-title="搜索">
    <vDialog v-show='isDialogShow' @close='closeDialogShow' @comfirm='comfirm' tips='清空搜索记录？' confirmText='确定' />
    <div class='filter_fixed searchPage' :class="{searchPageWithNav:$store.state.navBarHide}">
      <NavBar title='搜索' />
      <form action="" @submit.prevent>
      <div class="com-search-bar-box-2 aui-border-b">

        <div class="com-left">
          <button type='submit' class="com-isearch" @click='to_search'></button>
          <!--<input type="search" placeholder='输入客户手机号码' v-model='search' v-focus @keyup.enter="to_search">-->
          <input type="search" placeholder='输入客户手机号码或姓名' v-model='search' @keyup.enter="to_search">
          <div class="idel" @click='delSearchWord' v-show='search'></div>
        </div>

        <div class="com-right" @click='$router.go(-1)'>
          取消
        </div>
      </div>
      </form>
    </div>
    <div class="history-search" :class="{searchPageWithNav:$store.state.navBarHide}" v-show='hasHistory'>
      <div class="history-search-title aui-border-b">
        搜索历史
        <div class="icon-trash"  @click="clearSearch" ></div>
      </div>
      <div class="history-search-list">
        <div class="history-search-list-item aui-border-b" v-for='item in items' @click='clickSearch(item)'>
          {{item}}
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
  import NavBar from '@/components/NavBar';
  import store from '../store';
  import {bus} from './utils';
  export default {
    mixins:[mixin],
    name: 'customer_list',
    data () {
      return {
        listData:[],
        page:1,
        order_by:0,
        status:-1,
        order:0,
        search:'',
        tag:'',
        isDialogShow:false,
        items:JSON.parse(localStorage.getItem('allSearchHistory'))||[],
      }
    },
    components:{
      SearchBar,vDialog,Empty,NavBar
    },
    methods:{

      changeShowSearch(){
        store.dispatch('changeSearchBar')
      },
      to_search(){

        if(!this.search){
          return false;
        }

        this.items.unshift(this.search);
        this.items = this.uniqueArr(this.items)

        localStorage.setItem('allSearchHistory',JSON.stringify(this.items));
        this.clickSearch(this.search);
        this.search='';
      },
      clickSearch(val){
        this.goTo('/SearchResult',{search:val})
        bus.$emit('loadMore')
      },
      closeDialogShow(){
        this.isDialogShow = false;
      },
      clearSearch(){
        this.isDialogShow = true;
      },
      comfirm(){
        this.isDialogShow = false;
        this.items = [];
        localStorage.setItem('allSearchHistory','[]')
        //store.dispatch('clearSearchHistory')//清除历史记录

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
      },
      delSearchWord(){//删除当前搜索框
        this.search=''
      },
      clearSearchHistory(){
        localStorage.setItem('allSearchHistory','[]')
      },
      uniqueArr(arr){
        var obj = {}
        var newArr = [];
        for(var i=0;i<arr.length;i++){
          obj[arr[i]] = obj[arr[i]]||[];
        }
        for(var attr in obj){
          newArr.push(attr);
        }
        return newArr;

      },

    },
    computed:{
      isShowDelIcon(){
        if(this.searchValue){
          return true;
        }
      },
      hasHistory(){
        return this.items.length;
      }

    },
    created(){

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .empty{
    padding-top: 4rem;
  }
</style>
