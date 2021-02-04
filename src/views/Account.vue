<template>
  <div class="account">
    <h1>My Account</h1>
    <p>Hello Jordan, you can manage your profile settings from here.</p>

    <div class="panel-container">

        <div v-on:click="expand" panelName="preferences" class="panel expandable preferences-panel" :expanded='state.expanded.preferences ? true : false'>
            <h4>Peferences<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.preferences" :key='index' class="config-list-item">
                    <label>{{setting.settingName}}</label>
                    <div class='input'>
                        <input :type="setting.type" :value="setting.current" :checked='setting.current'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button button-secondary'>Save</button>
                </div>
            </div>
        </div>


        <div v-on:click="expand" panelName="personalDetails" class="panel expandable details-panel" :expanded='state.expanded.personalDetails ? true : false'>
            <h4 >Personal Details<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.personalDetails" :key='index' class="config-list-item">
                    <label>{{setting.settingName}}</label>
                    <div class='input'>
                        <input :type="setting.type" :value="setting.current" :checked='setting.current'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button button-secondary'>Save</button>
                </div>
            </div>
        </div>


        <div  v-on:click="expand" panelName="adminControls" class="panel expandable admin-panel" :expanded='state.expanded.adminControls ? true : false'>
            <h4>Admin Controls<em>click to expand</em></h4>
            <div class="panel-container__contents-wrapper">
                <p class='form-message error' style='margin-bottom: 2rem;'>Key features are still in development and are likely unstable.</p>
                <div v-for="(setting, index) in state.adminControls" :key='index' class="config-list-item">
                    <label>{{setting.settingName}}</label>
                    <div class='input'>
                        <input :type="setting.type" :value="setting.current" :checked='setting.current'>
                    </div>
                </div>
                <div class="buttons">
                    <button class='button button-secondary'>Save</button>
                </div>
            </div>
        </div>

        
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { API } from '../assets/fakeAPI'

export default {

    setup() {
        const state = reactive({
            expanded: {
                preferences: false,
                personalDetails: false,
                adminControls: false
            },

            preferences: API.account.preferences,
            personalDetails: API.account.personalDetails,
            adminControls: API.account.adminControls
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
            console.log(element)
            state.expanded[tab] = false;
            element.setAttribute('expanded', false);
        }

        return {
            expand,
            state,
            close
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

                button {
                    margin-right: 15px;
                }
            }
        }
    }
}

</style>

