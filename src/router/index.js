import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
const DEFAULT_TITLE = "Test Designer";

const routes = [
	{
		path: '/',
		name: 'Home',
        component: Home,
        meta: {
            title: 'Test Designer - Home'
        }
	},
	{
		path: '/about',
		name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            title: 'Test Designer - About'
        }
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
        meta: {
            title: 'Test Designer - Login'
        }
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('../views/Account.vue'),
        meta: {
            title: 'Test Designer - My Account'
        }
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('../views/Library.vue'),
        meta: {
            title: 'Test Designer - My Library'
        }
	},
    {
		path: '/steps-library',
		name: 'StepsLibrary',
		component: () => import('../views/StepsLibrary.vue'),
        meta: {
            title: 'Test Designer - My Steps Library'
        }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
        meta: {
            title: 'Test Designer - Register'
        }
	},
	{
		path: '/test/:testId',
		name: 'Test',
		component: () => import('../views/Test.vue'),
        meta: {
            title: 'Test Designer - Test:testId'
        }
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404.vue'),
        meta: {
            title: 'Test Designer - 404'
        }
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	// 404 handling
	const listOfPages = routes.map(val => val.path.split('/:')[0])
	const toPath = to.path.toLowerCase().split(/(\/[0-9])/)[0];
	if (to.path!='/404' && !listOfPages.includes(toPath)) {
		next('/404')
	} else {
        next();
    }
})

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
})

export default router
