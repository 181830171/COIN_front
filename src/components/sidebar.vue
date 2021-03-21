<template>
    <div id="index" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width: 18%">
    </div>
    <div id="addSomething" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width: 18%;font-size: 22px" v-show="seen">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="close()">←</p>
        <a class="w3-bar-item w3-button " @click="addEntity()">添加实体</a>
        <a class="w3-bar-item w3-button " @click="addRelation()">添加关系</a>
    </div>
    <div id="add-new-entity" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width:18%" v-show="isaddEntity">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="back()">←</p>
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体</p>
        <input class="w3-bar-item" id="object" type="text" v-model="name">
        <p class="w3-bar-item w3-button hover-none">添加实体描述</p>
        <input class="w3-bar-item" id="description" type="text" v-model="des">
        <p class="w3-bar-item w3-button hover-none">请选择实体类别</p>
        <select class="w3-bar-item" id="cate" v-model="cate">
            <option v-for="n in parseInt(allEntitiesAndRelations.categories)" :value="n-1">类目{{n}}</option>
        </select>
        <button id="add-new-entity-button" style="text-align: center" @click="addEntityHandler()">添加</button>
    </div>

    <div id="add-new-relations" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width:18%" v-show="isaddRelation">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="back()">←</p>
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体1</p>
        <select class="w3-bar-item" id="entity" v-model="source">
            <option v-for="node in allEntitiesAndRelations.nodes" :value="node.nodeId">{{node.name}}</option>
        </select>
<!--        <input class="w3-bar-item" id="object1" type="select" sytle="padding：12px,16px;margin-bottom:10px">-->
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体2</p>
        <select class="w3-bar-item" id="entity2" v-model="destin">
            <option v-for="node in allEntitiesAndRelations.nodes" :value="node.nodeId">{{node.name}}</option>
        </select>
<!--        <input class="w3-bar-item" id="object2" type="text" sytle="padding：12px,16px;margin-bottom:10px">-->
        <p class="w3-bar-item w3-button hover-none">请选择关系类型</p>
        <select class="w3-bar-item" id="solid" v-model="isSolid">
            <option :value="true">实线</option>
            <option :value="false">虚线</option>
        </select>
        <p class="w3-bar-item w3-button hover-none">实体之间的关系</p>
        <input class="w3-bar-item" id="relation" type="text" v-model="relation">

        <button id="add-new-relations-button" style="text-align: center" @click="addRelateHandler()">添加</button>
    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "sidebar",
        props:{
            seen:{type:Boolean,default:false},
        },
        data(){
            return {
                name:"",
                des:"",
                source:null,
                destin:null,
                cate:0,
                relation:"",
                isSolid:true,
                isaddEntity:false,
                isaddRelation:false
            }
        },
      computed: {
        ...mapGetters([
          'allEntitiesAndRelations',
          'currentNeoEntity',
        ])
      },
        methods:{
            ...mapMutations([
                'set_addNeoEntityParams'
            ]),
            ...mapActions([
                'addNeoEntity',
                'getListAll',
                'addRelateById'
            ]),
            close(){
                this.$parent.isAddSeen=false
            },
            addEntityHandler(){
              const data={
                  name:this.name,
                  des:this.des,
                  category:this.cate
              }
              this.addNeoEntity(data)
              this.$parent.$parent.draw()
              this.name=""
              this.des=""
              this.cate=1
            },
            addRelateHandler(){
                const data={
                    from:this.source,
                    to:this.destin,
                    isSolid:this.isSolid,
                    des:"",
                    name:this.relation
                }
                console.log(data)
                this.addRelateById(data)
                this.$parent.$parent.draw()
                this.source=null
                this.destin=null
                this.relation=""
            },
            addRelation(){
                this.isaddRelation=true
            },
            addEntity(){
                this.isaddEntity=true
            },
            back(){
                this.isaddEntity=false
                this.isaddRelation=false
            }
        }
    }
</script>

<style scoped>
    @import '../assets/main.css';
    .w3-sidebar{
        font-size: 16px;
        height: 800px;
        padding:3px 16px;
    }
</style>