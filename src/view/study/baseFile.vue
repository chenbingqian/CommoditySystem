<!--
	作者：offline
	时间：2018-06-15
	描述：对话框
-->
<template>
	<div style="padding-left:100px;padding-right:100px;" >
		<div style="background-color:#CCCCCC;">
			<div class="bane_box_sel">
				<ul>
				 	<li>
						<i-button type="primary" @click="isShowMethod">显示弹框</i-button>
					</li>
					<li>
						<i-button type="primary" @click="isShowMethod">添加用户信息</i-button>
					</li>
				</ul>
				<!--
	            	时间：2018-06-15
	            	描述：弹框，iview组件
	            -->
				<Modal
			        v-model="isShow" :mask-closable="false"
			        title="话框标题"
			        @on-ok="ok"
			        @on-cancel="cancel">
			        <p>对话框内容</p>
			    </Modal>
			</div>
		</div>
		<div style="background-color:#42B983;">
			<div class="bane_box_sel">
				<ul>
				 	<li>
				 		输入昵称：<Input placeholder="请输入昵称..." class="btn-input"  v-model="info.nickname" :maxlength="20"></Input>
					</li>
					<li>
						选择部门：
						<Select v-model="info.departmentName" class="btn-input"  placeholder="请选择所属部门..." @on-change="listeningDepartment">
			              <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{item.name}}</Option>
			            </Select>
					</li>
					<li>
						<i-button type="primary" @click="addInfo">提交</i-button>
					</li>
				</ul>
			</div>
		</div>
		<div style="background-color:#42B983;">
			<Table :columns="columns" :data="roleList" ></Table>
		</div>
	</div>
	
</template>

<script>
	import mockDate from '@/common/mockDate';
	import dateFormat from '@/common/dateFormat';
	export default {
		
		data(){
			return {
				//是否显示对话框
				isShow:false,
				// 用于下拉列表数据
				departmentList:[] ,
				// 待提交表单数据
				info:{
					nickname:'',
					departmentName:''
				},
				
				// table 待展示数据列表
				roleList : [],
				columns: [
		          {
		            type: 'selection',
		            width: 60,
		            align: 'center'
		          },
		          {
		            title: 'ID',
		            key: 'id',
		            align: 'center',
		            render: (h, params) => {
		              return h('div', [
		                h('strong', params.row.id)
		              ]);
		            }
		          },
		          {
		            title: '岗位名称',
		            key: 'name',
		            align: 'center',
		            render: (h, params) => {
		            	let show_data = params.row.name ? params.row.name : '--';
		              return h('div', show_data);
		            }
		          },
		          {
		            title: '所属部门',
		            key: 'department_name',
		            align: 'center',
		            render: (h, params) => {
		              let show_data = params.row.department_name ? params.row.department_name : '--';
		              return h('div', show_data);
		            }
		          },
		          {
		            title: '描述',
		            key: 'description',
		            align: 'center',
		            render: (h, params) => {
		              let show_data = params.row.description ? params.row.description : '--';
		              return h('div', show_data);
		            }
		          },
		          {
		            title: '创建时间',
		            key: 'create_time',
		            align: 'center',
		            sortable: true,
		            render: (h, params) => {
		               let show_data = params.row.create_time ? dateFormat.dateFormat(params.row.create_time*1000,'yyyy-MM-dd') : '--';
		               return h('div', show_data);
		            }
		          }
		        ]
        	}
		},
		methods:{
			
			// 切换下拉列表值
			listeningDepartment(date){
				
				console.log("下拉列表选中的值ID："+date)
			},
			// 提交表单数据
			addInfo(){
				console.log("待提交的表单数据："+JSON.stringify(this.info))
			},
			// 点击按钮，控制显示弹框
			isShowMethod(){
				this.isShow = true;
			},
			// 弹框点击确认
            ok () {
                this.$Message.info('点击了确定');
            },
            // 弹框点击取消
            cancel () {
                this.$Message.info('点击了取消');
            }
		},
		created (){
			this.departmentList = mockDate.baseFileDate.departmentList;
			this.roleList = mockDate.baseFileDate.roleList;
			
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