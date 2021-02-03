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
                    <router-link :to="{name: 'Login'}">
                        <button class="button button-primary button-border">Login</button>
                    </router-link>
                    <router-link :to="{name: 'Register'}">
                        <button class="button button-primary button-border">Register</button>
                    </router-link>
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
import { reactive } from 'vue'

export default {
    props: {
        showLinks: {
            type: Boolean,
            required: true
        }
    },
	setup() {
		const state = reactive({
			links: ['About', 'Account', 'Home', 'Library', 'Login', 'Register', 'Test']
		});

		return {
            state
		}
	}
}
</script>

<style lang='scss'>

.links-wrapper {

	margin-bottom: 2rem;
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
