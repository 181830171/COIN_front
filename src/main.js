// import Vue from 'vue';
import axios from 'axios'
import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'


createApp(App).use(store).use(router).use(Antd).use(vuex).mount('#app')
