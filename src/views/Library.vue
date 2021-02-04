<template>
  <div class="library">
    <div class="header-container">
        <h1>My Library</h1>
        <button class='button button-secondary'>Create New Test</button>   
    </div>

    <div v-if='state.tests.length===0' class="no-tests">
        <p>It looks like there's nothing here, create a new test to get started!</p>
        <button class='button button-secondary'>Create New Test</button>
    </div>

    <div v-if='state.tests.length>0' class="tests-container">
        <div v-for='(test) in state.tests' :key='test.id' class="test-item" :id='test.id'>
            <h3>{{test.title}}</h3>
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
            tests: []
        })

        onMounted(() => {
            state.tests = API.library.tests;
        })

        return {
            state
        }
    }
}
</script>

<style lang="scss" scoped>

.header-container {
    display: flex;

    button {
        margin: 5px 0px 10px 25px;
    }
}

.tests-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    
    .test-item {
        
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