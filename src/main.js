import axios from 'axios'
import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
createApp(App).use(store).use(router).use(vuex).mount('#app')
// Vue.prototype.$axios=axios
// axios.defaults.baseURL='/api'
