import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import register from '../views/Register.vue'

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'login',
    component: login,
},
{
    path: '/login',
    name: 'login',
    component: login
},
{
    path: '/register',
    name: 'register',
    component: register
},
{
    path: '/departements',
    name: 'departements',
    meta: { requireAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "departements" */ '../views/Departements.vue')
},
{
    path: '/users',
    name: 'users',
    meta: { requireAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "users" */ '../views/Users.vue')
},
{
    path: '/user-detail',
    name: 'user-detail',
    meta: { requireAuth: true },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "user-detail" */ '../views/User-detail.vue')
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record=>record.meta.requireAuth)) {


        if (!localStorage.getItem('token')) {
            next({
                name: 'login'
            });
        } else {
            next();
        }
    }
    else {
        next();
    }

})

export default router