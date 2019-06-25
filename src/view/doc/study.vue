<template>
	<div style="margin-left: 120px;">
		测试章节
		
	</div>
	
	
</template>

<script type="text/ecmascript-6">
	// 要使用模板，也需要进行引入
	
	export default {
		data() {
			return {
				//定义属性
			}
		},
		methods: {
			
		},
		ready(){
			 // 版本1 里面才有
			 console.log("======ready")
		},
		created(){
			// created 最先执行，其次 route,然后ready
			console.log("1======created")
		},
		mounted () {
			console.log("2======mounted")
		},
		route: {
			 data(){
			 	// 页面加载时  版本1 里面才有
			 	// route 优先于 ready 执行
			 	console.log("======route")
			 }
		}
	}
	
</script>

<style>
</style>