import Vue from 'vue'
import Router from 'vue-router'
import endpoints from '@/settings/endpoints'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: endpoints.dashboard },
    {
      path: '/accountings',
      component: require('@/components/accountings.content.vue').default
    },
    {
      path: '/customers',
      component: require('@/components/customers.content.vue').default
    },
    {
      path: '*',
      component: require('@/components/page-not-found.content.vue').default
    }
  ]
})
