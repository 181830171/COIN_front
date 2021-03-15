import { axios } from '@/utils/request'

export function addNeoEntityAPI(data){
    return axios({
        url:`/addNeoEntity`,
        method:'POST',
        data
    })
}
export function getListAllAPI(){
    return axios({
        url:`/getListAll`,
        method:'GET',
    })
}
// export function deleteNeoEntityByIdAPI(){
//     return axios({
//         url:`/delete`,
//         method:'GET',
//         id
//     })
// }
//
// export function updateNeoEntityByEntityAPI(){
//     return axios({
//         url:`/update`,
//         method:'POST',
//         data
//     })
// }
//
// export function getNeoEntityByIdAPI(){
//     return axios({
//         url:`/get`,
//         method:'GET',
//         id
//     })
// }
//
export function addRelateByIdAPI(from,to,isSolid,des){
    return axios({
        url:'/addRelates',
        method:'POST',
        params:{from:from,to:to,isSolid:isSolid,des:des}
    })
}

// export function deleteRelateByIdAPI(){
//     return axios({
//         url:'/delRelate',
//         method:'GET',
//         data
//     })
// }