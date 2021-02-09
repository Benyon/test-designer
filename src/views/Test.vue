<template>
  <div class="test">
    <p class="form-message error" v-for="(error, index) in state.errors" :key="index">{{error}}</p>
    <form v-if='state.loaded' @submit.prevent="blurAll">
        <div class="header-container">
            <input type="submit" style="display: none!important" id="dummy"/>
            <router-link :to='{name: "Library"}'>
                <button class='button button-secondary'>Go Back</button>  
            </router-link> 
            <button class='save button button-secondary' :disabled='!state.edited' @click='save'>
                <p :class='{ "fadeOut": state.saving }' >Save</p>
                <div :class='{ "fadeIn": state.saving }' class="button-spinner loader space-xxl spinner spinner-xs"></div> 
            </button>   
            <input id="testName" v-if="state.testName!=null"  type='text' class='title' :value='state.testName' @input="state.edited = true"/>
        </div>
        <span class='bracket'></span>
        <div class="description">
            <h3>Description:</h3>
            <textarea rows=5 id="testDesc" v-if="state.testDesc!=null" class='description' :value="state.testDesc" @input="state.edited = true"/>
        </div>
    </form>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { CommonUtility } from '../assets/common';

export default {
    props: ['user'],

    setup() {
        const queryForAttributes = 'input:not(#dummy), textarea';
        const pseudoSavingTimer = 1000;
        const route = useRoute();
        const state = reactive({
            errors: [],
            loaded: false,
            edited: false,
            saving: false,
            testId: "",
            testName: "Loading Test...",
            testDesc: "Loading Description..."
        });

        async function submitChanges() {
            state.edited = true;
        }

        function finishSaving() {
            setTimeout(()=> {
                state.saving = false;
            }, pseudoSavingTimer)
        }

        function validateFields() {
            let foundIssue = false;
            document.querySelectorAll(queryForAttributes).forEach(element => {
                if (element.value.length < 5) {
                    element.classList.add("error");
                    foundIssue = true;
                } else {
                    element.classList.remove("error");
                }
            });

            state.validating = true;
            return foundIssue;
        }

        async function save() {
            state.errors = []
            state.saving = true;
            state.validating = false;


            document.querySelectorAll(queryForAttributes).forEach(element => {
                state[element.id] = element.value;
            }) 

            if (validateFields()) {
                state.saving = false;
                return;
            }

            const response = await fetch(CommonUtility.config.api.BASE_URL + "/test", {
                method: "put",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
                body: JSON.stringify({
                    "testId": state.testId,
                    "testName": state.testName,
                    "testDesc": state.testDesc
                })
            });

            if (!response.ok) {
                state.errors.push(await response.text());
            }

            finishSaving();
        }

        async function blurAll() {
            document.querySelectorAll(queryForAttributes).forEach(element => element.blur());
        }

        async function pullDownTestInformation() {
            state.errors = []
            const response = await fetch(`${CommonUtility.config.api.BASE_URL}/test?id=${state.testId}`, {
                method: "get",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
            });

            if (!response.ok) {
                state.errors.push(await response.text());
                return;
            }

            const json = await response.json();
            state.testName = json.name;
            state.testDesc = json.description;
            state.loaded = true;
        }

        onBeforeMount(() => {
            state.testId = route.params.testId;
            pullDownTestInformation();
        })

        return {
            save,
            state,
            blurAll,
            submitChanges
        }
    }
}
</script>





<style lang="scss" scoped>

input + span::after{
    content: '✎'
}

button.save {

    padding-top: 7px;
    width: 75px;

    p {
        position: absolute;
        margin: 0;
        padding: 0;
    }

    .button-spinner {
        margin-top: 2px;
        height: 100%;
        width: 100%
    }

}


.bracket {
    display: inline-block;
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0, 0.1);
    vertical-align: middle;
    position: relative;
}


button.save {

    & * {
        transition: opacity 0.25s;
    }

    .button-spinner:not(.fadeIn) {
        opacity: 0!important;
    }

    .fadeIn {
        opacity: 1!important;
    }

    .fadeOut {
        opacity: 0!important;
    }

}




div.description {

    h3 {
        margin-top: 2px;
    }
} 

.error {
    box-shadow: 0 1px 4px 1px rgba(241, 21, 21, 0.2);
    border-color: rgba(241, 21, 21, 0.5)!important;
}

input, textarea{
    margin-top: 5px;
    padding-left: 15px;

    .description {
        height: 250px;
    }

    &.title {
        font-size: 1.25rem;
        font-weight: 600;
    }

    &:not(:focus):not(.description) {
        border-color: #f6f6f6;
    }

    &:not(:focus) {
        background: #f6f6f600;
    }
}

.header-container {
    display: flex;
    margin-bottom: 10px;

    button {
        margin-top: 5px;
        margin-right: 15px;
        min-width: auto;
    }

}

</style>
