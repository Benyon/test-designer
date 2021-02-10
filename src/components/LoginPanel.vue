<template>
    <div class="login-panel">
        <div class="login-panel__form-container">
            <div v-if="state.loading" class="login-panel__loading-container">
                <div class="loader space-xxl spinner spinner-xs"></div> 
            </div>
            <div class='login-panel__form' :fade="!state.show">
                <div v-if='!state.isResetingPassword' id="login">
                    <h2>Login</h2>
                    <form role="form" @submit.prevent="logIn">
                        <p class='form-message error' v-for="(error, index) in state.errors" :key='index'>{{error}}</p>
                        <input type='hidden' id='dummy' autofocus='true'>
                        <p class="field">
                            <label class="form-message" for="fieldset-email">Email</label>
                            <input type="email" id="fieldset-email" v-model='state.email' validate placeholder="Enter Email" @input="update">
                        </p>
                        <p class="field">
                            <label class="form-message" for="fieldset-password">Password</label>
                            <input type="password" id="fieldset-password" v-model='state.password' validate placeholder="Enter Password" @input="update" >
                        </p>

                        <label class="control checkbox info">
                            <input type="checkbox" name="checkbox" validate checked="">
                            <span class="control-indicator"></span>
                            <span class="control-label">Remember me</span>
                        </label>

                        <p class="field">
                            <button type="submit" class="button">Log In</button>
                            <a class='forget' href="#" @click.prevent="state.isResetingPassword = true; state.email=''">
                                <span><em>Forgot password?</em></span>
                            </a>
                        </p>
                    </form>
                </div>
                <div v-if='state.isResetingPassword' class="forgot-password">
                    <h2>Forgot Password</h2>
                    <form role="form" @submit.prevent="forgotPassword">
                        <p class='form-message error' v-for="(error, index) in state.errors" :key='index'>{{error}}</p>
                        <p class="field">
                            <label class="form-message" for="fieldset-email">Email</label>
                            <input type="email" id="fieldset-email" v-model='state.email' validate placeholder="Enter Email" @input="update">
                        </p>
                        <p class="field">
                            <button type="submit" class="button">Forgot my Password</button>
                            <a class='back' href="#" @click.prevent="state.isResetingPassword = false; state.email=''">
                                <span><em>Back</em></span>
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { reactive } from 'vue';
import { RegexMatches } from '../assets/regex.js';
import { locale } from '../assets/responses';
import { CommonUtility } from '../assets/common'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
 
    setup() {
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            loading: false,
            show: true,
            error: false,
            isResetingPassword: false,
            email: '',
            password: '',
            validationElements: [],
            validationError: false,
            errors: [],
        })

        function setValidationError(element) {
            state.validationError = true;
            element.classList.add('error');
            if (element.getAttribute("type") != 'checkbox') {
                element.parentElement.querySelector('label').classList.add('error');
            }
        }

        async function authorisationCallback(data, err = false) {
            if (!err) {
                let responseJson = await data.json();
                const token = responseJson['token'];
                const user = responseJson['user'];

                localStorage.token = token;
                localStorage.user = user;
                store.dispatch('LOG_IN');
                router.replace('/account');

            } else  {
                let errorCode = locale.en.default;
                if (data.status == 400) {
                    errorCode = await data.text()
                } else {
                    errorCode = locale.en[data.status] ? locale.en[data.status] : data.statusText
                }
                state.errors.push(errorCode);

            }
            state.isResetingPassword = false;
            state.loading = false;
            state.show = true;
        }


        function validateFields() {

           document.querySelectorAll('*[validate]').forEach(element => {
                if (element.getAttribute("type")!="checkbox" && element.value.length<3) {
                    setValidationError(element);
                }
                if (element.getAttribute('type') === 'email' && !RegexMatches.emailRegex.test(state.email)) {
                    setValidationError(element);
                }
            });
        }

        function forgotPassword() {
            // Clear errors.
            state.errors = [];
            state.validationError = false;

            // Check each validation element.
            validateFields()

            // Stop flow is there's an error.
            if (state.validationError) return;

            // Transition elements and send API request if no errors.
            state.show = false;
            state.loading = true;

            alert('functionality not finished');
        }

        async function logIn() {

            // Clear errors.
            state.errors = [];
            state.validationError = false;

            // Check each validation element.
            validateFields();

            // Stop flow is there's an error.
            if (state.validationError) return;

            // Transition elements and send API request if no errors.
            state.show = false;
            state.loading = true;
            
            fetch(CommonUtility.config.api.BASE_URL + "/login", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: state.email,
                    password: state.password,
                    c_password: state.password
                })
            })
            .then(async res => await authorisationCallback(res, !res.ok))
            .catch(async err => await authorisationCallback(err, true))
        }

        function update(t) {
            if (state.validationError) {
                if (t.target.getAttribute('type') === 'email') {
                    if (RegexMatches.emailRegex.test(state.email)) {
                        t.target.classList.remove('error');
                        t.target.parentNode.querySelector('label').classList.remove('error');
                    } else {
                        t.target.classList.add('error');
                        t.target.parentNode.querySelector('label').classList.add('error');
                    }
                } else {
                    t.target.classList.remove('error');
                    t.target.parentNode.querySelector('label').classList.remove('error');
                }
            }
        }

        return {
            state,
            logIn,
            update,
            forgotPassword
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

        a.forget, a.back {
            margin: 0px 8px;
            padding: 0px 2px;
            font-size: 0.9rem;
            opacity: 0.5;
            text-decoration: none; 
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