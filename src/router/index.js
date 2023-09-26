import {    createRouter,    createWebHashHistory} from 'vue-router'
import store from "../store/index.js";
const routes = [
    {
        path: '/',
        component: () => import('../views/Main.vue'),
        name: 'home1',
        redirect: '/problem',
         children: [
           {
             path: '/home',
             name: 'home',
             component: () => import('../views/home/Home.vue')
           },
           {
             path: '/user',
             name: 'user',
             component: () => import('../views/User/User.vue'),
               meta: { requiresAuth: true }
           },
           {
             path: '/about',
             name: 'about',
             component: () => import('../views/about.vue')
           },
           {
             path: '/page2',
             name: 'page2',
             component: () => import('../views/about.vue')
           },
             {
                 path: '/rank-list',
                 name: 'rank-list',
                 component: () => import('../views/User/rank-list.vue')
             },
             {
                 path: '/submit-list',
                 name: 'submit-list',
                 component: () => import('../views/submit/submit-list.vue')
             },
             {
                 path: '/problem-detail',
                 name: 'problem-detail',
                 component: () => import('../views/problem/problem-detail.vue')
             },
             {
                 path: '/user-detail',
                 name: 'user-detail',
                 component: () => import('../views/User/User.vue'),
                 meta: { requiresAuth: true }
             },
             {
                 path: '/problem',
                 name: 'problem',
                 component: () => import('../views/problem/problem.vue')
             },
             {
                 path: '/admin',
                 name: 'admin',
                 component: () => import('../views/admin/admin.vue'),
                 meta: { requiresAdmin: true }
             },
         ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('is_admin');
    const isLogin = store.state.isLogin;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 需要身份验证的页面
        if (!token) {
            // 如果没有Token，重定向到登录页面
            alert('未登录');
            next('/');
        } else {
            // 如果有Token，允许访问
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (role !== '1' || !token) {
            alert('您没有权限访问该页面');
            next('/');

        } else {
            // 如果有Token，允许访问
            next();
        }
    }else {
        // 不需要身份验证的页面，直接允许访问
        next();
    }
});

export default router