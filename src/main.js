// import Vue from 'vue';
import axios from 'axios'
import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import {Form} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import vcolorpicker from 'vcolorpicker'
import qs from 'qs'
import swal from 'sweetalert'

const app = createApp(App)
app.use(store).use(router).use(Antd).use(vuex).use(qs)
// app.prototype.$form = Form
app.mount('#app')
// createApp(App).use(store).use(router).use(Antd).use(vuex).use(qs).mount('#app')
// Vue.use(Antd)
// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import Vuex from 'vuex'
// import App from './App'
// import router from './router'
// import store from './store'
// import ant from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// Vue.config.productionTip = false
// Vue.use(Vuex)
// Vue.use(ant)
// // Vue.use(VueRouter)
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>',
// })
