<template>
  <div id="wrapper-customer-remark" class='wrapper' v-title data-title="客户流水自定义标签">
    <Toast :tips='toastTips' v-show='isToastShow'/>
    <div class="remark-small">
      <input name="" id="" maxlength='5' placeholder='输入五字以内客户自定义标签（选填）...'
                v-model.trim='remark'  @keyup='doAjax' @keyup.enter="hello"
      />
    </div>
    <ul class="ajaxList" v-show='items.length'>
      <li @click='chooseIt(item.name)' v-for='item in items' class='aui-border-b'>{{item.name}}</li>
    </ul>
    <div class="content">
      <div class="title">
        选择已有标签
      </div>
      <div class="checkboxs">
        <label v-for='tag in tags' @click='doRadio(tag.name,[tag.name,tag.id])'>
          <!--<input type="radio" :checked='tag.checked' v-model='ctag' name='bb' :value='[tag.name,tag.id]' :id='tag.name' >-->
          <span :class="{active:tag.name==nowName}">{{tag.name}}</span>
        </label>
      </div>
    </div>
    <div class="btn-submit press-active" @click='goback'>
      确定
    </div>
  </div>
</template>

<script>
  import Empty from '@/components/Empty';
  import mixin from '@/components/Mixin';
  import Toast from '@/components/Toast';
export default {
  mixins:[mixin],
  name: 'customer_details',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      remark:'',
      tags:[],
      items:[],
      ctag:[],
      isToastShow:false,
      toastTips:'',
      nowName:''
    }
  },
  components:{
    Toast,Empty
  },
  methods:{
    doAjax(a){
        var me = this;
        me.nowName = a.target.value;
        this.postData('index/tag',{search:a.target.value},function (res) {
          if(res.data.code==0){
            me.items = res.data.data.tags;
          }
        })
    },
    doRadio(val,arr){
        this.remark = val;
        this.ctag = arr;
        this.nowName = val;
    },
    chooseIt(val){

        this.remark = val;
        this.items = [];
        this.nowName = val;
//
//        this.tags.map(function (e,i) {
//            //console.log(e)
//            if(val == e.name){
//
//            }
//        })
      ;
    },
    goback(){
//        console.log(this.$data)



      if(this.remark){
        return this.goToWhere('/CustomerRemark',{id:this.$route.query.id,tag:this.remark})
      }

      if(this.ctag.length){
         return this.goToWhere('/CustomerRemark',{id:this.$route.query.id,tag:this.ctag[0],tag_id:this.ctag[1]})
      }



      return this.goToWhere('/CustomerRemark',{id:this.$route.query.id})


//
    },
    showToast(tips){
      this.isToastShow = true;
      this.toastTips = tips;
      var _this = this;
      setTimeout(function () {
        _this.isToastShow = false;
      },2000)
    },
    hello(){
      //console.log( this.$el.querySelector('#已联系').style.display='none')
    }
  },
  watch: {
    // 深度 watcher
//    tags: {
//      handler: function (val, oldVal) {
//          console.log(val,'old：',oldVal)
//      },
//      deep: true
//    }
  },
  mounted(){
    var me = this;
    this.postData('index/tag',{},function (res) {
      if(res.data.code==0){
        me.tags = res.data.data.tags;
          /*me.tags = [
            {name:'hello',id:44,checked:false},
            {name:'world',id:44,checked:true},
          ]*/
      }

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
