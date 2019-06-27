<!--
	20190627
 -->
<template>
	<div style="padding-left: 100px;padding-right: 100px;">
		<div style="background-color:#42B983;" class="top_box">
			<div class="bane_box_sel">
				<ul>
				 	<li>
				 		输入数字编码类型：

				 		<Select v-model="info.code_type" class="btn-input" placeholder="选择字典类型..." >
				 			<Option v-for="item in codeTypeList" :value="item.code_type" :key="item.code_type" >
				 				{{item.description}}
				 			</Option>
				 		</Select>
					</li>
					<li>
				 		输入编码名称：<Input placeholder="请输入..." class="btn-input"  v-model="info.name" :maxlength="20"></Input>
					</li>
					<li>
				 		输入编码值：<Input placeholder="请输入..." class="btn-input"  v-model="info.value" :maxlength="20"></Input>
					</li>
					<li>
				 		输入含义：<Input placeholder="请输入..." class="btn-input"  v-model="info.description" :maxlength="20"></Input>
					</li>
					<li>
						<i-button type="primary" @click="addInfo">提交</i-button>
					</li>
				</ul>
			</div>
		</div>
		<div style="background-color:#42B983; " class="table_box">
			<Table :columns="columns" :data="list" @on-select="selectRow" @on-select-all="selectRow" @on-selection-change="selectRow"></Table>
		</div>
	</div>
</template>

<script>
	import axios from 'common/httpUtils';
	import consts from '@/common/consts';
	import api from 'api';
	export default {
		data(){
			return {
				// 复选框选中数据
				selectionRow:[],
				// 待提交表单数据
				info:{
					code_type:'',
					value:'',
					name:'',
					description:''
				},
				// 数据字典类型集合
				codeTypeList:[],
				// 数据集
				list:[],
				columns:[
					{
						type:'selection',
						width:60,
						align:'center'
					}, {
			            title: '数据字典编码',
			            key: 'code_type',
			            align: 'center',
			            render: (h, params) => {
			              return h('div', [
			                h('strong', params.row.code_type)
			              ]);
			            }
			        },{
			        	title:'字典名称',
			        	key:'name',
			        	align:'center',
			        	rander:(h,params) =>{
			        		return h('div',[
			        			h('strong',params.row.name)
			        		])
			        	}
			        },{
			        	title:'字典值',
			        	key:'value',
			        	align:'center',
			        	rander:(h,params) =>{
			        		return h('div',[
			        			h('strong',params.row.value)
			        		])
			        	}
			        },{
			        	title:'字典值说明',
			        	key:'description',
			        	align:'center',
			        	rander:(h,params) =>{
			        		return h('div',[
			        			h('strong',params.row.description)
			        		])
			        	}
			        },{
			            title: '操作',
			            key: 'operation',
			            width: 200,
			            align: 'center',
			            render: (h, params) => {
				            return h('div', [
					            h('Button', {
					                props: {
					                   type: 'primary',
					                   size: 'small'
					                },
					                style: {
					                   marginRight: '5px'
					                },
					                on: {
					                   	click: () => {
					                   		// 删除数据
					                   		this.deleteInfo(params.row.code_type,params.row.value);
					                 	}
					                }
					            }, '删除')
				            ]);
				        }
			        }
				],
			}

		},
		methods:{
			// 复选框选中数据
			selectRow:function(selection,row){
				this.selectionRow=selection;
				console.log(JSON.stringify(this.selectionRow))
			},
			// 删除
			deleteInfo(codeType,value){
				var data = {
					"code_type":codeType,
					"value":value
				};
				axios({
					method :"POST",
					url: api.Api.delCode,
					data:data
				}).then(response =>{
					console.log(JSON.stringify(response));
					if(response.result_code  ==  consts.ERROR_CODE.ERROR){
						this.$Message.error(response.msg);
					}
					this.getList();
				}).catch(error =>{
					console.log(error)
				});
			},
			// 添加数据
			addInfo(){
				console.log("待提交的表单数据："+JSON.stringify(this.info))
				if(this.info.code_type == "" || 
					this.info.value == "" || this.info.name =="" || this.info.description == ""){
					this.$Message.error('数据不能为空！');
					return
				}
				axios({
					method: 'POST',
					url: api.Api.insertCode,
					data:this.info
				}).then(response => {
					console.log(JSON.stringify(response));
					if(response.result_code  ==  consts.ERROR_CODE.ERROR){
						this.$Message.error(response.msg);
					}else if(response.result_code != consts.ERROR_CODE.SUCCESS){
 						this.$Message.error('数据字典不能重复！');
					}
					
					this.getList();
				}).catch(error => {
					console.log(error)
				});
			},
			// 获取数据列表
			getList(){
				axios({
            		method: 'GET',
            		url: api.Api.codeList
            	}).then(response => {
            		console.log(JSON.stringify(response));
            		this.list = response.result_data;
            	}).catch(error => {
            		console.log(error)
            	})
			},
			// 获取字典类型
			getCodeTypeList(){
				axios({
					method:"GET",
					url:api.Api.codeTypeList
				}).then(response =>{
					this.codeTypeList = response.result_data;
				}).catch(error =>{
					console.log(error)
				});
			}

		},
		created (){
			this.getCodeTypeList();
			this.getList();
		}
	}
</script>

<style>
	.btn-input{
    	width:200px;
    }
    .top_box{
    	float: left;
    }
    .bane_box_sel{
    	width: 100%;
   		height:100px;
  	}
  	.bane_box_sel>ul{
    	width: 100%;
    	height:100px;
  	}
    .bane_box_sel>ul>li{
	   /* width: 20%;*/
	    height:100px;
	    float: left;
	    line-height: 65px;
	    padding-left: 15px;
	}
	.table_box {
		width: 100%;
		float: left;
	}

</style>