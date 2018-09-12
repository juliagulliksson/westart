import Vue from 'vue'
import Router from 'vue-router'
/* import Users from '@/components/Users' */
import Row from '@/components/Dashboard/Row' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Row',
      component: Row
    }
  ]
})
