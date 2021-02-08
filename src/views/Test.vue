<template>
  <div class="test">
    <div class="header-container">
        <router-link :to='{name: "Library"}'>
            <button class='button button-secondary'>Go Back</button>   
        </router-link>
        <input v-if="state.testName!=null" type='text' class='title' :value='state.testName'/>
    </div>
    <div class="description">
    <p style='margin-top: 25px'>{{state.testDesc}}</p>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { CommonUtility } from '../assets/common';

export default {
    props: ['user'],

    setup() {
        const route = useRoute();
        const state = reactive({
            errors: [],
            testId: 0,
            testName: "Loading Test...",
            testDesc: "Loading Description..."
        });

        async function pullDownTestInformation() {
            state.errors = []
            const response = await fetch(`${CommonUtility.config.api.BASE_URL}/test?id=${state.testId}`, {
                method: "get",
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.token },
            });

            if (!response.ok) {
                state.errors.push(await response.text());
            }

            const json = await response.json();
            state.testName = json.name;
            state.testDesc = json.description;
        }

        onBeforeMount(() => {
            state.testId = route.params.testId;
            pullDownTestInformation();
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
        margin-top: 5px;
    }
    
    input {
        margin-top: 5px;
        padding-left: 10px;
        margin-left: 15px;

        font-size: 1.25rem;
        font-weight: 600;

        &:not(:focus) {
            background: #f6f6f600;
            border-color: #f6f6f6;
        }
    }
}

</style>
