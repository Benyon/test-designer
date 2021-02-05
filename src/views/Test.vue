<template>
  <div class="test">
    <div class="header-container">
        <router-link :to='{name: "Library"}'>
            <button class='button button-secondary'>Go Back</button>   
        </router-link>
        <input v-if="state.name!=null" type='text' class='title' :value='state.name'/>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { API } from '../assets/fakeAPI'

export default {
    props: ['user'],

    setup() {
        const route = useRoute();
        const state = reactive({
            name: testName,
            testId: 0
        });

        const testName = computed(() => {
            let nameReturned = null;

            API.library.tests.catagories.forEach(catagory => {
                catagory.tests.forEach(test => {
                    if (test.id == state.testId) {
                        nameReturned = test.name;
                    }
                })
            });

            if (nameReturned) {
                return nameReturned;
            }

            return 'Sorry';
        })


        onBeforeMount(() => {
            state.testId = route.params.testId;
            state.name = testName;
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
            background: #f6f6f6;
            border-color: #f6f6f6;
        }
    }
}

</style>
