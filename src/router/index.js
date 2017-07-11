import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import CustomerList from '@/components/CustomerList'
import CustomerDetails from '@/components/CustomerDetails'
import CustomerRemark from '@/components/CustomerRemark'
import ChooseRemark from '@/components/ChooseRemark'
import SearchPage from '@/components/SearchPage'
import SearchResult from '@/components/SearchResult'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/CustomerList',
      name: 'CustomerList',
      component: CustomerList,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/CustomerDetails',
      name: 'CustomerDetails',
      component: CustomerDetails,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/CustomerRemark',
      name: 'CustomerRemark',
      component: CustomerRemark,
      meta: {keepAlive: true} // 这个是不需要keepalive的
    },
    {
      path: '/ChooseRemark',
      name: 'ChooseRemark',
      component: ChooseRemark,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/SearchPage',
      name: 'SearchPage',
      component: SearchPage,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: SearchResult,
      meta: {keepAlive: false} // 这个是不需要keepalive的
    },
  ]
})
