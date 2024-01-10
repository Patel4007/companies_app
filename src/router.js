import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/home', name: 'home', component: () => import('./Views/Home.vue')},
    {path: '/categories', name: 'categories', component: () => import('./Views/Categories.vue')},
    {path: '/businesspage/:id/:user_id', name: 'businesspage', component: () => import('./Views/BusinessPage.vue')},
    {path: '/services', name: 'services', component: () => import('./Views/Services.vue')},
    {path: '/', name: 'login', component: () => import('./Views/Login.vue')},
    {path: '/signup', name: 'signup', component: () => import('./Views/Signup.vue')},
    {path: '/dashboard', name: 'dashboard', component: () => import('./Views/Dashboard.vue')},
    {path: '/forgotpassword', name: 'forgotpassword', component: () => import('./Views/forgotPassword.vue')},
    {path: '/conversation', name: 'conversation', component: () => import('./Views/Conversation.vue')},
]

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router