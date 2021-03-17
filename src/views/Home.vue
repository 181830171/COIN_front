<template>

  <navigator ref="nav"/>
<!--  <sidebar/>-->

  <div style="margin-left:20%">

    <div class="w3-container" id="main" style="width:1000px;height:800px" ref="main" @click="windowopen()">
<!--              <h2>侧边栏中的下拉菜单</h2>-->
<!--              <p>在此示例中，我们在侧边栏中添加了一个下拉菜单。</p>-->
<!--              <p>注意插入符号下拉图标，我们用它来指示这是一个下拉菜单。</p>-->
    </div>
    </div>
<!--  <windowmodual :v-show="openwindow"/>-->
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapGetters, mapState} from "vuex";
import windowmodual from "../components/windowModual";
let echarts=require('echarts')
import sidebar from "../components/sidebar";
import navigator from "../components/navigator";
import $ from "jquery";
import {toRaw} from "@vue/reactivity";
import {getListAllAPI} from "@/api/NeoEntity";

export default {
  name: 'Home',
  components: {
    Navigator,
    //HelloWorld
    sidebar,navigator
  },
  data(){
    return {openwindow:true}
  },


  computed: {
    ...mapGetters([
        'allEntitiesAndRelations'
    ])
  },
  methods:{
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
      var category1;
      var categories = [];
      // $.get('test1_result.json').done(function (data) {
      //   nodes=data.nodes;
      //   links1=data.links;
      //   category1=data.categories;
      // });
      setTimeout(function (){
        nodes=test.allEntitiesAndRelations.nodes;
        links1=test.allEntitiesAndRelations.links;
        category1=test.allEntitiesAndRelations.categories;
        for (var i = 0; i < category1; i++) {
          categories[i] = {
            name: '类目' + (i+1)
          };
        }
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
            symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            smooth: false,   //关键点，为true是不支持虚线的，实线就用true
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
              repulsion: 2500,
              edgeLength: [10, 50]
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
        console.log(option);
        initNode();

        myChart.on('restore',function () {
          initNode();
          updatePosition();
        });
        myChart.on('resize',function () {
          initNode();
          updatePosition();
        });

      },3000);

      function initNode(){
        //获取原始节点位置，并在上面覆盖透明的圆
        //this.getListAll();
        //setTimeout(function () {
        //let test2=toRaw(this.$store.state.NeoEntity)
        myChart.setOption({
          graphic: nodes.map(function (item, dataIndex) {
            return {
              type: 'circle',
              position: myChart.convertToPixel('series', [item.x, item.y]),
              shape: {
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
        // },2000)

      }

      function onPointDragging(dataIndex, pos) {
        //修改节点的x,y值并重新绘制
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
        //更新覆盖在节点上的值
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
      //这里点击窗口可以打开侧边栏，希望可以通过点击具体的点或者关系获得这个关系或者点的id
      //如果是点则isEntity=true,传入相应的id
      //如果是关系则isEntity=false，在from和to传入两个端点的id
      this.$refs.nav.edit()
      this.$refs.nav.$refs.editside.isEntity=false
      this.$refs.nav.$refs.editside.from=null
      this.$refs.nav.$refs.editside.to=null
      this.$refs.nav.$refs.editside.id=6
    }
  },
  created() {
      this.getListAll();
  },
  mounted() {
    this.draw()
    const cav=document.getElementById("main")
    //这里是在画布上绑定单击事件打开侧边栏，理想情况是双击某个点打开侧边栏
    cav.addEventListener("click",this.windowopen)
  }

}



</script>
<style scoped>
  @import "../assets/main.css";
</style>