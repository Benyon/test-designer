<template>
    <div class="register-panel">
        <div class="register-panel__form-container">
            <div v-if="state.loading" class="register-panel__loading-container">
                <div class="loader space-xxl spinner spinner-xs"></div> 
            </div>
            <div class='register-panel__form' :fade="!state.show">
                <h2>Register</h2>
                <form role="form" @submit.prevent="signUp">
                    <p class='form-message error' v-for="(error, index) in state.errors" :key='index'>{{error}}</p>
                    <div class="name-fields">
                        <p class="field">
                            <label class="form-message" for="fieldset-firstname">First Name</label>
                            <input type="firstname" id="fieldset-firstname" v-model='state.firstname' placeholder="First Name" @input="update">
                        </p>
                        <p class="field">
                            <label class="form-message" for="fieldset-firstname">Last Name</label>
                            <input type="firstname" id="fieldset-firstname" v-model='state.lastname' placeholder="First Name" @input="update">
                        </p>
                    </div>
                    <p class="field">
                        <label class="form-message" for="fieldset-email">Email</label>
                        <input type="email" id="fieldset-email" v-model='state.email' placeholder="Enter Email" @input="update" readonly onfocus="this.removeAttribute('readonly');">
                    </p>
                    <p class="field">
                        <label class="form-message" for="fieldset-password">Password</label>
                        <input type="password" id="fieldset-password" v-model='state.password' placeholder="Enter Password" @input="update">
                    </p>
                    <p class="field">
                        <label class="form-message" for="fieldset-confirmpassword">Confirm Password</label>
                        <input type="password" id="fieldset-confirmpassword" v-model='state.confirmpassword' placeholder="Confirm Password" @input="update">
                    </p>
                    <label class="control checkbox">
                        <input id='terms' @input="update" type="checkbox" name="checkbox">
                        <span class="control-indicator"></span>
                        <span class="control-label">I accept the terms and conditions</span>
                    </label>

                    <p class="field">
                        <button type="submit" class="button">Sign Up</button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { onMounted, reactive } from 'vue';
import { RegexMatches } from '../assets/regex';
import { locale } from '../assets/responses'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
 
    setup() {
        const state = reactive({
            loading: false,
            show: true,
            error: false,
            email: '',
            password: '',
            confirmpassword: '',
            firstname: '',
            lastname: '',
            validationElements: [],
            validationError: false,
            errors: []
        })

        function firebaseAuthCallback(data, err = false) {
            state.loading = false;
            state.show = true;
            if (err) {
                let errorCode = locale.en[data.code] ? locale.en[data.code] : data.message
                state.errors.push(errorCode);
                return;
            }
            console.log(data);
        }

        function setValidationError(element, sendErrorToLabel = true) {
            state.validationError = true;
            element.classList.add('error');
            if (sendErrorToLabel) {
                element.parentElement.querySelector('label').classList.add('error');
            }
        }

        function signUp() {
            // Clear errors.
            state.errors = [];
            state.validationError = false;

            // Check each validation element.
            state.validationElements.forEach(element => {
                if (element.value.length===0) {
                    setValidationError(element);
                }
                if (element.getAttribute('type') === 'email' && !RegexMatches.emailRegex.test(state.email)) {
                    setValidationError(element);
                }
            });

            // TODO Check terms and conditions have been accepted
            const termsAndConditionsCheckbox = document.getElementById('terms')
            if (!termsAndConditionsCheckbox.checked) {
                setValidationError(termsAndConditionsCheckbox, false)
            }

            // Stop flow is there's an error.
            if (state.validationError) return;

            // Transition elements and send API request if no errors.
            state.show = false;
            state.loading = true;
            
            firebase
                .auth()
                .createUserWithEmailAndPassword(state.email, state.password)
                .then(firebaseAuthCallback)
                .catch(err => firebaseAuthCallback(err, true))
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
                } else if (t.target.getAttribute('type') === 'checkbox') {
                    t.target.classList.remove('error');
                } else {
                    t.target.classList.remove('error');
                    t.target.parentNode.querySelector('label').classList.remove('error');
                }
            }
        }

        onMounted(() => {
            state.validationElements = document.querySelectorAll('.field > input');
        })

        return {
            state,
            signUp,
            update
        }
    }
}

</script>

<style lang='scss'>

.register-panel {

    display: flex;
    flex-direction: column;
    align-items: center;

    .register-panel__form-container {
        width: 50%;
        height: 100%;
        min-width: 500px;
        position: relative;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        padding: 25px;

        .register-panel__loading-container {
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

        .register-panel__form {
            transition: opacity 0.5s;

            .name-fields {

                display: flex;
                flex-direction: row;

                p {
                    margin: 0;
                    width: 50%;
                    &:first-child {
                        margin-right: 25px;
                    }

                    &:last-child {
                        margin-left: auto;
                    }
                }
            }

            &[fade=true] {
                opacity: 0;
            }
        }

        .control .control-label {
            font-size: 0.9rem;
        }

        input {
            font-size: 0.9rem;
        }

        button {
            margin-top: 0.5rem;
        }
    }

    label.checkbox {
        
        input.error + .control-indicator {
            border-color: red;
        }

        input.error + * + span {
            color: red;
        }
    }
    
}

</style>