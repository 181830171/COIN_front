import {describe, expect, it, jest} from "@jest/globals";

import NeoEntity from '../src/store/modules/NeoEntity';
import store from "../src/store/index";
//jest.mock('../src/store/modules/NeoEntity')


describe("actions",()=>{
    it("获取所有信息",async ()=>{
        let res=await store.dispatch('getListAll');
        // expect(NeoEntity.state.allEntitiesAndRelations.nodes.length).toBe(24);
        // expect(NeoEntity.state.allEntitiesAndRelations.links.length).toBe(23);
        // expect(NeoEntity.state.allEntitiesAndRelations.categories.length).toBe(3);
        expect(NeoEntity.state.allEntitiesAndRelations).toBeDefined()
    })
    it("增加实体",async ()=>{
        let data={
            name:"小王",
            des:"真好",
            category:1
        }
        global.alert=jest.fn()
        let res=await store.dispatch('addNeoEntity',data);
        let res1=await store.dispatch('getListAll');
        var result=false
        var i;
        for(i of NeoEntity.state.allEntitiesAndRelations.nodes){
            if(i.name=="小王"){
                result=true
                break
            }
        }
        expect(result).toBe(true)
    })
    it("增加关系",async ()=>{
        let res2=await store.dispatch('getListAll');
        let data={
            from:NeoEntity.state.allEntitiesAndRelations.nodes[0].nodeId,
            to:NeoEntity.state.allEntitiesAndRelations.nodes[1].nodeId,
            isSolid:true,
            des:"",
            name:"姐妹"
        }
        global.alert=jest.fn()
        let res=await store.dispatch("addRelateById",data);
        let res3=await store.dispatch('getListAll')
        var result=false
        var i;
        for(i of NeoEntity.state.allEntitiesAndRelations.links){
            if(i.name=="姐妹"){
                result=true
                break
            }
        }
        expect(result).toBe(true)
    })
    it("删除实体",async ()=>{
        let res=await store.dispatch('getListAll');
        var t=NeoEntity.state.allEntitiesAndRelations.nodes[1].name;
        global.alert=jest.fn()
        var result=false;
        var i;
        let res1=await store.dispatch("deleteNeoEntityById",{id:NeoEntity.state.allEntitiesAndRelations.nodes[1].nodeId})
        let res3=await store.dispatch('getListAll');
        for(i of NeoEntity.state.allEntitiesAndRelations.nodes){
            if(i.name==t){
                result=true;
                break
            }
        }
        expect(result).toBe(false);
    })
    it("删除关系",async ()=>{
        let res=await store.dispatch('getListAll');
       console.log(NeoEntity.state.allEntitiesAndRelations.links)
        global.alert=jest.fn()
        var source=NeoEntity.state.allEntitiesAndRelations.links[0].source;
        var to=NeoEntity.state.allEntitiesAndRelations.links[0].target;
        let res1=await store.dispatch('deleteRelateById',NeoEntity.state.allEntitiesAndRelations.links[0].id);
        let res3=await store.dispatch('getListAll');
        console.log(NeoEntity.state.allEntitiesAndRelations.links);
        var i;
        var result=false;
        for(i of NeoEntity.state.allEntitiesAndRelations.links){
            if(i.source==source && i.target==to){
                result=true;
            }
        }
        expect(result).toBe(false)
    })
    it("更新实体",async ()=>{
        let res=await store.dispatch('getListAll')
        let t=NeoEntity.state.allEntitiesAndRelations.nodes[0]
        const data={
            name: "新名称",
            nodeId: t.nodeId,
            des: "新描述",
            category: t.category,
            symbolSize: t.symbolSize,
            x: t.x,
            y: t.y
        }
        let res1=await store.dispatch("updateNeoEntityByEntity",data)
        let res2=await store.dispatch("getListAll")
        var i;
        var result=false
        for(i of NeoEntity.state.allEntitiesAndRelations.nodes){
            if(data.name==i.name){
                result=true
                break
            }
        }
        expect(result).toBe(true)
    })
    it("更新关系",async ()=>{
        let res=await store.dispatch('getListAll');
        const data={
            name:"新的关系名称",
            id:NeoEntity.state.allEntitiesAndRelations.links[0].id
        }
        global.alert=jest.fn()
        let res1=await store.dispatch('updateRelById',data)
        let res2=await store.dispatch('getListAll')
        var result=false
        var i;
        for(i of NeoEntity.state.allEntitiesAndRelations.links){
            if(i.name=="新的关系名称"){
                result=true
            }
        }
        expect(result).toBe(true)
    })
    it("通过id获得实体",async ()=>{
        let res=await store.dispatch('getListAll')
        let res2=await store.dispatch("getNeoEntityById",NeoEntity.state.allEntitiesAndRelations.nodes[0].nodeId)
        expect(NeoEntity.state.currentNeoEntity).toBeDefined()
    })
})
