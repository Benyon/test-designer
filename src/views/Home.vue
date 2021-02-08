<template>
  <div class="home">
    <img style='width: 25%' src='~@/assets/images/under-construction.png'>
    <h1>We are currently in development.</h1>
    <p class='slim'>Test Designer is an interactive UI component to be used before intergrating any automated tests</p>
    <div v-if='!signedIn' class="cta">
        <router-link :to="{name: 'Login'}">
            <button type='button' class="button button-primary">Login</button>
        </router-link>
        <router-link :to="{name: 'Register'}">
            <button type='button' class="button button-primary">Register</button>
        </router-link>
    </div>

    <div v-if='signedIn' class="options">
        <router-link :to="{name: 'Library'}">
            <button type='button' class="button button-secondary">View Tests</button>
        </router-link>
        <router-link :to="{name: 'StepsLibrary'}">
            <button type='button' class="button button-secondary">View Test Steps</button>
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
    props: ['signedIn']
}
</script>

<style lang='scss' scoped>

.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;

    .cta, .options {
        padding: 20px 0px;
        
        button {
            margin: 0px 10px;
        }
    }
}

h1, h2, h3, p, strong {

    text-align: center;

    &.slim {
        width: 50%;
    }

}

</style>