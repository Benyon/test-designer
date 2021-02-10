<template>
  <div v-if='state.loaded' class="library">
    <p class='form-message error' v-for="(error, index) in state.errors" :key="index">{{error}}</p>
    <div class="header-container">
        <h1>My Test Steps</h1>

    </div>

    <p style='margin-top: 5px'>To create a test step, first open a test from your library and start adding steps.</p>

    <div class="grid list-container">
        <div class="content-col">
            <div class="test-step-list">

                <span class="header f-width">
                    <div class='header-wrapper'>
                        <svg fill="currentColor" viewBox="0 0 20 20" class='icon'><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                        <h6>Tests</h6>
                    </div>
                </span>

                <div class='teststep-item-wrapper'> 
                    <div v-for='(teststep, index) in state.mockTests' :key='index' class="teststep-item">
                        <a href='#'>{{teststep.name}}</a>
                        <p class="date">created: {{teststep.date}}</p>
                    </div>
                </div>
            </div>
            <div class="pages">
                <button class='small'>1</button>
                <button class='small'>2</button>
                <button class='small'>3</button>
            </div>
        </div>

        <div class="filter-col">
            <div class="test-filter-list">
                <form class='filter' @submit.prevent="">
                    <h3>Find Test</h3>
                    <label for='filterName'>Step Name</label>
                    <input name='filterName' type='text'/>
                    <div class="buttons" style="margin-top: 15px;">
                        <button class='button button-secondary button-border'>Filter</button>
                        <button class='button button-secondary button-border'>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { CommonUtility } from '../assets/common'

export default {
    setup() {
        const state = reactive({
            testStepCatagories: {},
            errors: [],
            loaded: false,
            spinner: false,
            mockTests: [
                {
                    name: "I login as a premium user.",
                    date: "12/12/2020"
                },
                {
                    name: "I log in as standard user.",
                    date: "10/02/2021"
                },
                {
                    name: "I sign up as a premium user.",
                    date: "28/01/2021"
                },
                {
                    name: "I sign up as a standard user.",
                    date: "17/10/2021"
                },
                {
                    name: "I log in as site admin.",
                    date: "02/12/2021"
                }
            ]
        })

        const testsStepsEmpty = computed(() => {
            return Object.keys(state.testStepCatagories).length === 0;
        })

        // Populate test steps
        onMounted(async () => {

            // Get at test steps enmdpoint
            const response = await fetch(CommonUtility.config.api.BASE_URL + "/teststeps?=USERID", {
                method: "get",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token }
            });

            if (!response.ok) {
                //state.errors.push(response.statusText);
                state.loaded = true;
                return
            }
        
            const json = await response.json();

            // from the respons, apply the values to catagorys which contain the tests
            json.forEach(obj => {
                console.log(obj)
            });

            state.loaded = true;
        })

        return {
            state,
            testsStepsEmpty
        }
    }
}
</script>

<style lang="scss" scoped>

.header-container {
    display: flex;
}

.list-container {
    margin-top: 25px;
}

.f-width {
    display: inline-block;
    width: 100%;
}

.filter {
    
    .buttons button {
        margin-right: 10px;
    }
}

.grid {
    display: grid;
    grid-template-columns: repeat(4,minmax(0,1fr));



    .content-col {
        grid-column: span 3/span 3;
        padding-right: 25px;

        .pages {
            
            button {
                margin: 2px;
                margin-top: 10px;
                padding: 0;

                min-width: 0px;

                width: 20px!important;
                height: 20px;

                font-size: 12px;
                font-weight: 400;
            }

        }

        .test-step-list {
            display: flex;
            flex-direction: column;
            background-color: white;
            border: 1px solid #e4e4e4;
            border-radius: 3px;

            .header {
                background-color: #f6f6f6;
                height: 3rem;
                border-bottom: 1px solid #e4e4e4;

                .header-wrapper {
                    
                    margin-top: 0.76rem;
                    display: flex;
                    height: 50%;

                    .icon {
                        height: 100%;
                        margin-left: 5px;
                        opacity: 0.4;
                    }

                    h6 {
                        margin-top: 2px;
                        opacity: 0.8;
                    }
                }

            }

            .teststep-item-wrapper {
                display: flex;
                flex-direction: column;

                .teststep-item {
                    display: flex;
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    padding: 0.25rem 20px;

                    a { 
                        flex-grow: 1;
                        color: rgba(127,25,230, 0.9);
                        font-weight: 600;
                        text-decoration: none;
                    }

                    p {
                        margin: 0;
                        opacity: 0.2;
                        font-size: 14px;
                        font-style: italic;
                    }
                }

            }
        }
    }

    .filter-col {
        grid-row-start: auto;

         .test-filter-list {
            display: flex;
            flex-direction: column;
            background-color: white;
            border: 1px solid #e4e4e4;
            border-radius: 3px;
            padding: 25px;
         }
    }
}

</style>