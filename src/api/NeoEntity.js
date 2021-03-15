import { axios } from '@/utils/request'

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
        id
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
        id
    })
}

//添加关系
export function addRelateByIdAPI(from,to,isSolid,des){
    return axios({
        url:'/addRelates',
        method:'POST',
        params:{from:from,to:to,isSolid:isSolid,des:des}
    })
}

//删除关系
export function deleteRelateByIdAPI(from,to){
    return axios({
        url:'/delRelate',
        method:'GET',
        params:{from:from,to:to}
    })
}

//获取所有实体关系信息
export function getListAllAPI(){
    return axios({
        url:`/getListAll`,
        method:'GET',
    })
}



