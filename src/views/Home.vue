<template>
	<div>
  <navigator ref="nav"/>
<!--  <sidebar/>-->
	<div id="upper_edit_bar">
	<upper-edit-bar></upper-edit-bar>
	</div>
  <div >

    <div class="w3-container" id="main" style="width:1000px;height:700px" ref="main" @click="windowopen()">
    </div>
    </div>
	</div>
</template>

<script>
// @ is an alias to /src

import {mapActions, mapGetters, mapMutations,mapState} from "vuex";
import windowmodual from "../components/windowModual";
let echarts=require('echarts')
import sidebar from "../components/sidebar";
import navigator from "../components/navigator";
import {toRaw} from "@vue/reactivity";
import upperEditBar from "../components/upperEditBar";

export default {
  name: 'Home',
  components: {
    Navigator,
    //HelloWorld
    sidebar,navigator,
	upperEditBar
  },
  data(){
    return {openwindow:true}
  },


  computed: {
    ...mapGetters([
        'allEntitiesAndRelations',
		'currentNeoEntity',
		'currentRelation',
		'currentCategory'
    ])
  },
  methods:{
	...mapMutations([
		'set_currentNeoEntity',
		'set_currentRelation',
		'set_currentCategory',
	]),
    ...mapActions([
      'getListAll',
      'getNeoEntityById',
      'addNeoEntity',
    ]),


    draw(){
      var test=toRaw(this.$store.state.NeoEntity)
      var myChart = echarts.init(document.getElementById('main'));
      myChart.showLoading();
      var nodes;
      var links1;
      var categories = [];
      const _this=this;
      setTimeout(function (){
        nodes=test.allEntitiesAndRelations.nodes;
        links1=test.allEntitiesAndRelations.links;
        categories=test.allEntitiesAndRelations.categories;
        myChart.hideLoading();
        var option = {
          // 图的标题
          title: {
            text: '知识图谱'
          },
          // 提示框的配置
          tooltip: {
            formatter: function (x) {
              return x.data.des;
            }
          },

          // 工具箱
          toolbox: {
            // 显示工具箱
            show: true,
            feature: {
              mark: {
                show: true
              },
              // 还原
              restore: {
                show: true,
              },
              // 保存为图片
              saveAsImage: {
                show: true
              },
              magicType: {
                show: true
              }
            }
          },
          legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
              return a.name;
            })
          }],
          series: [{
            id:'COIN',
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            //layout:'circular',//环形布局
            //layout: 'none',
            symbolSize: 50, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['arrow', 'arrow'],
            edgeSymbolSize: [2, 10],
            smooth: false,   //关键点，为true是不支持虚线的，实线就用true
            zoom:0.5,
           // nodeScaleRatio:0.5,
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 14
                },
				
                show: true,
                formatter: function (x) {
                  return x.data.name;
                }
              }
            },
            force: {
              repulsion: 40,
              edgeLength: [10, 20],
              initLayout:'circular',
              gravity:0.3
            },
            draggable: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#4b565b',
              },

            },
            label: {
              normal: {
                show: true,
                textStyle: {}
              }
            },
            //鼠标局部高亮
            focusNodeAdjacency : true,

            // // 数据,需要从外面读取
            data:nodes,
            links:links1,
            categories: categories,


          }],

        };
        myChart.setOption(option);
        initNode();

        myChart.on('restore',function () {
          initNode();
          updatePosition();
        });
        myChart.on('resize',function () {
          initNode();
          updatePosition();
        });


        myChart.on('click', function (params) {
			console.log('params:',params)
          if (params.dataType == 'node') {
            //单击节点的事件
            _this.windowopen();
            //将参数传给editbar组件
            //_this.$refs.nav.$refs.editside.categories=category1;
            _this.$refs.nav.$refs.editside.originName=params.data.name;
            _this.$refs.nav.$refs.editside.isEntity=true;
            _this.$refs.nav.$refs.editside.id=params.data.nodeId;
            _this.$refs.nav.$refs.editside.category=params.data.category;
            _this.$refs.nav.$refs.editside.symbolSize=params.data.symbolSize;
            _this.$refs.nav.$refs.editside.x=params.data.x;
            _this.$refs.nav.$refs.editside.y=params.data.y;
			_this.set_currentNeoEntity({
				nodeId:params.data.nodeId,
				name:params.data.name,
				des:params.data.des,
				x:params.data.x,
				y:params.data.y,
				symbolSize:params.data.symbolSize,
				symbol:params.data.symbol,
				category:params.data.category
			})
			var category = _this.allEntitiesAndRelations.categories[params.data.category];
			console.log('category',category);
			_this.set_currentCategory({
				categoryId:category.categoryId,
				name:category.name,
				symbol:category.symbol,
				itemStyle:category.itemStyle,
			});
			console.log('you click a node', params);
          }else if(params.dataType=='edge'){
            //单击关系的事件
            _this.windowopen();
            _this.$refs.nav.$refs.editside.originName=params.data.name;
            _this.$refs.nav.$refs.editside.id=params.data.id;
            _this.$refs.nav.$refs.editside.isEntity=false;
			_this.set_currentRelation({
				id:params.data.id,
				source:params.data.source,
				target:params.data.target,
				name:params.data.name,
				des:params.data.des,
				lineStyle:params.data.lineStyle,
			});
            console.log(params.data.name);
            console.log(params.data.id);
            console.log(params);
			console.log('you click an edge', params);
          }else{
			  console.log('you clicked something else');
		  }
        });



      },3000);

      function initNode(){
        //该方法用于初始化覆盖在节点上的透明的圆，以便于拖动操作
        myChart.setOption({
          graphic: nodes.map(function (item, dataIndex) {
            return {
              type: 'circle',
              position: myChart.convertToPixel('series', [item.x, item.y]),
              shape: {
                //只覆盖内圆部分，这样在外圆部分可以触发鼠标点击，悬浮事件
                r: item.symbolSize / 3
              },
              invisible: true,//透明
              draggable: true,
              ondrag: function (dx, dy) {
                onPointDragging(dataIndex, [this.x, this.y]);
              },
              z: 100
            }
          })
        });

      }

      function onPointDragging(dataIndex, pos) {
        //每次拖动时，修改节点的x,y值并重新绘制
        nodes[dataIndex].x = myChart.convertFromPixel('series', pos)[0];
        nodes[dataIndex].y = myChart.convertFromPixel('series', pos)[1];
        myChart.setOption({
          series: [{
            data: nodes
          }]
        });
        updatePosition();
      }

      function updatePosition() {
        //更新覆盖在节点上的透明圆的位置
        myChart.setOption({
          graphic: nodes.map(function (item, dataIndex) {
            return {
              position: myChart.convertToPixel('series', [item.x,item.y])
            };
          })
        });
      }
    },
    windowopen(){
      //这里可以打开侧边栏，删除或修改具体的点或者关系
      this.$refs.nav.edit()

    }
  },
  created() {
      this.getListAll();
  },
  mounted() {
    this.draw()
  }

}



</script>
<style scoped>
  @import "../assets/main.css";
  #upper_edit_bar{
	  
  }
</style>
