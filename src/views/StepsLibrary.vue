<template>
  <div v-if='state.loaded' class="steps">
    <div class="header-container">
        <h1>My Steps Library</h1>
        <button class='button button-secondary'>Create New Test Step</button>   
    </div>

    <div v-if='state.testCatagories.length===0' class="no-tests">
        <p style='margin-top: 25px'>It looks like there's nothing here, create a new test to get started!</p>
    </div>

    <div class='catagory-container' v-for='(catagory) in state.testCatagories' :key='catagory.catId' :catagory-id=" 'catagory' + catagory.catId ">
        <div v-if="catagory.tests.length > 0" class="catagory-wrapper">
            <span class='catagory-header'> 
                <h3>{{catagory.catName}}</h3>
            </span>

            <div v-if='catagory.tests.length>0' class="tests-container">
 
                <router-link :d='test.id' class="test-item" v-for='(test, index) in catagory.tests' :key="index" :to="{ name: 'Test', params: { testId: test.id }}">
                    <strong>{{ test.name }}</strong>
                </router-link>

            </div>  
        </div>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { API } from '../assets/fakeAPI'

export default {
    setup() {
        const state = reactive({
            testCatagories: [],
            loaded: false
        })

        onMounted(() => {
            state.testCatagories = API.library.tests.catagories;    // Returns array of objects
            state.loaded = true;
        })

        return {
            state
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