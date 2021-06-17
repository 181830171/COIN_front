<template>
	<div>
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
        <li class="btn"><a href="#" @click="handleSearch()">Search</a></li>
        <input name="search" list="browsers" type="text" placeholder="搜索" v-model="searchText">
            <datalist id="browsers">
                <option v-for="reco in searchHistoryList" :value="reco"></option>
            </datalist>
    </ul>
	<div id="upper_edit_bar" class="w3-container w3-sand">
		<upper-edit-bar ref="upper_edit_side"></upper-edit-bar>
	</div>
    <sidebar id="side" :seen="isAddSeen" ref="sidebar"/>
    <editbar ref="editside" :seen="isEditSeen" />
	</div>
</template>

<script>
    import sidebar from "./sidebar";
    import Editbar from "./editbar";
    import {Input,Space} from 'ant-design-vue'
    import {AudioOutLined} from '@ant-design/icons-vue'
    import {mapActions,mapGetters} from 'vuex';
    import {toRaw} from "@vue/reactivity";
	import upperEditBar from "./upperEditBar.vue";
    export default {
        name: "navigator",
        data(){
            return {isAddSeen:false,isEditSeen:false,searchText:"",searchHistoryList:[],searchResult:[]}
        },
        components:{
            Editbar,
            sidebar,
			upperEditBar,
        },
        methods: {
            ...mapGetters([
                'allEntitiesAndRelations',
                'searchResult',
                'searchHistories'
            ]),
            ...mapActions([
                'searchNodes',
                'getSearchHistories'
            ]),
            add() {
                this.isAddSeen = true;
                this.isEditSeen = false;
                this.$router.push('/home')
            },
            edit() {
                this.isEditSeen = true;
                this.isAddSeen = false;
            },
            export2JSON() {
                var test = toRaw(this.$store.state.NeoEntity)
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

            },
            handleSearch() {

                const _this=this
                this.getSearchHistories()
                //console.log("histories2",toRaw(this.$store.state.NeoEntity).searchHistories)
                this.searchHistoryList=toRaw(this.$store.state.NeoEntity).searchHistories
                if (this.searchText == "") {
                    alert("请输入搜索内容")
                } else {

                    this.searchNodes(this.searchText);
                    this.searchText = ""

					setTimeout(function(){
						_this.getSearchHistories()
					},1000)
                    setTimeout(function () {
                        console.log("histories",toRaw(_this.$store.state.NeoEntity).searchHistories)
                        _this.searchResult=toRaw(_this.$store.state.NeoEntity).searchResult
                        _this.searchHistoryList=toRaw(_this.$store.state.NeoEntity).searchHistories
                        if(toRaw(_this.searchResult).length!=0){
                            _this.$parent.isSeen=false
                            _this.$parent.searchDisplaySeen=true
                            _this.$parent.draw1(toRaw(_this.$store.state.NeoEntity).searchResult,toRaw(_this.$store.state.NeoEntity).allEntitiesAndRelations.links,toRaw(_this.$store.state.NeoEntity).allEntitiesAndRelations.categories)
                        }else{
                            console.log("this")
                        }
                    }, 2000)

                }
            }
        },
        mounted(){
            this.getSearchHistories()
            this.searchHistoryList=toRaw(this.$store.state.NeoEntity).searchHistories
        },

    }
</script>

<style scoped>
    .all {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
		height: 7%;
    }
    ul input{
        width:300px;
        float:right;
        height: 40px;
        position:relative;
        top:15px;
        font-size: 20px;
        border-radius: 20px;
        text-indent: 5px;
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
	#upper_edit_bar{
		height: 120px;
	}


</style>