<template>
  <div class="account">
    <h1>My Account</h1>
    <p>Hello Jordan, you can manage your profile settings from here.</p>
    <div class="panel-container">

        <div class='errorWrapper'>
            <p class='form-message error' v-for="(error, index) in state.errors" :key='index'>{{error}}</p>
        </div>

        <div v-on:click="expand" panelName="preferences" class="panel expandable preferences-panel" :expanded='state.expanded.preferences ? true : false'>
            <h4>Peferences<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">

                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.preferences" :key='index' class="config-list-item" pre='preferences' :setting='setting.SettingKey'>
                    <label>{{camelCaseToSentanceCase(setting.SettingKey)}}</label>
                    <div class='input'>
                        <input type="text" :value="setting.Value" :checked='setting.Value'>
                    </div>
                </div>

                <div class="buttons">
                    <button class='button button-secondary' @click.prevent="e => updatePreferences(e, 'preferences')">Save</button>
                    <div :class='{ "hidden": !state.loading }' class="space-xxl spinner spinner-xs"></div>
                </div>
            </div>
        </div>


        <div v-on:click="expand" panelName="personalDetails" class="panel expandable details-panel" :expanded='state.expanded.personalDetails ? true : false'>
            <h4>Personal Details<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.personal" :key='index' class="config-list-item" pre='personal' :setting='setting.SettingKey'>
                    <label>{{camelCaseToSentanceCase(setting.SettingKey)}}</label>
                    <div class='input'>
                        <input type="text" :value="setting.Value" :disabled='setting.SettingKey === "email"'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button button-secondary' @click.prevent="e => updatePreferences(e, 'personal')">Save</button>
                </div>
            </div>
        </div>


        <div v-on:click="expand" v-if="!isEmpty(state.admin)" panelName="adminControls" class="panel expandable admin-panel" :expanded='state.expanded.adminControls ? true : false'>
            <h4>Admin Controls<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.admin" :key='index' class="config-list-item" pre='admin' :setting='setting.SettingKey'>
                    <label>{{camelCaseToSentanceCase(setting.SettingKey)}}</label>
                    <div class='input'>
                        <input :type=" (['true', 'false'].includes(setting.Value)) ? 'text' : 'checkbox'" :value="setting.Value" :checked='setting.Value'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button button-secondary' @click.prevent="e => updatePreferences(e, 'admin')">Save</button>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { CommonUtility } from '../assets/common';
import { locale } from '../assets/responses';

export default {
    methods: {
        camelCaseToSentanceCase: function(text) {
            var result = text.replace( /([A-Z])/g, " $1" );
            var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
            return finalResult
        },
        isEmpty: function(obj) {
            for(var prop in obj) {
                // eslint-disable-next-line no-prototype-builtins
                if(obj.hasOwnProperty(prop)) {
                return false;
                }
            }
        return JSON.stringify(obj) === JSON.stringify({});
        }
    },
    
    setup() {
        const state = reactive({
            expanded: {
                preferences: false,
                personalDetails: false,
                adminControls: false
            },
            errors: [],
            loading: true,

            preferences: {},
            admin: {},
            personal: {}
            
        })

        function expand(e) {
            let element = e.target.closest('.panel');
            let panelName = element.getAttribute('panelName');
            if (!state.expanded[panelName]) {
                state.expanded[panelName] = true;
            }
        }
    
        function close(tab, e) {
            let element = e.target.closest('.panel');
            state.expanded[tab] = false;
            element.setAttribute('expanded', false);
        }

        function populatePreferences(preferences, admin) {
            state.preferences = {
                ...state.preferences,
                 ...preferences
                 };
            state.admin = {
                ...state.admin,
                ...admin
                };
        }

        function populatePersonal(personal) {
                state.personal = {
                ...state.personal,
                ...personal
            }
        }

        async function personalDetailsCallback(data, err) {
            if (!err) {
                let responseJson = await data.json();
                let personal = []

                Object.keys(responseJson).forEach(key => {
                    if (!key.startsWith("_", 0)) {
                        personal.push(
                            {
                                "SettingKey": key,
                                "Value": responseJson[key]
                            }
                        )
                    }
                });
                populatePersonal(personal)

            } else  {
                let errorCode = locale.en.default;
                if (data.status == 400) {
                    errorCode = await data.text()
                } else {
                    errorCode = locale.en[data.status] ? locale.en[data.status] : data.statusText
                }
                state.errors.push(errorCode);
            }

        }

        async function callback(data, err) {
            if (!err) {
                let responseJson = await data.json();
                let pref = [];
                let admin = [];

                Object.keys(responseJson).forEach(key => {
                    if (key.startsWith("preferences_", 0)) {
                        pref.push(
                            {
                                "SettingKey": key.replace('preferences_', ''),
                                "Value": responseJson[key]
                            }
                        )
                    }
                    if (key.startsWith("admin_", 0)) {
                        admin.push(
                            {
                                "SettingKey": key.replace('admin_', ''),
                                "Value": responseJson[key]
                            }
                        )
                    }
                });

                populatePreferences(pref, admin);

            } else  {
                let errorCode = locale.en.default;
                if (data.status == 400) {
                    errorCode = await data.text()
                } else {
                    errorCode = locale.en[data.status] ? locale.en[data.status] : data.statusText
                }
                state.errors.push(errorCode);
            }

        }

        async function getPreferencesFromAPI() {
            

            // Fetch preferences
            fetch(CommonUtility.config.api.BASE_URL + '/preferences', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token}
            })
            .then(data => callback(data, !data.ok))
            .catch(err => callback(err, true));

            // Fetch personal details
            const result = await fetch(CommonUtility.config.api.BASE_URL + '/users/me', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token}
            })

            personalDetailsCallback(result, !result.ok);
        }

        onMounted(() => {
            getPreferencesFromAPI()
        });

        async function updatePreferences(event, catagory) {
            state.loading = true;
            const inputs = document.querySelectorAll(`.config-list-item[pre=${catagory}]`);

            let payload = {
                type: catagory
            };

            inputs.forEach(element => {
                let settingName = element.getAttribute('setting');
                payload[ (payload.type == 'personal' ? '' : (catagory + "_"))+ settingName] = element.querySelector('input').value
            });

            // Update preferences
            await fetch(CommonUtility.config.api.BASE_URL + '/preferences', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token 
                    },
                body: JSON.stringify(payload)
            });

            location.reload();

        }

        return {
            expand,
            state,
            close,
            updatePreferences
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

                    &.hidden {
                        opacity: 0;
                    }

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

