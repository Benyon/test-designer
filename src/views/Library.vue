<template>
  <div v-if='state.loaded' class="library">
    <div class="header-container">
        <h1>My Library</h1>
        <div class="new-test-wrapper">
            <button v-on:click="createNewTest" class='button button-secondary'>Create New Test</button>
            <div :class='{ "hidden": !state.spinner }' class="space-xxl spinner spinner-xs"></div> 
        </div>
    </div>

    <p class='form-message error' v-for="(error, index) in state.errors" :key="index">{{error}}</p>
    <div v-if='catagoriesEmpty' class="no-tests">
        <p style='margin-top: 25px'>It looks like there's nothing here, create a new test to get started!</p>
    </div>

    <div class='catagory-container' v-for='(catagory, index) in state.testCatagories' :key='index'>
        <div v-if="catagory.tests.length > 0" class="catagory-wrapper">
            <span class='catagory-header'> 
                <h3>{{catagory.name}}</h3>
            </span>

            <div v-if='catagory.tests.length>0' class="tests-container">
                <router-link class="test-item" v-for='(test, index) in catagory.tests' :key="index" :to="{ name: 'Test', params: { testId: test.id }} ">
                    <strong>{{ test.name }}</strong>
                </router-link>

            </div>  
        </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { CommonUtility } from '../assets/common'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter();
        const state = reactive({
            testCatagories: {},
            errors: [],
            loaded: false,
            spinner: false
        })

        const catagoriesEmpty = computed(() => {
            return Object.keys(state.testCatagories).length === 0;
        })

        async function createNewTest() {
            state.errors = [];
            state.spinner = true;
            const response = await fetch(CommonUtility.config.api.BASE_URL + "/tests/create", {
                method: "post",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
                body: JSON.stringify({
                    "name": "New Test",
                    "description": ""
                })
            })

            if (!response.ok) {
                state.errors.push(await response.text());
            }

            const json = await response.json()

            if (json.success) { 
                router.replace(`/test/${json.id}`)
            } else {
                state.errors = ["There's been an error creating your test."]
            }
        }

        onMounted(async () => {
            const response = await fetch(CommonUtility.config.api.BASE_URL + "/library", {
                method: "get",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token }
            });

            if (!response.ok) {
                state.errors.push(response.statusText);
            }
        
            const json = await response.json();

            json.forEach(obj => {
                const catagoryName = String(obj.catagory).trim() == "" ? "No Catagory" : obj.catagory;
                const testId = obj.testId;
                const testName = obj.name;

                // Create new if it doesn't exist.
                if (!state.testCatagories[catagoryName]) {
                    state.testCatagories[catagoryName] = {
                        name: catagoryName,
                        tests: []
                    }
                }

                state.testCatagories[catagoryName].tests.push({
                    id: testId,
                    name: testName
                })
            });
            state.loaded = true;
        })

        return {
            state,
            catagoriesEmpty,
            createNewTest
        }
    }
}
</script>

<style lang="scss" scoped>

a {
    text-decoration: none!important;
}

.header-container {
    display: flex;

    button {
        margin: 5px 0px 10px 25px;
    }
}

.new-test-wrapper {
    display: flex;

    .spinner {
        transition: all 0.5s;
        margin-top: -7px;
    }
}

.catagory-container {

    .catagory-header {

            h3 {
                margin-top: 15px;
                overflow: hidden;
                padding-left: 55px;
            }

            h3:before, h3:after {
                background-color: rgba(0, 0, 0, 0.1);
                content: "";
                display: inline-block;
                height: 1px;
                position: relative;
                vertical-align: middle;
                width: 50%;
            }

            h3:before {
                right: 0.5em;
                margin-left: -50%;
            }

            h3:after {
                left: 0.5em;
                margin-right: -50%;
                width: 100%;
            }
    }
}

.tests-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: left;
    
    .test-item {
        transition: all 0.125s ease;

        &:hover {
            opacity: 0.5;
        }

        h1, h2, h3, h4 {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        cursor: pointer;
        flex-wrap: wrap;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        padding: 25px;
        margin: 10px 25px 20px 0px;
        width: 30%;
        min-width: 300px;
    }
}

</style>