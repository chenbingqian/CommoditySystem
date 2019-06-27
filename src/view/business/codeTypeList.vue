<!--
	作者：offline
	时间：2019-06-25
	描述：
-->
<template>
	<div style="padding-left:100px;padding-right:100px;" >
		<div style="background-color:#42B983;">
			<div class="bane_box_sel">
				<ul>
				 	<li>
				 		输入数字编码类型：<Input placeholder="请输入..." class="btn-input"  v-model="info.code_type" :maxlength="20"></Input>
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
		<div style="background-color:#42B983;">
			<Table :columns="columns" :data="list" @on-select="selectRow" @on-select-all="selectRow" @on-selection-change="selectRow"></Table>
		</div>
	</div>
</template>

<script>
	import mockDate from '@/common/mockDate';
	import consts from '@/common/consts';
	import dateFormat from '@/common/dateFormat';
	import api from 'api';
    import axios from 'common/httpUtils';
	export default {
		data(){
			return {
				
				// 复选框选中数据
				selectionRow:[],
				// 待提交表单数据
				info:{
					code_type:'',
					description:''
				},
				
				// table 待展示数据列表
				list : [],
				columns: [
		            {
			            type: 'selection',
			            width: 60,
			            align: 'center'
		            },
			        {
			            title: '数据字典编码',
			            key: 'code_type',
			            align: 'center',
			            render: (h, params) => {
			              return h('div', [
			                h('strong', params.row.code_type)
			              ]);
			            }
			        },
			        {
			            title: '字典说明',
			            key: 'description',
			            align: 'center',
			            render: (h, params) => {
			            	let show_data = params.row.description ? params.row.description : '--';
			              return h('div', show_data);
			            }
			        },
				    {
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
					                   		this.deleteInfo(params.row.code_type);
					                 	}
					                }
					            }, '删除')
				            ]);
				        }
			        }
		        ]
        	}
		},
		methods:{
			
			// 复选框选中数据
			selectRow:function(selection,row){
				this.selectionRow=selection;
				console.log(JSON.stringify(this.selectionRow))
			},
			// 删除用户数据
			deleteInfo(codeType){
				axios({
					method:'POST',
					url:api.Api.delCodeType,
					data:{
						"code_type":codeType
					}
				}).then(response =>{
					this.getList();
				}).catch(error =>{
					console.log(error)
				})
			},
			// 提交表单数据
			addInfo(){
				console.log("待提交的表单数据："+JSON.stringify(this.info))
				if(this.info.code_type == null || this.info.code_type == ""){
					this.$Message.error('数据不能为空！');
					return
				}
				axios({
					method: 'POST',
					url: api.Api.addCodeType,
					data:this.info
				}).then(response => {
					console.log(JSON.stringify(response));
					if(response.result_code != consts.ERROR_CODE.SUCCESS){
 						this.$Message.error('数据字典不能重复！');
					}
					
					this.getList();
				}).catch(error => {
					console.log(error)
				});
			},
		
            //获取列表信息
            getList(){
	            	axios({
	            		method: 'GET',
	            		url: api.Api.codeTypeList
	            	}).then(response => {
	            		console.log(JSON.stringify(response));
	            		this.list = response.result_data;
	            	}).catch(error => {
	            		console.log(error)
	            	})
            }
		},
		created (){
			// 获取列表
			this.getList();
		}
	}
	
</script>

<style>
	.btn-input{
    	width:200px;
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
</style>