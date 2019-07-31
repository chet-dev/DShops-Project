import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin'
import StoreOwner from '@/views/StoreOwner'
import StorefrontManager from '@/views/StorefrontManager'
import Product from '@/views/Product'
import Shopper from '@/views/Shopper'
import Storefront from '@/views/Storefront'
import StoreOwnerApplicant from '@/views/StoreOwnerApplicant'
import CircuitBreaker from '@/views/CircuitBreaker'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', component: Home },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/storeownerapplicant/:address',
      name: 'storeownerapplicant',
      component: StoreOwnerApplicant,
      props: true
    },
    {
      path: '/admin/:address',
      name: 'admin',
      component: Admin,
      props: true
    },
    {
      path: '/storeowner/:address',
      name: 'storeowner',
      component: StoreOwner,
      props: true
    },
    {
      path: '/storefrontManager/:uniqueId',
      name: 'storefrontmanager',
      component: StorefrontManager,
      props: true
    },
    {
      path: '/storefront/:uniqueId',
      name: 'storefront',
      component: Storefront,
      props: true
    },
    {
      path: '/shopper/:address',
      name: 'shopper',
      component: Shopper,
      props: true
    },
    {
      path: '/product/:productCode',
      name: 'product',
      component: Product,
      props: true
    },
    {
      path: '/circuitbreaker/:address',
      name: 'circuitbreaker',
      component: CircuitBreaker,
      props: true
    }
  ]
})
