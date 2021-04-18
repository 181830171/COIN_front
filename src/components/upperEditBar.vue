<template>
	<div class="upper">
		<!-- 节点 -->
		<div id="node">
			
			<span style="display:block;width:100%; text-align: left;">
				节点:{{currentNeoEntity.name==undefined?'':currentNeoEntity.name}}
				<a-button type="danger" @click="deleteNodeHandler" :disabled="!isEditNode">删除</a-button>
			</span>
			<div id="entity_shape">
				<span>形状:&nbsp;</span>
			  <a-select  :default-value="currentNeoEntity.symbol==undefined?'circle':currentNeoEntity.symbol" style="display: inline-block;" :disabled="!isEditNode" @change="handleShapeChange">
					<template v-for="(entity_shape, index) in entity_shapes" :key="index">
						<a-select-option :value="entity_shape[1]">
							{{entity_shape[0]}}
						</a-select-option>
					</template>			
			  </a-select>
			</div>
			<div id="entity_category">
							<span>种类:&nbsp;</span>
							<a-select ref="category_select" :default-value="currentCategory.name" style="display: inline-block; width: 120px;" :disabled="!isEditNode" @change="handleCategoryChange">
								<template v-for="(category, index) in allEntitiesAndRelations.categories" :key="category.name">
									<a-select-option :value="category.name">
										{{category.name}}&nbsp;&nbsp;
			<!-- 							<a-icon type="edit" @click="editCategoryNameHandler($event, category)"/> -->
										<img src="imgs/edit_icon.png" style="width: 15%; height: 100%; float: right;" @click="editCategoryNameHandler($event,category)"/>
									</a-select-option>
								</template>
			<!-- 					<a-select-option value="添加种类" @click="addCategoryHandler">
									添加种类
								</a-select-option> -->
							</a-select>
							<img src = "imgs/plus_icon.png" @click="addCategoryHandler" style="width: 30px; height: 30px;"/>
							<!-- <PlusCircleOutlined @click="addCategoryHandler"/> -->
							<!-- <span>颜色</span> -->
							<!-- <colorPicker v-model="currentCategory.itemStyle.color" v-on:change="handleColorChange"/> -->
							<!-- <colorPicker v-model="color_test"></colorPicker> -->
				<!-- 			<vue-color-picker-board :width="800"
													:height="100"
													:defaultColor="'#00AAFF'"
													@onSelection="handleColorChange">
							</vue-color-picker-board> -->
							 
			</div>
			<div id="entity_size">
				<span>大小:&nbsp;</span>
				<a-row>
				  <a-col :span="12">
					<a-slider v-model:value="currentSymbolSize" :min="20" :max="70" :disabled="!isEditNode" @blur="handleSymbolSizeChange"/>
				  </a-col>
				  <a-col :span="4">
					<a-input-number v-model:value="currentSymbolSize" :min="20" :max="70" style="marginLeft: 16px" :disabled="!isEditNode" @blur="handleSymbolSizeChange"/>
				  </a-col>
				</a-row>
			</div>
		</div>
		
		<!-- 关系 -->
		<div id="upper_edit_relation">
			<span style="display:block;width:100%; text-align: left;">
				关系:{{currentRelation.name==undefined?'':currentRelation.name}}
				<a-button type="danger" @click="deleteRelationHandler" :disabled="!isEditRel">删除</a-button>
			</span>
			<div id="upper_edit_relation_startnode">
				<span>起点:</span>
				<a-select :value="currentRelation.symbol[0]" style="display: inline-block;" :disabled="!isEditRel" @change="handleStartNodeEdgeChange">
								<template v-for="(edge_style, index) in edge_styles" :key="index">
									<a-select-option :value="edge_style[0]">
										{{edge_style[0]}}
									</a-select-option>	
							  </template>
				</a-select>
			</div>
			<div id="upper_edit_relation_endnode">
				<span>终点:</span>
				<a-select :value="currentRelation.symbol[1]" style="display: inline-block;" :disabled="!isEditRel" @change="handleEndNodeEdgeChange">
								<template v-for="(edge_style, index) in edge_styles" :key="index">
									<a-select-option :value="edge_style[0]">
										{{edge_style[0]}}
									</a-select-option>	
							  </template>
				</a-select>
			</div>
		</div>
		
		<div id="upper_edit_label">
			<span style="display:block;width:100%; text-align: left; margin-bottom: 2px;">
				<span>标签</span>
				<a-switch checked-children="显示" un-checked-children="隐藏" v-model:checked="globalIsShowLabel" />
			</span>
			<div id="upper_edit_label_size">
				<span>标签大小:</span>
				<a-row>
				  <a-col :span="12">
					<a-slider v-model:value="globalFontSize" :min="8" :max="30" @blur="globalFontSizeChangeHandler"/>
				  </a-col>
				  <a-col :span="4">
					<a-input-number v-model:value="globalFontSize" :min="8" :max="30" style="marginLeft: 16px" @blur="globalFontSizeChangeHandler"/>
				  </a-col>
				</a-row>
			</div>
		</div>
<!-- <a-icon type="plus-square" /> -->
		<a-modal
		              :visible="editCategoryNameVisible"
		              title= "修改种类名称"
		              okText='确认'
		              cancel-text="取消"
		              @cancel="editCategoryNameFormCancelHandler"
		              @ok="editCategoryNameConfirmHandler"
		      >
		          <a-form layout='vertical'>
		              <a-form-item label='原名称'>
		                  {{originalCategory.name}}
		              </a-form-item>
		              <a-form-item label='新名称'>
		                  <a-input placeholder="请输入新的种类名称"  allowClear @blur="editCategoryNameFormNewCategoryNameChangeHandler"/>
		              </a-form-item>
					  <a-form-item label="颜色">
						  <a-input type="color" :default-value="currentCategory.itemStyle.color" @blur="handleColorChange"></a-input>
					  </a-form-item>
		          </a-form>
		</a-modal>
		
		<a-modal 
			:visible="addCategoryVisible"
			title= "添加种类"
			okText='确认'
			cancel-text="取消"
			@cancel="addCategoryFormCancleHandler"
			@ok="addCategoryFormConfirmHandler"
		>
			<a-form layout="vertical">
				<a-form-item label="名称">
					<a-input placeholder="请输入种类名称" allowClear @blur="addCategoryFormNameBlurHandler" />
				</a-form-item>
				<a-form-item label="颜色">
					<a-input type="color" @blur="addCategoryFormColorBlurHandler"/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import {Form} from 'ant-design-vue'
	import PlusCircleOutlined from '@ant-design/icons-vue'
	// const EditCategoryNameForm = {
	// 	props:['editCategoryNameVisible','originalCategory','editCategoryNameForm'],
	// 	// beforeCreate(){
	// 	// 	this.form = this.$form.createForm(this, { name: 'form_in_modal' });
	// 	// },
	// 	template:`

	// 	`
	// }
	export default{
		name:'upperEditBar',
		components:{
			// EditCategoryNameForm,
			PlusCircleOutlined
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
				publicPath: process.env.BASE_URL,
				// 修改种类名称
				editCategoryNameVisible:false,
				originalCategory:{
					name:'',
				},
				editCategoryNameForm:{
					newName:'',
					newColor:'',
				},
				// 添加种类
				addCategoryVisible:false,
				addCategoryForm:{
					name:'',
					color:"",
				},
				// currentSymbolSize:this.currentNeoEntity.symbolSize,
			}
		},
		
		computed: {
		  ...mapGetters([
		    'allEntitiesAndRelations',
		    'currentNeoEntity',
			'currentRelation',
			'currentCategory'
		  ]),
		  currentSymbolSize:{
			  get(){
				  return this.$store.state.NeoEntity.currentNeoEntity.symbolSize
			  },
			  set(value){
				  this.$store.commit('set_currentNeoEntitySymbolSize',value)
				  // this.$store.dispatch('updateNeoEntityByEntity', this.$store.state.NeoEntity.currentNeoEntity)
			  }
		  },
		  globalFontSize:{
			  get(){
				  return this.$store.state.NeoEntity.globalFontSize
			  },
			  set(value){
				  this.$store.commit('set_globalFontSize',value)
			  }
		  },
		  globalIsShowLabel:{
			  get(){
				  return this.$store.state.NeoEntity.globalIsShowLabel
			  },
			  set(value){
				  this.$store.commit('set_globalIsShowLabel',value)
				  this.$parent.$parent.draw()
			  }
		  },
		},
		methods:{
			...mapMutations([
				'set_currentCategory',
				'set_currentNeoEntitySymbolSize',
				'set_currentNeoEntity'
			]),
			...mapActions([
				'getListAll',
				'addCategory',
				'updateCategory',
				'updateNeoEntityByEntity',
				'updateRelSymbol',
				'updateNeoEntityByCategory',
				'deleteNeoEntityById',
				'deleteRelateById'
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
				this.currentCategory.itemStyle.color = e.target.value;
				const data = {
					id: this.currentCategory.categoryId,
					name:this.currentCategory.name,
					color:e.target.value
				};
				console.log('target value',e.target.value);
				this.updateCategory(data);
				this.$parent.$parent.draw();
			},
			handleCategoryChange(e){
				console.log('category change',e)
				console.log('currentCategory', this.currentCategory.name)
				// if(e=="添加种类"){
				// 	this.$refs.category_select.value = this.currentCategory.name;
				// 	return;
				// }
				this.updateNeoEntityByCategory(e)
				this.$parent.$parent.draw();
			},
			// 修改种类名称
			editCategoryNameHandler(e,category){
				e.stopPropagation();
				console.log('category',category)
				this.originalCategory = category;
				this.editCategoryNameVisible = true;
			},
			editCategoryNameFormCancelHandler(){
				this.editCategoryNameVisible=false;
			},
			editCategoryNameConfirmHandler(){
				console.log("新名称", this.editCategoryNameForm.newName)
				if(this.editCategoryNameForm.newName == ''){
					alert("请输入新的名称");
					return;
				};
				
				const data = {
					id: this.originalCategory.categoryId,
					name:this.editCategoryNameForm.newName,
					color:this.originalCategory.itemStyle.color
				};
				console.log('data', data);
				if(this.originalCategory.name==this.currentCategory.name){
					this.set_currentCategory({
						categoryId:this.currentCategory.categoryId,
						name:this.editCategoryNameForm.newName,
						itemStyle:this.currentCategory.itemStyle,
					})
				}
				this.updateCategory(data);
				this.$parent.$parent.draw();
				this.editCategoryNameForm.newName = '';
				
				this.editCategoryNameVisible = false;
				
			},
			editCategoryNameFormNewCategoryNameChangeHandler(e){
				this.editCategoryNameForm.newName = e.srcElement.value;
				console.log('blur', e)
			},
			
			// 添加种类
			addCategoryHandler(e){
				this.addCategoryVisible = true;
				// e.stopPropagation();
				// e.preventDefault();
			},
			addCategoryFormCancleHandler(e){
				this.addCategoryVisible = false;
			},
			addCategoryFormConfirmHandler(e){
				this.addCategoryVisible = false;
				this.addCategory({
					name:this.addCategoryForm.name,
					color:this.addCategoryForm.color,
				})
			},			
			addCategoryFormNameBlurHandler(e){
				console.log('name blur', e);
				this.addCategoryForm.name = e.srcElement.value;
			},
			addCategoryFormColorBlurHandler(e){
				console.log('color blur', e)
				this.addCategoryForm.color = e.target.value;
			},
			handleSymbolSizeChange(e){
				this.updateNeoEntityByEntity(this.$store.state.NeoEntity.currentNeoEntity)
				this.$parent.$parent.draw()
			},
			globalFontSizeChangeHandler(){
				this.$parent.$parent.draw()
			},
			
			//删除节点
			deleteNodeHandler(){
				var _this = this
				swal("确定删除吗",{
					  buttons: {
						cancel: '我再想想',
						delete: {
						  text: "确认删除",
						  value: "delete",
						}
					  },
				}).then((value)=>{
					switch(value){
						case 'delete':
							_this.deleteNeoEntityById({
								id:_this.currentNeoEntity.nodeId
							});
							_this.isEditNode = false;
							_this.$parent.$parent.draw();
							break;
						case 'cancel':
							break;
					}
				});
			},
			
			// 删除关系
			deleteRelationHandler(){
				var _this = this
				swal("确定删除吗",{
					  buttons: {
						cancel: '我再想想',
						delete: {
						  text: "确认删除",
						  value: "delete",
						}
					  },
				}).then((value)=>{
					switch(value){
						case 'delete':
							_this.deleteRelateById(_this.currentRelation.id);
							_this.isEditRel = false;
							_this.$parent.$parent.draw();
							break;
						case 'cancel':
							break;
					}
				});
			}
		},
		created() {
			this.getListAll();
		}
	}
</script>

<style scoped>
.upper{
	width: 100%;
	height: 100%;
}
#node{
	 width: 40%;
	 float: left;
	 font-size: 50%;
	 height: 100%;
	 border-right: 1px solid #008080;
}
#entity_shape{
	width: 35%;
	/* height: 35px; */
	margin-top: 2px;
	margin-bottom: 2px;
	float: left;
}
#entity_category{
	width: 60%;
	margin-top: 2px;
	margin-bottom: 2px;
	/* height: 35px; */
	margin-left: 5px;
	float: left;
}
#entity_size{
	width: 100%;
	float: left;
	margin-top: 2px;
	/* font-size: 50%; */
}

#upper_edit_relation{
	font-size: 50%;
	width: 25%;
	height: 100%;
	float: left;
	border-right: 1px solid #008080;
	margin-left: 5px;
}
#upper_edit_relation_startnode{
	width: 40%;
	float: left;
	margin-top: 2px;
	margin-bottom: 2px;
}
#upper_edit_relation_endnode{
	width: 40%;
	float: left;
	margin-left: 10px;
	margin-top: 2px;
	margin-bottom: 2px;
}

#upper_edit_label{
	width: 25%;
	float:left;
	height: 100%;
	font-size: 50%;
	margin-left: 5px;
}

#upper_edit_label_size{
	width: 100%;
	margin-top: 2px;
}
</style>
