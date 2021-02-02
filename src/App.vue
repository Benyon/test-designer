<template>
	<Links/>
	<div class="container">
		<router-view v-if='state.loaded'/>
	</div>
</template>

<script>
import Links from '@/components/Links'
import { onBeforeMount, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
	components: { Links },

	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			loaded: true
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
