<template>
	<div>
		  <a-dropdown-button>
			形状
		    <a-menu slot="overlay">
		      <a-menu-item v-for="(entity_shape, index) in entity_shapes" :key="index">
		        <a href="javascript:;">111<img :src="entity_shape[1]" :alt="entity_shape[0]" /></a>
		      </a-menu-item>
		    </a-menu>
		  </a-dropdown-button>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapMutations,mapState} from "vuex";
	export default{
		name:'upperEditBar',
		data(){
			return{
				// 形状
				entity_shapes:[['circle','./imgs/circle.png'], ['rect','./imgs/rect.png'], ['roundRect','./imgs/roundRect.png'], 
				['triangle','./imgs/triangle.png'], ['diamond','./imgs/diamond.png']],
				// 线条样式
				line_styles:[['pin','./imgs/straight_line.png'],['dotted','./imgs/dummy_line.png']],
				// 关系
				line_direction:[['strait','/imgs/straight_line.png'],['left-arrow','./imgs/left-arrow.png'],['right-arrow','./imgs/right-arrow']],
				
				
				
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
	}
</script>

<style>
</style>
