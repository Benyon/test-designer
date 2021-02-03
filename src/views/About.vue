<template>
    <transition name="fade">
        <div :v-if="loaded" class="about">
            <h1>This is an about page {{loaded}}</h1>
        </div>  
    </transition>
</template>

<script>
export default {
    props: ['loaded']
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

</style>