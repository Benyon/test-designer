import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('../views/Account.vue')
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('../views/Library.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue')
	},
	{
		path: '/test/:testId',
		name: 'Test',
		component: () => import('../views/Test.vue')
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../views/404.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	const listOfPages = routes.map(val => val.path.split('/:')[0])
	const toPath = to.path.toLowerCase().split(/(\/[0-9])/)[0];

	console.log(toPath)
	if (to.path!='/404' && !listOfPages.includes(toPath)) {
		next('/404')
	} else {
		next();
	}
})

export default router
