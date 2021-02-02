<template>
  <nav class="links-wrapper">
    <router-link v-for="(link, index) in state.links" :to="{name: link, params: {testId: 1}}" :key='index'>
     [ {{ link.toLowerCase() }} ]
    </router-link>
  </nav>
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

<style lang="scss" scoped>

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5%;
  background-color: #24252a;
  color: white;

  .navigation__logo { 
    font-weight: bold;
    font-size: 24px;
  }

  .navigation__user {
    font-weight: bold;
  }
}

</style>