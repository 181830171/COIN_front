<template>
    <div id="index" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width: 16%">
<!--        <div class="w3-dropdown-hover">-->
<!--            <button class="w3-button w3-xlarge">编辑图谱-->
<!--                <i class="fa fa-caret-down"></i>-->
<!--            </button>-->
<!--            <div class="w3-dropdown-content w3-bar-block">-->
<!--                <a @Click="addNewRelations()" href="#" class="w3-bar-item w3-button">新增实体</a>-->
<!--                <a href="#" class="w3-bar-item w3-button">修改图谱</a>-->
<!--            </div>-->
<!--        </div>-->
    </div>

    <div id="add-new-relations" class="w3-sidebar w3-bar-block w3-light-grey w3-card" style="width:16%" v-show="seen">
        <p class="w3-bar-item w3-button w3-xlarge" @Click="close()">←</p>
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体1</p>
        <input class="w3-bar-item" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <p class="w3-bar-item w3-button hover-none">请输入想要添加的实体2</p>
        <input class="w3-bar-item" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <p class="w3-bar-item w3-button hover-none">实体之间的关系</p>
        <input class="w3-bar-item" type="text" sytle="padding：12px,16px;margin-bottom:10px">
        <button id="add-new-relations-button" style="text-align: center">添加</button>
    </div>
</template>

<script>
    export default {
        name: "sidebar",
        props:{
            seen:{type:Boolean,default:false}
        },
        data(){
            return {}
        },
        methods:{
            close(){
                this.$parent.isAddSeen=false
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