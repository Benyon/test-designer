import { createRouter, createWebHistory } from 'vue-router'
import { CommonUtility } from '../assets/common'
import Home from '../views/Home.vue';
import store from '../store'

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
            title: 'Test Designer - Login',
            guestOnly: true
        }
	},
	{
		path: '/account',
		name: 'Account',
		component: () => import('../views/Account.vue'),
        meta: {
            title: 'Test Designer - My Account',
            requiresLogin: true
        }
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('../views/Library.vue'),
        meta: {
            title: 'Test Designer - My Library',
            requiresLogin: true
        }
	},
    {
		path: '/steps-library',
		name: 'StepsLibrary',
		component: () => import('../views/StepsLibrary.vue'),
        meta: {
            title: 'Test Designer - My Steps Library',
            requiresLogin: true
        }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
        meta: {
            title: 'Test Designer - Register',
            guestOnly: true
        }
	},
	{
		path: '/test/:testId',
		name: 'Test',
		component: () => import('../views/Test.vue'),
        meta: {
            title: 'Test Designer - Test:testId',
            requiresLogin: true
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

async function getAuthorised() {
    
    if (localStorage.token != 'null') {

        const result = await fetch(CommonUtility.config.api.BASE_URL + '/users/me', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ localStorage.token }`
            }
        }); 

        // Check token is valid for who you are.

        store.dispatch('LOG_IN');
        return {
            authorised: result.ok,
            user: result
        }
    }

    return {
        authorised: false,
        user: null
    };

}

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    mode: 'history',
	routes
})

router.beforeEach(async (to, from, next) => {

    const user = await getAuthorised();
    if (!user.authorised) {
        localStorage.token = null;
    }

	const listOfPages = routes.map(val => val.path.split('/:')[0])
	const toPath = CommonUtility.urlTrim(to.path)
	if (to.path!='/404' && !listOfPages.includes(toPath)) {
		next('/404')
	} else {
        if (to.matched.some(record => record.meta.requiresLogin) && !user.authorised ) {
            next('/login')
        } else if (to.matched.some(record => record.meta.guestOnly) && user.authorised ) {
            next('/account')
        } else {
            next()
        }
    }
})

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
})

export default router
