import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '': 'http://localhost:8080',
    withCredentials: true
})
console.log(process.env.NODE_ENV)

const err=(error)=>{
    if(error.response){
        alert("something is wrong")
    }
    return Promise.reject(error)
}
//request incerceptor
service.interceptors.request.use((config) => {
    const requestConfig = {
        ...config,
        url: `${config.url}`,
    }
    return requestConfig
}, err)

service.interceptors.response.use((response) => {
    switch (response.status) {
        case 200:
            if(response.data.success && response.data.success){
                return response.data.content
            }
            break
        case 404:
            alert("something is wrong")
            return false
        default:
            alert("i can not think any")
    }
})

const installer = {
    vm: {},
    install (Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}
