<template>
	<Links/>
	<router-view v-if='state.loaded'/>
</template>

<script>
import Links from '@/components/Links'
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase';

export default {
	components: { Links },

	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			loaded: false
		})

		onBeforeMount(() => {
			firebase.auth().onAuthStateChanged((user) => {
				if (!user && ['/account', '/library', '/test'].includes(route.path)) { // Not logged in and try to land on an auth page.
					router.replace('/login')
				} else if (route.path == '/register' || route.path == '/login') { // Logged in and on the login step pages.
					router.replace('/account')
				}
				state.loaded = true;
			})
		})

		return {
			state
		}
	}
}
</script>

<style lang='scss'>

body {
	background-color: #d6e3ec;
	color: #24252a;
	margin: 0;
}

a {
	color: inherit;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

</style>
