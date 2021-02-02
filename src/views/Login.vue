<template>
  <div class="login">
      <LoginPanel/>
  </div>

</template>

<script>
import LoginPanel from '@/components/LoginPanel'

export default {
    components: { LoginPanel }
}
</script>

<style lang="scss" scoped>

.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
    width: 500px;  
    height: 50vh;
}

</style>