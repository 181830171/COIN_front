const getters={
    //NeoEntity
    allEntitiesAndRelations:state=>state.NeoEntity.allEntitiesAndRelations,
    addNeoEntityParams:state=>state.NeoEntity.addNeoEntityParams,
    addRelateByIdParams:state=>state.NeoEntity.addRelateByIdParams,
    currentNeoEntity:state=>state.NeoEntity.currentNeoEntity,
	currentCategory:state=>state.NeoEntity.currentCategory,
	currentRelation:state=>state.NeoEntity.currentRelation,
    searchResult:state=>state.NeoEntity.searchResult,
    searchHistories:state=>state.NeoEntity.searchHistories,
	globalNodeFontSize:state=>state.NeoEntity.globalNodeFontSize,
	globalRelFontSize:state=>state.NeoEntity.globalRelFontSize,
	globalIsShowNodeLabel:state=>state.NeoEntity.globalIsShowNodeLabel,
	globalIsShowRelLabel:state=>state.NeoEntity.globalIsShowRelLabel,
    questionAnswer:state=>state.NeoEntity.questionAnswer
}
export default getters