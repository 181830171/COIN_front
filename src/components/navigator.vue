<template>
    <ul class="all">
        <li class='title' style="float: left">COIN</li>
        <li class="btn"><a href="#">Edit</a></li>
        <li class="btn">
            <a href="#" class="add" @click="add()">Add</a>
<!--            <ul class="addOption">-->
<!--                <li class="insideAdd"><a>新增关系</a></li>-->
<!--                <li class="insideAdd"><a>新增实体</a></li>-->
<!--            </ul>-->
        </li>
        <li class="btn"><a href="#">Search</a></li>
    </ul>
    <sidebar id="side" :seen="isAddSeen" ref="sidebar"/>
</template>

<script>
    import sidebar from "./sidebar";
    export default {
        name: "navigator",
        data(){
            return {isAddSeen:false}
        },
        components:{
            sidebar
        },
        methods:{
            add(){
               this.isAddSeen=true
            }
        }
    }
</script>

<style scoped>
    .all {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    li.btn {
        float: right;
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 20px;
    }
    li.title{
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 30px;
    }
    li.btn{
        position: relative;
        top:5px;
    }
    li a:hover {
        background-color: #111;
    }
    .addOption{
        position:absolute;
        top:40px;
        left:0px;
    }


</style>