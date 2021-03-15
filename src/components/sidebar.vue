<template>
    <div id="index" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width: 16%">
    </div>

    <div id="add-new-relations" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width:16%" v-show="seen">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="close()">←</p>
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体1</p>
        <input class="w3-bar-item" id="object1" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体2</p>
        <input class="w3-bar-item" id="object2" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <p class="w3-bar-item w3-button hover-none">实体之间的关系</p>
        <input class="w3-bar-item" id="relation" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <button id="add-new-relations-button" style="text-align: center" @click="addHandler()">添加</button>
    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "sidebar",
        props:{
            seen:{type:Boolean,default:false}
        },
        data(){
            return {
                source:"",
                destin:"",
                relation:""
            }
        },
        methods:{
            ...mapMutations([
                'set_addNeoEntityParams'
            ]),
            ...mapActions([
                'addNeoEntity'
            ]),
            close(){
                this.$parent.isAddSeen=false
            },
            addHandler(){
                const data={
                    source:document.getElementById("object1").value,
                    destin:document.getElementById("object2").value,
                    relation:document.getElementById("relation").value
                }
                console.log(data)
                //this.set_addNeoEntityParams(data)
                this.addNeoEntity({name:this.data.source,des:""})
                this.addNeoEntity({})

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