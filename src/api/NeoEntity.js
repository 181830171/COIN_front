import { axios } from '../utils/request'

//添加实体
export function addNeoEntityAPI(data){
    return axios({
        url:`/addNeoEntity`,
        method:'POST',
        data
    })
}

//删除节点和节点有关的关系
export function deleteNeoEntityByIdAPI(id){
    return axios({
        url:`/delete`,
        method:'GET',
        params:{id:id},
    })
}

//修改实体信息
export function updateNeoEntityByEntityAPI(data){
    return axios({
        url:`/update`,
        method:'POST',
        data
    })
}

//根据id获取实体
export function getNeoEntityByIdAPI(id){
    return axios({
        url:`/get`,
        method:'GET',
        params:{id:id}
    })
}

//添加关系
export function addRelateByIdAPI(from,to,isSolid,des,name){
    return axios({
        url:'/addRelates',
        method:'POST',
        params:{from:from,to:to,isSolid:isSolid,des:des,name:name}
    })
}

//删除关系
export function deleteRelateByIdAPI(id){
    return axios({
        url:'/delRelate',
        method:'GET',
        params:{id:id}
    })
}

//获取所有实体关系信息
export function getListAllAPI(){
    return axios({
        url:`/getListAll`,
        method:'GET',
    })
}

//更新关系名称
export  function updateRelAPI(id,name){
    return axios({
        url:`updateRel`,
        method:'GET',
        params:{id:id,name:name}
    })
}



