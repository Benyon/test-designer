<template>
    <div class="login-panel">
        <div class="login-panel__form-container">
            <div v-if="state.loading" class="login-panel__loading-container">
                <div class="loader space-xxl spinner spinner-xs"></div> 
            </div>
            <div class='login-panel__form' :fade="!state.show">
                <h2>Login</h2>
                <form role="form">
                    <p class="field">
                        <label class="form-message" for="fieldset-email">Email</label>
                        <input v-model="email" type="email" id="fieldset-email" autocomplete="off" placeholder="Enter Email" @input="update">
                    </p>
                    <p class="field">
                        <label class="form-message" for="fieldset-password">Password</label>
                        <input v-model="password" type="password" id="fieldset-password" autocomplete="off" placeholder="Enter Password" @input="update">
                    </p>

                    <label class="control checkbox info">
                        <input type="checkbox" name="checkbox" checked="">
                        <span class="control-indicator"></span>
                        <span class="control-label">Remember me</span>
                    </label>

                    <p class="field">
                        <button type="submit" class="button" @click.prevent="logIn">Log In</button>
                        <a class='forget' href="#">
                            <span><em>Forgot password?</em></span>
                        </a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, reactive } from 'vue';
export default {
 
    setup() {
        const email = ref('');
        const password = ref('');

        const state = reactive({
            loading: false,
            show: true,
            error: false
        })

        function logIn() {
            let errored = false;
            if (email.value.length === 0) {
                document.getElementById('fieldset-email').classList.add('error');
                document.querySelector('label[for=fieldset-email]').classList.add('error');
                errored = true;
            }
            if (password.value.length === 0) {
                document.getElementById('fieldset-password').classList.add('error');
                document.querySelector('label[for=fieldset-password]').classList.add('error');
                errored = true;
            }
            if (errored) return;

            state.show = false;
            state.loading = true;
        }

        function update(t) {
            t.target.classList.remove('error');
            t.target.parentNode.querySelector('label').classList.remove('error');
        }

        return {
            state,
            logIn,
            email,
            password,
            update
        }
    }
}

</script>

<style lang='scss'>

.login-panel {

    display: flex;
    flex-direction: column;
    align-items: center;

    .login-panel__form-container {
        width: 50%;
        height: 100%;
        min-width: 500px;
        position: relative;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        padding: 25px;

        .login-panel__loading-container {
            display: flex;
            align-items: center;
            position: absolute;
            width: calc(100% - 50px); /* Width minus margin */
            z-index: 2;
            justify-content: center;
            height: 298px;

        .spinner {
            margin-left: auto;
            margin-right: auto;
        }

    }

        .login-panel__form {
            transition: opacity 0.5s;

            &[fade=true] {
                opacity: 0;
            }
        }

        .control .control-label {
            font-size: 0.9rem;
        }

        a.forget {
            margin: 0px 8px;
            padding: 0px 2px;
            font-size: 0.9rem;
            opacity: 0.5;
        }

        input {
            font-size: 0.9rem;
        }

        button {
            margin-top: 0.5rem;
        }
    }
    
}

</style>