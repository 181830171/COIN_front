<template>
    <div id="addSomething" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width: 18%;font-size: 16px" v-show="seen">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="close()">←</p>
      <p class="w3-bar-item w3-button hover-none">您现在选择的是：{{originName}}</p>
        <label><input type="radio" name="opt" v-model="option" value="0">  删除</label>
        <br>
        <br>
        <label><input type="radio" name="opt" v-model="option" value="1">  修改实体或关系</label>
        <br>
      <p class="w3-bar-item w3-button hover-none" v-show="option==1">请输入新名称：</p>
        <input class="w3-bar-item" type="text" v-model="edited" :disabled="option==0">
        <button id="add-new-relations-button" style="text-align: center" @click="handleEdit()">确定</button>
    </div>
</template>

<script>
    import {mapActions,mapMutations,mapGetters} from 'vuex'
    export default {
        name: "editbar",
        props:{seen:{type:Boolean,default:false}},
        data(){
            return {
              isEntity:false,
              from:null,
              to:null,
              id:null,
              category:1,
              symbolSize:30,
              x:64,
              y:45,
              edited:'',
              originName:"",
              disabledInput:false,
              option:""
            }
        },
        methods:{
            ...mapActions([
                'deleteNeoEntityById',
                'deleteRelateById',
                'updateNeoEntityByEntity'
            ]),
            close(){
                this.$parent.isEditSeen=false
            },
            handleEdit(){
                if(document.getElementsByName('opt')[0].checked==true){
                    console.log(this.isEntity)
                    if(this.isEntity==true){
                        this.deleteNeoEntityById({id:this.id})
                        this.$parent.$parent.draw()
                    }else{
                        const data={
                            from:38,
                            to:39
                        }
                        this.deleteRelateById(data)
                        this.$parent.$parent.draw()
                    }
                }else if(document.getElementsByName("opt")[1].checked==true){
                    const data={
                      name:this.edited,
                      nodeId:this.id,
                      des:"",
                      category:this.category,
                      symbolSize:this.symbolSize,
                      x:this.x,
                      y:this.y
                    }
                    this.updateNeoEntityByEntity(data);
                    this.$parent.$parent.draw();
                }

            },
        }
    }
</script>

<style scoped>
    .w3-sidebar{
        height: 800px;
        padding:3px 16px;
    }
</style>