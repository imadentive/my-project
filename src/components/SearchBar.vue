<template>
  <div>
    <div class='com-search-bar-box'  v-show='!this.$store.state.isShowSearch' @click='changeShowSearch' >
      <div class="com-search-bar">
        <span>输入客户手机号码</span>
        <div class="com-isearch"></div>
      </div>
    </div>
    <div v-show='this.$store.state.isShowSearch'>
      <div class="com-search-bar-box-2 aui-border-b">
        <div class="com-left">
          <div class="com-isearch" @click='search'></div>
          <input type="text" placeholder='输入客户手机号码' v-model='searchValue' v-focus>
          <div class="idel" @click='delSearchWord' v-show='searchValue'></div>
        </div>

        <div class="com-right" @click='goBack'>
          取消
        </div>
      </div>
      <div class="history-search">
          <div class="history-search-title aui-border-b">
            搜索历史
            <div class="icon-trash"  @click="$emit('clearSearch')" v-show='hasHistory'></div>
          </div>
          <div class="history-search-list">
            <div class="history-search-list-item aui-border-b" v-for='item in items' @click='clickSearch(item)'>
              {{item}}
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store'
export default {
  name: 'search_bar',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchValue:'',
      items:JSON.parse(localStorage.getItem('allSearchHistory'))||[],
    }
  },
  methods:{
      changeShowSearch(){
        store.dispatch('changeSearchBar')
      },
      goBack(){
        this.$router.go(-1)
      },
      search(){
          if(!this.searchValue){
              return false;
          }
          this.searchValue='';
          this.items.unshift(this.searchValue);
          this.items = this.uniqueArr(this.items)
          localStorage.setItem('allSearchHistory',JSON.stringify(this.items));
          this.changeShowSearch();
          this.$emit('filterSearch',this.searchValue)
      },
    clickSearch(val){
      this.changeShowSearch();
      this.$emit('filterSearch',val)
    },
      delSearchWord(){
        this.searchValue=''
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

    }



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
  props:{
    clear: {
      type: Function,
      default: function () {

      }
    },
  },
  mounted(){
    console.log(this.$store.getters.searchHistory)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
