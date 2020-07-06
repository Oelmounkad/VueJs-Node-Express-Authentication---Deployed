import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from './views/Welcome'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode : 'history',
    routes : [
        
        {path: '',component:Welcome},
        {path: '/register',component:Register},
        {path: '/login',component:Login},
        {path: '/dashboard',component:Dashboard}

    ]
})