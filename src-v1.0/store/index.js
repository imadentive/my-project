import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import shop from '../api/shop'
Vue.use(Vuex)

// initial state
const state = {
  all: [],
  showLoading:false,
  isShowSearch:false,
  searchHistory:localStorage.getItem('allSearchHistory')||'[]',
  chooseRemarkRadios:[],
  navBarHide:true,
}

// getters
const getters = {
  allProducts: state => state.all,
  searchHistory:(state) => {
    return JSON.parse(state.searchHistory)
  }
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  showLoading({ commit }){
    commit(types.SHOWLOADING)
  },
  hideLoading({ commit }){
    commit(types.HIDELOADING)
  },
  changeSearchBar({ commit }){
    commit(types.CHANGESEARCHBAR)
  },
  showSearchBar({ commit }){
    commit(types.SHOWSEARCHBAR)
  },
  clearSearchHistory({ commit }){
    commit(types.CLEARSEARCHHISTORY)
  },
  addSearchHistory({ commit }){
    commit(types.ADDSEARCHHISTORY)
  },
  addRemark({ commit },data){
    commit(types.CHOOSEREMARKRADIOS,data)
  },
  hideNavBar({ commit }){
    commit(types.HIDENAVBAR)
  },


}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  },
  [types.SHOWLOADING] (state) {
    state.showLoading = true
  },
  [types.HIDELOADING] (state) {
    state.showLoading = false
  },
  [types.CHANGESEARCHBAR] (state) {
    state.isShowSearch = !state.isShowSearch
  },
  [types.SHOWSEARCHBAR] (state) {
    state.isShowSearch = true;
  },
  [types.CLEARSEARCHHISTORY] (state) {
    localStorage.removeItem('allSearchHistory');
    state.searchHistory = '';
  },
  [types.CHOOSEREMARKRADIOS] (state,{ data }) {
    state.chooseRemarkRadios = data;
  },
  [types.HIDENAVBAR] (state) {
    state.navBarHide = false;
  },
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
