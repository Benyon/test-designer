<template>
	<div class="navbar links-wrapper">
        <div class="container">
            <div class="navbar__page-header">
                <div class="navbar__logo-container">
                    <router-link class='link' :to="{name: 'Home'}">
                        <span class="title">Test Designer</span>
                    </router-link>
                </div>
                <div class="navbar__buttons">
                    <div v-if='loaded' class="wrapper">
                        <div v-if='!user' class="not-logged-in">
                            <button class='debug' @click='output'>Log Debug to Console</button>
                            <router-link :to="{name: 'Login'}">
                                <button type='button' class="button button-primary" :class='{"button-border": urlPath==="/" }'>Login</button>
                            </router-link>
                            <router-link :to="{name: 'Register'}">
                                <button type='button' class="button button-primary" :class='{"button-border": urlPath==="/" }'>Register</button>
                            </router-link>
                        </div>
                        
                        <div v-if='user' class="logged-in">
                            <button class='debug' @click='output'>Log Debug to Console</button>
                            <router-link :to="{name: 'Account'}">
                                <button type='button' class="button button-secondary">Profile</button>
                            </router-link>
                            <a v-if='user' href="#">
                                <button type='button' class='button-secondary button-border' @click.prevent='signOut'>Sign Out</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

    <div v-if='showLinks' class="container links">
        <router-link v-for="(link, index) in state.links" :to="{name: link, params: {testId: 1}}" :key='index'>
        {{ link.toLowerCase() }} {{ ["Library","Test", "Account"].includes(link) ? '🔒' : '' }}
        </router-link>
    </div>

</template>

<script>
import { computed, reactive } from 'vue'
import firebase from 'firebase/app'
import { useRouter, useRoute } from 'vue-router';
import 'firebase/auth'

export default {
    props: ['showLinks', 'user', 'loaded'],
    
	setup(ctx, props) {
		const router = useRouter();
		const route = useRoute();
		const state = reactive({
			links: ['About', 'Account', 'Home', 'Library', 'Login', 'Register', 'Test']
		});

        const urlPath = computed(()=>{
            return route.fullPath;
        })

        function output() {
            console.log(props.props.user)
        }

        function signOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    router.replace('/')
                })
                .catch(() => {
                    router.replace('/')
                })
        }

		return {
            state,
            signOut,
            urlPath,
            output
		}
	}
}
</script>

<style lang='scss'>

button.debug{
    opacity: 0;
    &:hover{
        opacity: 1!important;
    }
}

.links-wrapper {

    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background-color: white;

    .navbar__page-header {
        padding: 15px 0px;
        display: flex;
        flex-direction: row;

        .navbar__logo-container {
            display: flex;
            align-items: center;
        }

        .navbar__buttons {
            margin-left: auto;
            min-height: 40px;

            button {
                margin: 0px 5px;
            }
        }

        a {
            font-size: 18px;
            font-weight: 600;
            text-decoration: none;
        }
    }
}

.container.links {
    margin-bottom: 25px;
    text-align: center;

    a {
        padding: 0px 25px;
    }
}

</style>
