<template>
	<NavBar :showLinks='state.showLinks' :user='state.user' :loaded='state.loaded'/>
    <div class="content">
        <div v-if='state.loaded' class="container">
            <router-view :user='state.user'/>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { onMounted, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CommonUtility } from './assets/common'
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    components: { NavBar, Footer },

	setup() {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
            loaded: false,
            showLinks: false,
            user: null
        })

        function queryRedirect(rawRoute) {
            if (!state.user && ['/account', '/library', '/test'].includes(rawRoute)) { // Not logged in and try to land on an auth page.
                router.replace('/login')
            } else if (state.user && (route.path == '/register' || route.path == '/login')) { // Logged in and on the login step pages.
                router.replace('/')
            }

            setTimeout(()=>{
                state.loaded = true;
            }, 300)
        }

        watch(
            () => route.params,
            async () => {
                if (!state.loaded) return
                state.user = firebase.auth().currentUser;
                let rawRoute = CommonUtility.urlTrim(route.path);
                queryRedirect(rawRoute);
            }
        )

		onMounted(() => {
			firebase.auth().onAuthStateChanged((user) => {
                let rawRoute = CommonUtility.urlTrim(route.path);
                state.user = user
                queryRedirect(rawRoute);
			})
        })

		return {
            state
		}
	}
}
</script>


<style lang="scss">

.content {
    background-image: url('~@/assets/images/dot_bkg.png');
    padding-top: 2rem;
    height: 100%;
    min-height: calc(97vh - 120px);
}

</style>