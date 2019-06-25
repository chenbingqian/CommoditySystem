<template>
  	<div class="jxdd_start" >
  		<p>
  		 	1、假装这是一个登陆页面！
  		</p>
  		<p style="padding-top: 20px;">
  		 	<!-- 进行路由跳转  -->
  			2、<router-link to="/avue">点击切换路由</router-link>
  		</p>
    	<p style="padding-top: 20px;">
  			3、<i-button type="primary" @click="toOperationRouter">跳转到操作页面</i-button>
  		</p>
  	</div>
</template>

<script>
// 1、引入子组件
import api from 'api';
import logUtils from 'common/logUtils';
import consts from '@/common/consts';
export default {
  name: 'HelloWorld',
  data: function() {
    return {
    }
  },
  methods:{
  	toOperationRouter(){
  		this.$router.push('/xIndex/one');
  	}
  },
  created(){
  	console.log("this is created ！")
  },
  components: { }
}
</script>
<style>
	.jxdd_start {
		padding-left:20px;
		padding-top: 30px;
		width:100%;
		height: 100%;
		background-color:#CCCCCC;
	}
	
</style>
