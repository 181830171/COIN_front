import{
    addNeoEntityAPI,
    addRelateByIdAPI,
    getListAllAPI
}from '@/api/NeoEntity.js'
import {addRelateByIdAPI} from "../../api/NeoEntity";
const NeoEntity={
    state:{
        allEntitiesAndRelations:{},
        addNeoEntityParams:{
            name:"",
            des:""
        },
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
            state.allEntitiesAndRelations=data
        }

    },
    actions:{
        getListAll:async ({state,commit})=>{
            const res=await getListAllAPI()
            if(res){
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
                alert("")
            }
        }
    }
}
export default NeoEntity