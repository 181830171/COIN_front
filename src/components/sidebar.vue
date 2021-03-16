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
        <button id="add-new-entity-button" style="text-align: center" @click="addEntityHandler()">添加</button>
    </div>
    <div id="add-new-relations" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width:18%" v-show="isaddRelation">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="back()">←</p>
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体1</p>
        <select class="w3-bar-item" id="entity">
            <option v-for="node in allEntitiesAndRelations.nodes" :value="node.id">{{node.name}}</option>
        </select>
<!--        <input class="w3-bar-item" id="object1" type="select" sytle="padding：12px,16px;margin-bottom:10px">-->
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体2</p>
        <select class="w3-bar-item" id="entity2">
            <option v-for="node in allEntitiesAndRelations.nodes" :value="node.id">{{node.name}}</option>
        </select>
<!--        <input class="w3-bar-item" id="object2" type="text" sytle="padding：12px,16px;margin-bottom:10px">-->
        <p class="w3-bar-item w3-button hover-none">实体之间的关系</p>
        <input class="w3-bar-item" id="relation" type="text">

        <button id="add-new-relations-button" style="text-align: center" @click="addHandler()">添加</button>
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
                source:"",
                destin:"",
                relation:"",
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
                'getListAll'
            ]),
            close(){
                this.$parent.isAddSeen=false
            },
            addEntityHandler(){
              const data={
                  name:this.name,
                  des:this.des
              }
              console.log("hehe")
              this.addNeoEntity(data)
            },
            addHandler(){
                // const data={
                //     source:document.getElementById("object1").value,
                //     destin:document.getElementById("object2").value,
                //     relation:document.getElementById("relation").value
                // }
                // console.log(data)
                // //this.set_addNeoEntityParams(data)
                // this.addNeoEntity({name:this.data.source,des:""})


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