import{
    addNeoEntityAPI,
    deleteNeoEntityByIdAPI,
    updateNeoEntityByEntityAPI,
    getNeoEntityByIdAPI,
    addRelateByIdAPI,
    deleteRelateByIdAPI,
    getListAllAPI,
    updateRelAPI,
	addCategoryAPI,
	updateCategoryAPI,
	updateRelSymbolAPI,
    searchNodesAPI,
    getSearchHistoriesAPI
}from '../../api/NeoEntity.js'
const NeoEntity={
    state:{
        allEntitiesAndRelations:{
			categories: [],
			nodes: [],
			links:[],
		},
        addNeoEntityParams:{
            name:"",
            des:"",
            category:0
        },
        currentNeoEntity:{},
		currentRelation:{
			id:-1,
			source:'',
			target:'',
			name:'',
			des:'',
			lineStyle:{
				type:'',
			},
			symbol:['','']
		},
		currentCategory:{
			categoryId:-1,
			name:'',
			itemStyle:{
				color:'#000000'
			}
		},
        addRelateByIdParams:{
            from:0,
            to:0,
            isSolid:true,
            des:"",
            name:""
        },
        searchResult:[],
        searchHistories:[]
    },
    mutations:{
        set_addNeoEntityParams:function(state,data){
            state.addNeoEntityParams=data
            }
        ,
        set_searchResult:function(state,data){
            state.searchResult=[]
            state.searchResult=data
        },
        set_addRelateByIdParams:function(state,data){
            state.addRelateByIdParams=data
        },
        set_listAll:function(state,data){
            state.allEntitiesAndRelations=data;
            //console.log("data:",data);
        },
        set_currentNeoEntity:function (state,data){
            state.currentNeoEntity=data;
        },
		set_currentRelation:function(state, data){
			state.currentRelation = data;
		},
		set_currentCategory:function(state, data){
			state.currentCategory = data;
		},
        //设置历史记录
        set_searchHistories:function(state,data){
            state.searchHistories=data
        }
    },
    actions:{
        getListAll: async ({commit})=>{
            const res= await getListAllAPI()
            if(res){
                //console.log("res:",res);
                commit('set_listAll',res)
            }else{
                swal('系统提示','大失败','error')
            }
        },
        addNeoEntity: async ({state,commit,dispatch},data)=>{
            const res=await addNeoEntityAPI(data)
            if(res){
                // alert("成功")
				swal('系统提示','添加节点成功','success')
                dispatch('getListAll')
                //console.log(state.allEntitiesAndRelations)
            }else{
                alert("失败极了")
            }
        },
        addRelateById: async ({state,commit,dispatch},data)=>{
            const res=await addRelateByIdAPI(data.from,data.to,data.isSolid,data.des,data.name)
            if(res){
                dispatch('getListAll')
                // console.log("成功")
				swal('系统提示','添加关系成功','success')
                //commit('set_addRelateById',data)
                //alert("成功添加关系")
            }else {
                //alert("添加关系失败")
				swal('系统提示','添加关系失败','error')
            }
        },
        deleteNeoEntityById:async ({state,dispatch},data)=>{
            const res=await deleteNeoEntityByIdAPI(data.id);
            if(res){
                dispatch('getListAll')
                swal('系统提示',"成功删除节点",'success')
            }else{
                swal('系统提示','删除节点失败','error')
            }
        },
        deleteRelateById:async ({state,dispatch},id)=>{
            const res=await deleteRelateByIdAPI(id);
            if(res){
                dispatch('getListAll')
                // alert("成功删除关系")
				swal('系统提示','删除关系成功','success')
                console.log("成功删除关系")
            }else{
                console.log("删除关系失败")
                // alert("删除关系失败")
				swal('系统提示','删除关系失败','error')
            }
        },
        updateNeoEntityByEntity:async ({state,dispatch,commit},data)=>{
            const res=await updateNeoEntityByEntityAPI(data);
            if(res){
                dispatch('getListAll')
                commit('set_currentNeoEntity',res)

				swal('系统提示','更新实体成功','success')
            }else{
                // alert("更新实体失败")
				swal('系统提示','更新实体失败','error')
            }
        },
		updateNeoEntityByCategory:async({state,dispatch,commit},new_name)=>{
			// const data_current_category = {
			// 	categoryId:state.currentCategory.categoryId,
			// 	name:new_name,
			// 	itemStyle:state.currentCategory.itemStyle,
			// }
			var i = 0;
			for(i=0;i<state.allEntitiesAndRelations.categories.length;i++){
				if(state.allEntitiesAndRelations.categories[i].name==new_name){
					break;
				}
			}
			const data = {
				nodeId:state.currentNeoEntity.nodeId,
				name:state.currentNeoEntity.name,
				des:state.currentNeoEntity.des,
				symbolSize:state.currentNeoEntity.symbolSize,
				category:i,
				x:state.currentNeoEntity.x,
				y:state.currentNeoEntity.y,
				symbol:state.currentNeoEntity.symbol
			}
			const res = await updateNeoEntityByEntityAPI(data)
			if(res){
				dispatch('getListAll');
				commit('set_currentNeoEntity',res)
				commit('set_currentCategory',state.allEntitiesAndRelations.categories[i])
				// alert('成功更改种类')
				swal('系统提示','更改种类成功','success')
			}else{
				swal('系统提示','更改种类失败','error')
			}
		},
        getNeoEntityById:async ({state,commit},data)=>{
            const res=await getNeoEntityByIdAPI(data);
            if(res){
                commit('set_currentNeoEntity',res)
            }else{
                // alert("获取实体信息失败")
				swal('系统提示','获取实体信息失败','error')
            }
        },
        updateRelById:async ({state,dispatch},data)=>{
            const res=await updateRelAPI(data.id,data.name);
            if(res){
                dispatch('getListAll')
                // alert("成功更新关系")
				swal('系统提示','更新关系成功','success')
            }else{
                swal('系统提示','更新关系失败','error')
            }
        },
		addCategory:async({state,dispatch},data)=>{
			const res = await addCategoryAPI(data);
			if(res){
				dispatch('getListAll')
				// alert("成功添加种类")
				swal('系统提示','添加种类成功','success')
			}else{
				// alert("添加种类失败")
				swal('系统提示','添加种类失败','error')
			}
		},
		updateCategory:async({state,dispatch},data)=>{
			const res = await updateCategoryAPI(data);
			if(res){
				dispatch('getListAll')
				// alert("成功更新种类")
				swal('系统提示','种类更新成功','success')
			}else{
				// alert("更新种类失败")
				swal('系统提示','种类更新失败','error')
			}
		},
		updateRelSymbol:async({state,dispatch},data)=>{
			const res = await updateRelSymbolAPI(data.id, data.symbol);
			if(res){
				dispatch('getListAll')
				// alert('成功更新关系')
				swal('系统提示','更新关系成功','success')
			}else{
				// alert('更新关系失败')
				swal('系统提示','更新关系失败','error')
			}
		},
        //查找节点
        searchNodes:async ({state,commit},message)=>{
            const res=await searchNodesAPI(message);
            if(res.length!=0){
                console.log(res)
                commit('set_searchResult',res)
            }else{
                commit('set_searchResult',[])
                swal('系统提示','未找到相关节点','error')
            }
        },
        //获得搜索历史记录
        getSearchHistories:async({state,commit})=>{
            const res=await getSearchHistoriesAPI();
            if(res){
                console.log(res)
                commit("set_searchHistories",res)
            }else{
                swal('系统提示','错误','error')
            }
        }
    }
}
export default NeoEntity
