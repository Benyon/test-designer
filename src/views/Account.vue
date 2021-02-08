<template>
  <div class="account">
    <h1>My Account</h1>
    <p>Hello Jordan, you can manage your profile settings from here.</p>
    <div class="panel-container">

        <div class='errorWrapper'>
            <p class='form-message error' v-for="(error, index) in state.errors" :key='index'>{{error}}</p>
        </div>


        <div id='preferences' v-on:click="expand" panelName="preferences" class="panel expandable preferences-panel">
            <h4>Peferences<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">

                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(preference, index) in state.preferences" :key='index' class="config-list-item">
                    <label>{{preference.title}}</label>
                    <div class='input'>
                        <input :type='preference.data' :value="preference.value" :checked="preference.value" :id="preference.key">
                    </div>
                </div>

                <div class="buttons">
                    <button class='button button-secondary' :disabled='state.loading' @click="submitPreferences">Save</button>
                    <div :class='{ "hidden": !state.loading }' class="space-xxl spinner spinner-xs"></div>
                </div>
            </div>
        </div>


        <div id='personaldetails' v-on:click="expand" panelName="personalDetails" class="panel expandable details-panel">
            <h4>Personal Details<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(preference, index) in state.personal" :key='index' class="config-list-item">
                    <label>{{preference.title}}</label>
                    <div class='input'>
                        <input type="text" :value="preference.value" :disabled='preference.key == "email"' :id='preference.key'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button disabled button-secondary' :disabled='state.loading' @click="submitDetails">Save</button>
                    <div :class='{ "hidden": !state.loading }' class="space-xxl spinner spinner-xs"></div>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { CommonUtility } from '../assets/common';

export default {   
    name: "Account Page",
    setup() {
        const uiWaitTime = 500;
        const state = reactive({

            // UI driving variables
            errors: [],
            loading: false,
            expanded: false,

            // Object for preference population.
            preferences: [],
            personal: []
            
        });

        async function updateStateWithNewValues() {
            // Array of objects containing title data value and key
            let mutatedState = [];
            
            state.preferences.forEach((prefObj) => {
                const element = document.getElementById(prefObj.key);
                const isCheckbox = (prefObj.data == "checkbox");
                const value = isCheckbox? element.checked : (element ? element.value : prefObj.value);
                mutatedState.push({
                    key: prefObj.key,
                    title: prefObj.title,
                    data:  prefObj.data,
                    value: value
                })
            });

            state.preferences = mutatedState;
        }

        async function updateStateWithNewValuesPersonalDetails() {
            // Array of objects containing title data value and key
            let mutatedState = [];
            
            state.personal.forEach(async (prefObj) => {
                const element = document.getElementById(prefObj.key);
                const isCheckbox = (prefObj.data == "checkbox");
                const amendedValue = isCheckbox? element.checked : (element ? element.value : prefObj.value);

                mutatedState.push({
                    key: prefObj.key,
                    title: prefObj.title,
                    value: amendedValue
                })
            });

            state.personal = mutatedState;
        }

        async function submitDetails() {

            if (state.loading) return;
            state.loading = true;

            await updateStateWithNewValuesPersonalDetails()

            const res = await fetch(CommonUtility.config.api.BASE_URL + "/preferences/me", {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
                body: JSON.stringify(state.personal)
            });

            if (!res.ok) {
                state.errors = [res.statusText];
            }

            setTimeout(() => {state.loading = false}, uiWaitTime);
            
        }

        async function submitPreferences() {

            if (state.loading) return;
            state.loading = true;

            await updateStateWithNewValues();

            const res = await fetch(CommonUtility.config.api.BASE_URL + "/preferences", {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
                body: JSON.stringify(state.preferences)
            });

            if (!res.ok) {
                state.errors = [res.statusText];
            }

            setTimeout(() => { state.loading = false}, uiWaitTime);

        }

        async function populatePreferences() {
            const res = await fetch(CommonUtility.config.api.BASE_URL + "/preferences", {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token }
            });

            if (!res.ok) {
                state.errors.push(res.statusText);
                return;
            }

            const json = await res.json();

            Object.keys(json).forEach((key) => {
                let value = json[key];
                if (typeof(value) === 'object'){
                    value.key = key;
                    state.preferences.push(value);
                } 
            });
        }

        async function toSentanceCase(str) {
            var result = str.replace( /([A-Z])/g, " $1" );
            var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
            return finalResult
        }

        async function populatePersonal() {

            const res = await fetch(CommonUtility.config.api.BASE_URL + "/users/me", {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token }
            });

            if (!res.ok) {
                state.errors.push(res.statusText);
                return;
            }

            const json = await res.json();

            Object.keys(json).forEach(async (key) => {
                let value = json[key];
                if (!key.startsWith('_')){
                    let listItem = {
                        title: await toSentanceCase(key),
                        key: key,
                        value: value
                    } 
                    state.personal.push(listItem);
                } 
            });
        }

        onMounted(() => {
            populatePreferences();
            populatePersonal();
        })

        async function expand(e) {
            let target = await e.target ? e.target : e;
            let element = target.closest('.panel');
            element.setAttribute('expanded', true);
        }
    
        async function close(tab, e) {
            let target = e.target ? e.target : e;
            let element = target.closest('.panel');
            element.removeAttribute('expanded')
        }


        return {
            expand,
            state,
            close,
            submitPreferences,
            submitDetails
        }
    }
}
</script>


<style lang="scss" scoped>

.panel-container {
    display: flex;
    flex-wrap: wrap;

    .panel {
        max-height: 5rem;
        transition: max-height 0.25s ease-in;
        height: auto;
        overflow: hidden;
        width: 100%;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        padding: 25px;
        margin: 25px;

        &:not([expanded=true]) {
            cursor: pointer;
        }

        &[expanded=true] {
            em {
                display:none!important;
            }
        }

        h4 {
            margin-bottom: 30px;

            em {
                opacity: 0.25;
                font-weight: 400;
                font-size: 1rem;
                margin-left: 1rem;
            }
        }

        &[expanded=true] {
            max-height: 1000px;
        }

        .panel-container__contents-wrapper {
            display: flex;
            flex-direction: column;
            padding-left: 25px;

            .config-list-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 15px;

                .input {
                    width: 100%;
                }

                label {
                    width: 25%;
                    height: 100%;
                    margin-right: 25px;
                    margin-bottom: 0px;
                }
            }

            .buttons {
                margin-top: 10px;
                display: flex;
                align-items: center;

                div.spinner {

                    transition: all 0.2s;
                    margin-left: -15px
                }

                button {
                    margin-right: 15px;
                }
            }
        }
    }
}

</style>

