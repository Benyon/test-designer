<template>
	<div class="links-wrapper">
		<router-link v-for="(link, index) in state.links" :to="{name: link, params: {testId: 1}}" :key='index'>
		[ {{ link.toLowerCase() }} ]
		</router-link>
	</div>
</template>

<script>
import { reactive } from 'vue'

export default {
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
