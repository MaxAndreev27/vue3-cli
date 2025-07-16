import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/AppLogin.vue';
import Forget from './views/AppForget.vue';
import Dashboard from './views/AppDashboard.vue';
// import Mail from './views/Mail'
import NotFound from './views/NotFound.vue';
import AppEmailBody from './components/AppEmailBody.vue';

// Ліниве завантаження Mail сторінки
const Mail = () => import('./views/AppMail.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, alias: '/' },
        { path: '/forget', component: Forget, meta: { cantEnter: true } },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'home',
            beforeEnter() {
                console.log('beforeEnter');
            },
        },
        {
            path: '/mail',
            component: Mail,
            name: 'email',
            children: [{ path: ':mailId?', component: AppEmailBody, props: true }],
        },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

// Гуард (перевірка параметра) перед кожним роутінгом, приклад для /forget
router.beforeEach((to, from, next) => {
    console.log('beforeEach');
    if (to.meta.cantEnter) {
        next({ name: 'home' });
    } else {
        next();
    }
});

router.afterEach((to, from) => {});

export default router;
