<template>

  <navigator/>
<!--  <sidebar/>-->
  <div style="margin-left:16%">

    <div class="w3-container" id="main" style="width:1000px;height:800px" ref="main">
      <!--        <h2>侧边栏中的下拉菜单</h2>-->
      <!--        <p>在此示例中，我们在侧边栏中添加了一个下拉菜单。</p>-->
      <!--        <p>注意插入符号下拉图标，我们用它来指示这是一个下拉菜单。</p>-->
    </div>

    </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import sidebar from "../components/sidebar";
import echarts from 'echarts'
import navigator from "../components/navigator";
export default {
  name: 'Home',
  components: {
    Navigator,
    //HelloWorld
    sidebar,navigator
  },mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    var categories = [];
for (var i = 0; i < 2; i++) {
  categories[i] = {
    name: '类目' + i
  };
}
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
        show: true
      },
      // 保存为图片
      saveAsImage: {
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
    type: 'graph', // 类型:关系图
    layout: 'force', //图的布局，类型为力导图
    symbolSize: 40, // 调整节点的大小
    roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
    edgeSymbol: ['circle', 'arrow'],
    edgeSymbolSize: [2, 10],
    edgeLabel: {
      normal: {
        textStyle: {
          fontSize: 20
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
      }
    },
    edgeLabel: {
      normal: {
        show: true,
        formatter: function (x) {
          return x.data.name;
        }
      }
    },
    label: {
      normal: {
        show: true,
        textStyle: {}
      }
    },

    // 数据
    data: [{
      name: 'node01',
      des: 'nodedes01',
      symbolSize: 70,
      category: 0,
    }, {
      name: 'node02',
      des: 'nodedes02',
      symbolSize: 50,
      category: 1,
    }, {
      name: 'node03',
      des: 'nodedes3',
      symbolSize: 50,
      category: 1,
    }, {
      name: 'node04',
      des: 'nodedes04',
      symbolSize: 50,
      category: 1,
    }, {
      name: 'node05',
      des: 'nodedes05',
      symbolSize: 50,
      category: 1,
    }],
    links: [{
      source: 'node01',
      target: 'node02',
      name: 'link01',
      des: 'link01des'
    }, {
      source: 'node01',
      target: 'node03',
      name: 'link02',
      des: 'link02des'
    }, {
      source: 'node01',
      target: 'node04',
      name: 'link03',
      des: 'link03des'
    }, {
      source: 'node01',
      target: 'node05',
      name: 'link04',
      des: 'link05des'
    }],
    categories: categories,
  }]
};
myChart.setOption(option);
  }
}

</script>
<style scoped>
  @import "../assets/main.css";
</style>