<template>
	<div class="upper">
			<span>节点</span><br/>
			<span>形状</span>
		  <a-select  :default-value="currentNeoEntity.symbol==undefined?'circle':currentNeoEntity.symbol" style="display: inline-block;" :disabled="!isEditNode" @change="handleShapeChange">
				<template v-for="(entity_shape, index) in entity_shapes" :key="index">
					<a-select-option :value="entity_shape[1]">
						{{entity_shape[0]}}
					</a-select-option>
			  </template>			
		  </a-select>

			<span>种类</span>
			<a-select :default-value="currentCategory==undefined?'':currentCategory.name" style="display: inline-block;" :disabled="!isEditNode">
				<template v-for="(category, index) in allEntitiesAndRelations.categories" :key="index">
					<a-select-option :value="category.name">
						{{category.name}}
					</a-select-option>
				</template>
			</a-select>
			<span>颜色</span>
			<!-- <colorPicker v-model="currentCategory.itemStyle.color" v-on:change="handleColorChange"/> -->
			<!-- <colorPicker v-model="color_test"></colorPicker> -->
<!-- 			<vue-color-picker-board :width="800"
			                        :height="100"
			                        :defaultColor="'#00AAFF'"
			                        @onSelection="handleColorChange">
			</vue-color-picker-board> -->
			 <a-input type="color" :value="currentCategory.itemStyle.color" v-on:change="handleColorChange" style="height: 4xp;width: 50px;" :disabled="!isEditNode"></a-input>
			<span>关系</span><br />

			<span>起点:</span>
			<a-select :value="currentRelation.symbol[0]" style="display: inline-block;" :disabled="!isEditRel" @change="handleStartNodeEdgeChange">
							<template v-for="(edge_style, index) in edge_styles" :key="index">
								<a-select-option :value="edge_style[0]">
									{{edge_style[0]}}
								</a-select-option>	
						  </template>
			</a-select>
			
			<span>终点:</span>
			<a-select :value="currentRelation.symbol[1]" style="display: inline-block;" :disabled="!isEditRel" @change="handleEndNodeEdgeChange">
							<template v-for="(edge_style, index) in edge_styles" :key="index">
								<a-select-option :value="edge_style[0]">
									{{edge_style[0]}}
								</a-select-option>	
						  </template>
			</a-select>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapMutations,mapState} from "vuex";
	export default{
		name:'upperEditBar',
		components:{
		},
		data(){
			return{
				// 形状
				entity_shapes:[['圆形','circle','./imgs/circle.png'], ['矩形','rect','./imgs/rect.png'], ['圆角矩形','roundRect','./imgs/roundRect.png'], 
				['三角形','triangle','./imgs/triangle.png'], ['菱形','diamond','./imgs/diamond.png']],
				// 线条样式
				line_styles:[['实线','solid'],['虚线','dotted']],
				// 关系
				edge_styles:[['circle'], ['rect'], ['roundRect'], ['triangle'], ['diamond'], ['pin'], ['arrow']],
				isEditNode:false,
				isEditRel:false,
				color_test:'#000000'
			}
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
			...mapActions([
				'getListAll',
				'addCategory',
				'updateCategory',
				'updateNeoEntityByEntity',
				'updateRelSymbol'
			]),
			handleShapeChange(e){
				console.log('click shape change', e);
				console.log('current node', this.currentNeoEntity);
				const data = {
					nodeId:this.currentNeoEntity.nodeId,
					name:this.currentNeoEntity.name,
					des:this.currentNeoEntity.des,
					symbolSize:this.currentNeoEntity.symbolSize,
					category:this.currentNeoEntity.category,
					x:this.currentNeoEntity.x,
					y:this.currentNeoEntity.y,
					symbol:e
				};
				this.updateNeoEntityByEntity(data);
				this.$parent.$parent.draw();
			},
			handleStartNodeEdgeChange(e){
				console.log('click start edge change', e);
				console.log('current relation', this.currentRelation);
				const data = {
					id: this.currentRelation.id,
					symbol:[e,this.currentRelation.symbol[1]]
				};
				console.log('data',data)
				this.updateRelSymbol(data);
				this.$parent.$parent.draw();
				console.log('currentRelation',this.currentRelation);
			},
			handleEndNodeEdgeChange(e){
				console.log('click end edge change', e);
				const data = {
					id:this.currentRelation.id,
					symbol:[this.currentRelation.symbol[0],e]
				};
				console.log('data',data);
				this.updateRelSymbol(data);
				this.$parent.$parent.draw();
				console.log('currentRelation',this.currentRelation);
			},
			handleColorChange(e){
				console.log('click color change', e);
				console.log('currentCategory',this.currentCategory);
				const data = {
					id: this.currentCategory.categoryId,
					name:this.currentCategory.name,
					color:e.target.value
				};
				console.log('target value',e.target.value);
				this.updateCategory(data);
				this.$parent.$parent.draw();
			}
		},
		created() {
			this.getListAll();
		}
	}
</script>

<style>

</style>
