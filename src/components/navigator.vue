<template>
    <ul class="all">
        <li class='title' style="float: left">COIN</li>
        <li class="btn"><a href="#" @click="export2JSON()">Export</a></li>
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
    <editbar ref="editside" :seen="isEditSeen" />
</template>

<script>
    import sidebar from "./sidebar";
    import Editbar from "./editbar";
    import {mapActions,mapGetters} from 'vuex';
    import {toRaw} from "@vue/reactivity";
    export default {
        name: "navigator",
        data(){
            return {isAddSeen:false,isEditSeen:false}
        },
        components:{
            Editbar,
            sidebar
        },
        methods:{
          ...mapGetters([
            'allEntitiesAndRelations'
        ]),
        add(){
           this.isAddSeen=true;
            this.isEditSeen=false;
        },
        edit(){
            this.isEditSeen=true;
            this.isAddSeen=false;
        },
        export2JSON(){
          var test=toRaw(this.$store.state.NeoEntity)
          alert("开始导出JSON文件，请耐心等候！")
          var eleLink = document.createElement('a');
          eleLink.download = 'data.json';
          eleLink.style.display = 'none';
          // 字符内容转变成blob地址
          var blob = new Blob([JSON.stringify(test.allEntitiesAndRelations)]);
          eleLink.href = URL.createObjectURL(blob);
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);

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