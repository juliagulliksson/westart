import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users' 
import Row from '@/components/Dashboard/Row' 
import Schema from '@/components/Schema/Schema'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Row',
      component: Row
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/schema',
      name: 'Schema',
      component: Schema
    } 
  ]
})
