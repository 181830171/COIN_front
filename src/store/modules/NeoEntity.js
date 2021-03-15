import{
    addNeoEntityAPI,
    deleteNeoEntityByIdAPI,
    updateNeoEntityByEntityAPI,
    getNeoEntityByIdAPI,
    addRelateByIdAPI,
    deleteRelateByIdAPI,
    getListAllAPI,
}from '@/api/NeoEntity.js'
const NeoEntity={
    state:{
        allEntitiesAndRelations:{},
        addNeoEntityParams:{
            name:"",
            des:""
        },
        currentNeoEntity:{},
        addRelateByIdParams:{
            from:0,
            to:0,
            isSolid:true,
            des:""
        }
    },
    mutations:{
        set_addNeoEntityParams:function(state,data){
            state.addNeoEntityParams=data
            }
        ,
        set_addRelateByIdParams:function(state,data){
            state.addRelateByIdParams=data
        },
        set_listAll:function(state,data){
            state.allEntitiesAndRelations=data;
            console.log("data:",data);
        },
        set_currentNeoEntity:function (state,data){
            state.currentNeoEntity=data;
        }

    },
    actions:{
        getListAll: async ({state,commit})=>{
            const res= await getListAllAPI()
            if(res){
                console.log("res:",res);
                commit('set_listAll',res)
            }else{
                alert("大失败！")
            }
        },
        addNeoEntity: async ({state,commit,dispatch},data)=>{
            const res=await addNeoEntityAPI(data)
            if(res){
                dispatch('getListAll')
                alert("成功")
            }else{
                alert("失败极了")
            }
        },
        addRelateById: async ({state,commit,dispatch},data)=>{
            const res=await addRelateByIdAPI(data.from,data.to,data.isSolid,data.des)
            if(res){
                dispatch('getListAll')
                //commit('set_addRelateById',data)
                alert("成功添加关系")
            }else {
                alert("添加关系失败")
            }
        },
        deleteNeoEntityById:async ({state,dispatch},data)=>{
            const res=await deleteNeoEntityByIdAPI(data);
            if(res){
                dispatch('getListAll')
                alert("成功删除节点")
            }else{
                alert("删除节点失败")
            }
        },
        deleteRelateById:async ({state,dispatch},data)=>{
            const res=await deleteRelateByIdAPI(data.from,data.to);
            if(res){
                dispatch('getListAll')
                alert("成功删除关系")
            }else{
                alert("删除关系失败")
            }
        },
        updateNeoEntityByEntity:async ({state,dispatch,commit},data)=>{
            const res=await updateNeoEntityByEntityAPI(data);
            if(res){
                dispatch('getListAll')
                commit('set_currentNeoEntity',res)
                alert("成功更新实体")
            }else{
                alert("更新实体失败")
            }
        },
        getNeoEntityById:async ({state,commit},data)=>{
            const res=await getNeoEntityByIdAPI(data);
            if(res){
                commit('set_currentNeoEntity',res)
            }else{
                alert("获取实体信息失败")
            }
        },
    }
}
export default NeoEntity