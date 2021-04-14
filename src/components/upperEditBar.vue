<template>
	<div class="upper">
		<div id="node">
			<a-icon type="edit"></a-icon>
			<span style="display:inline-block;width:100%; text-align: center;">节点</span><br/>
			<div id="entity_shape">
				<span>形状</span>
			  <a-select  :default-value="currentNeoEntity.symbol==undefined?'circle':currentNeoEntity.symbol" style="display: inline-block;" :disabled="!isEditNode" @change="handleShapeChange">
					<template v-for="(entity_shape, index) in entity_shapes" :key="index">
						<a-select-option :value="entity_shape[1]">
							{{entity_shape[0]}}
						</a-select-option>
					</template>			
			  </a-select>
			</div>
			<edit-category-name-form 
			ref="editCategoryNameForm"
			:visible="editCategoryNameVisible"
			:originCategory="originCategory"
			:editCategoryNameForm="editCategoryNameForm"
			@cancel="editCategoryNameFormCancelHandler"
			@confirm="editCategoryNameConfirmHandler"
			/>

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
		
			<div id="category">
				<span style="display: inline-block;width: 100%;text-align: center;">种类</span><br/>
				<span>名称</span>
				<a-select :value="currentCategory.name" style="display: inline-block; width: 120px;" :disabled="!isEditNode" @change="handleCategoryChange">
					<template v-for="(category, index) in allEntitiesAndRelations.categories" :key="index">
						<a-select-option :value="category.name">
							{{category.name}}&nbsp;&nbsp;
<!-- 							<a-icon type="edit" @click="editCategoryNameHandler($event, category)"/> -->
							<img src="imgs/edit_icon.png" style="width: 15%; height: 100%; float: right;" @click="editCategoryNameHandler($event,category)"/>
						</a-select-option>
					</template>
					<a-select-option value="添加种类" @click="addCategoryHandler">
						添加种类
					</a-select-option>
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
				</div>
			</div>
			<div id="relation" style="width: 50%; float: left;">
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
	</div>
</template>

<script>
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	import {Form} from 'ant-design-vue'
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
				},
				// 添加种类
				addCategoryVisible:false,
				addCategoryForm:{
					name:'',
					color:"",
				}
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
			...mapMutations([
				'set_currentCategory'
			]),
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
			},
			addCategoryFormCancleHandler(e){
				this.addCategoryVisible = false;
			},
			addCategoryFormConfirmHandler(e){
				this.addCategoryVisible = false;
			},			
			addCategoryFormNameBlurHandler(e){
				console.log('name blur', e);
			},
			addCategoryFormColorBlurHandler(e){
				console.log('color blur', e)
			}
		},
		created() {
			this.getListAll();
		}
	}
</script>

<style scoped>
#node{
	 width: 50%;
	 float: left;
	 font-size: 100%;
}
#entity_shape{
	width: 35%;
	float: left;
}
#category{
	width: 65%;
	float: left;
	font-size: 50%;
}
</style>
