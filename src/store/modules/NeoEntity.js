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
        searchResult:[]
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
		}

    },
    actions:{
        getListAll: async ({commit})=>{
            const res= await getListAllAPI()
            if(res){
                //console.log("res:",res);
                commit('set_listAll',res)
            }else{
                alert("大失败！")
            }
        },
        addNeoEntity: async ({state,commit,dispatch},data)=>{
            const res=await addNeoEntityAPI(data)
            if(res){
                alert("成功")
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
                console.log("成功")
                //commit('set_addRelateById',data)
                //alert("成功添加关系")
            }else {
                //alert("添加关系失败")
            }
        },
        deleteNeoEntityById:async ({state,dispatch},data)=>{
            const res=await deleteNeoEntityByIdAPI(data.id);
            if(res){
                dispatch('getListAll')
                alert("成功删除节点")
            }else{
                alert("删除节点失败")
            }
        },
        deleteRelateById:async ({state,dispatch},id)=>{
            const res=await deleteRelateByIdAPI(id);
            if(res){
                dispatch('getListAll')
                alert("成功删除关系")
                console.log("成功删除关系")
            }else{
                console.log("删除关系失败")
                alert("删除关系失败")
            }
        },
        updateNeoEntityByEntity:async ({state,dispatch,commit},data)=>{
            const res=await updateNeoEntityByEntityAPI(data);
            if(res){
                dispatch('getListAll')
                commit('set_currentNeoEntity',res)
                //alert("成功更新实体")
                //console.log(data)
            }else{
                alert("更新实体失败")
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
				alert('成功更改种类')
			}else{
				alert('更改种类失败')
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
        updateRelById:async ({state,dispatch},data)=>{
            const res=await updateRelAPI(data.id,data.name);
            if(res){
                dispatch('getListAll')
                alert("成功更新关系")
            }else{
                alert("删除关系失败")
            }
        },
		addCategory:async({state,dispatch},data)=>{
			const res = await addCategoryAPI(data);
			if(res){
				dispatch('getListAll')
				alert("成功添加种类")
			}else{
				alert("添加种类失败")
			}
		},
		updateCategory:async({state,dispatch},data)=>{
			const res = await updateCategoryAPI(data);
			if(res){
				dispatch('getListAll')
				alert("成功更新种类")
			}else{
				alert("更新种类失败")
			}
		},
		updateRelSymbol:async({state,dispatch},data)=>{
			const res = await updateRelSymbolAPI(data.id, data.symbol);
			if(res){
				dispatch('getListAll')
				alert('成功更新关系')
			}else{
				alert('更新关系失败')
			}
		},
        //查找节点
        searchNodes:async ({state,commit},message)=>{
            const res=await searchNodesAPI(message);
            if(res){
                console.log(res)
                commit('set_searchResult',res)
            }else{
                alert("未找到相关节点")
            }
        },
        //获得搜索历史记录
        getSearchHistories:async({state})=>{
            const res=await getSearchHistoriesAPI();
            if(res){
                console.log("history",res)
            }else{
                console.log("error")
            }
        }
    }
}
export default NeoEntity
