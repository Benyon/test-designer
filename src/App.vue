<template>
	<NavBar :showLinks='state.showLinks' :signedIn='state.signedIn' :loaded='state.loaded'/>
    <div class="content">
        <div class="container">
            <router-view :signedIn='state.signedIn'/>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex'

export default {
    components: { NavBar, Footer },
	setup() {
        const store = useStore();
		const state = reactive({
            showLinks: false,
            signedIn: false,
            loaded: false,
            pls: null
        })

        function delayLoad() {
            setTimeout( () => {
                state.loaded = true;
                state.pls = localStorage.token
            }, 200)
        }

        watch( 
            () => store.state.loggedIn,
            is => {
                state.signedIn = is;
            }
        )

        onMounted(() => {
            delayLoad();
        })

		return {
            state
		}
	}
}
</script>


<style lang="scss">

.content {
    padding-top: 2rem;
    height: 100%;
    min-height: calc(97vh - 120px);
}

</style>