import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import './styles/global.scss';

const firebaseConfig = {
    apiKey: "AIzaSyAvAmlU_4vJVaQVIEKkOsn7GjL9CT0XN2Q",
    authDomain: "vue-test-designer.firebaseapp.com",
    projectId: "vue-test-designer",
    storageBucket: "vue-test-designer.appspot.com",
    messagingSenderId: "450616751302",
    appId: "1:450616751302:web:02d62f738a58807df553c7"
};

firebase.initializeApp(firebaseConfig);
createApp(App).use(store).use(router).mount('#app')
