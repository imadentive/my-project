<template>
  <div id="wrapper-customer-remark" class='wrapper' v-title data-title="客户流水">
    <NavBar title='客户流水' />
    <Toast :tips='toastTips' v-show='isToastShow'/>
    <div class="remark">
      <textarea name="" id="" cols="30" rows="10" placeholder='备注你最新服务情况...'
                v-model.trim='remark'
      >
      </textarea>
    </div>

    <div class="data-row" @click='gotochoose'>
      <div class="text">自定义</div>
      <input type="text" placeholder='输入五字以内客户自定义标签（选填）...' readonly :value='$route.query.tag'>
    </div>
    <div class="data-row">
      <div class="text">跟踪状态</div>
      <!--<select v-model="selected">-->
        <!--<option value ="1">服务中</option>-->
        <!--<option value="2">已合作</option>-->
        <!--<option value="3">未合作</option>-->
      <!--</select>-->
      <div class="select" @click='showShowFilter'>{{checkedText}}</div>
      <div class="icon-arrow"></div>
    </div>

    <div class="btn-submit press-active" @click='submit'>
      保存
    </div>
    <div class="com-filter-content-box" v-show='isShowFilter'>
      <div class="filter-content">

        <div class="filter-item aui-border-b">
          <input type="radio" v-model="selected" value='1' @click='hideShowFilter'>
          <i>服务中</i>
          <span></span>
        </div>
        <div class="filter-item aui-border-b" >
          <input type="radio" v-model="selected" value='2' @click='hideShowFilter'>
          <i>已合作</i>
          <span></span>
        </div>
        <div class="filter-item" @click=''>
          <input type="radio" v-model="selected" value='3' @click='hideShowFilter'>
          <i>未合作</i>
          <span></span>
        </div>
      </div>
      <!--<div class="filter-flex" @click='hideFilter'></div>-->
    </div>
  </div>
</template>

<script>
  import Empty from '@/components/Empty';
  import mixin from '@/components/Mixin';
  import Toast from '@/components/Toast';
  import NavBar from '@/components/NavBar';
export default {
  mixins:[mixin],
  name: 'customer_details',
  data () {
    return {
      selected: '',
      selected_texts:['服务中','已合作','未合作'],
      remark:'',
      toastTips:'',
      isToastShow:false,
      isShowFilter:false,
      timer:0,
    }
  },
  computed:{
    checkedText(){
        var index = this.selected-0-1;
        return this.selected_texts[index]
    }
  },
  methods:{
      submit(){
        var me = this;
          if(this.selected==''){
             return this.showToast('请选择跟踪状态')
          }

        this.postData('index/add-log',{id:this.$route.query.id,tag:this.$route.query.tag,tag_id:this.$route.query.tag_id,remark:this.remark,status:this.selected},function (res) {
            console.log(res)
            if(res.data.code==0){
              me.showToast(res.data.msg)
              me.selected='';
              me.remark='';
//              me.goTo('/CustomerDetails',{id:me.$route.query.id})
              me.$router.go(-1)
            }else{
              me.showToast(res.data.msg)
            }
        })
      },
    showToast(tips){
      this.isToastShow = true;
      this.toastTips = tips;
      var _this = this;
      setTimeout(function () {
        _this.isToastShow = false;
      },2000)
    },

    gotochoose(){
      this.$router.replace({ path: '/ChooseRemark', query: {id:this.$route.query.id}})
    },
//    gotochoose(){
//      this.$router.replace({ path: '/ChooseRemark', query: {id:this.$route.query.id}})
//    }
    hideShowFilter(e){
//        console.log(e.target)
//       console.log( e.target.checked)
//      e.target.checked= true;
      clearTimeout(this.timer);
      var me = this;
      this.timer = setTimeout(function () {
        me.isShowFilter = false;
      },100)

    },
    showShowFilter(){
      this.isShowFilter = true;
    }
  },
  components:{
    Empty,Toast,NavBar
  },
  mounted(){

  },
//  props: ['timer']

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
