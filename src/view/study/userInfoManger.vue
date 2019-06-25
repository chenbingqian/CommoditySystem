<!--
	作者：offline
	时间：2018-06-15
	描述：对话框
-->
<template>
	<div style="padding-left:100px;padding-right:100px;" >
		<!--
        	作者：offline
        	时间：2019-05-21
        	描述：导出
        -->
		<form enctype='application/json' method="post" :action="exportURL" style="display:none" target="iframe">
	        <input name='ids' v-model="exportData.ids">
	        <button type="submit" id="subBtn">下载</button>
	    </form>
	    <iframe style="display: none;" name="iframe"></iframe>
	    
		<div style="background-color:#CCCCCC;">
			<div class="bane_box_sel">
				<ul>
				 	<li>
						<i-button type="primary" @click="isShowMethod">显示弹框</i-button>
					</li>
					<li>
						<i-button type="button" @click="okExport">导出用户列表</i-button>
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
				 		输入昵称：<Input placeholder="请输入昵称..." class="btn-input"  v-model="info.userName" :maxlength="20"></Input>
					</li>
					<li>
						选择班级：
						<Select v-model="info.classId" class="btn-input"  placeholder="请选择班级..." @on-change="listeningClass">
			              <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.name}}</Option>
			            </Select>
					</li>
					<li>
				 		输入年龄：<Input placeholder="请输入年龄..." class="btn-input"  v-model="info.userAge" :maxlength="20"></Input>
					</li>
					<li>
				 		输入评论：<Input placeholder="请输入评论..." class="btn-input"  v-model="info.userRemark" :maxlength="20"></Input>
					</li>
					<li>
						<i-button type="primary" @click="addInfo">提交</i-button>
					</li>
				</ul>
			</div>
		</div>
		<div style="background-color:#42B983;">
			<Table :columns="columns" :data="userInfoList" @on-select="selectRow" @on-select-all="selectRow" @on-selection-change="selectRow"></Table>
		</div>
	</div>
	
</template>

<script>
	import mockDate from '@/common/mockDate';
	import dateFormat from '@/common/dateFormat';
	import api from 'api';
    import axios from 'common/httpUtils';
	export default {
		data(){
			return {
				exportData:{"ids":[]},
				exportURL:api.Api.exportUserInfoList,
				// 复选框选中数据
				selectionRow:[],
				data:[],
				//是否显示对话框
				isShow:false,
				// 用于下拉列表数据
				classList:[] ,
				// 待提交表单数据
				info:{
					userName:'',
					classId:0,
					userAge:'',
					userRemark:''
				},
				
				// table 待展示数据列表
				userInfoList : [],
				columns: [
		            {
			            type: 'selection',
			            width: 60,
			            align: 'center'
		            },
			        {
			            title: '用户ID',
			            key: 'userId',
			            align: 'center',
			            render: (h, params) => {
			              return h('div', [
			                h('strong', params.row.userId)
			              ]);
			            }
			        },
			        {
			            title: '学校名称',
			            key: 'schoolName',
			            align: 'center',
			            render: (h, params) => {
			            	let show_data = params.row.schoolName ? params.row.schoolName : '--';
			              return h('div', show_data);
			            }
			        },
			        {
			            title: '班级名称',
			            key: 'className',
			            align: 'center',
			            render: (h, params) => {
			              let show_data = params.row.className ? params.row.className : '--';
			              return h('div', show_data);
			            }
			        },
			        {
			            title: '学生昵称',
			            key: 'userName',
			            align: 'center',
			            render: (h, params) => {
			              let show_data = params.row.userName ? params.row.userName : '--';
			              return h('div', show_data);
			            }
			        },
			        {
			            title: '年龄',
			            key: 'userAge',
			            align: 'center',
			            sortable: true,
			            render: (h, params) => {
			               let show_data = params.row.userAge ? params.row.userAge :'--';
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
					                   		// 删除用户数据
					                   		this.deleteUserInfo(params.row.userId);
					                 	}
					                }
					            }, '删除'),
					            
					            h('Poptip', {
						            props: {
					                   trigger: 'click',
					                   placement: 'bottom'
						            }
						        }, 
						            [h('Button', {
						                    props: {
						                      type: 'warning',
						                      size: 'small'
						                    },
						                    style: {
						                      marginRight: '5px',
						                    }
					                	},'编辑'
					                ),
					                h('div', {
					                   slot: 'content',
					                }, [
					                   h('ul', this.data.map(item => {
					                     return h('li', {
					                       style: {
					                         textAlign: 'center',
					                         padding: '4px',
					                         cursor:'pointer',
					                         borderBottom:'1px solid #cccccc'
					                       },
					                       on: {
					                         click: () => {
					                         	
					                         }
					                       }
					                     }, item.name)
					                   }))
					                ])
					            ])
				            ]);
				        }
			        }
		        ]
        	}
		},
		methods:{
			okExport() {
				if(this.selectionRow != undefined && this.selectionRow.length>0){
					
					var ids = this.selectionRow.map(item =>{
						return item.userId;
					})
					this.exportData.ids = ids;
					console.log(JSON.stringify(ids))
					var that = this;
		            this.$nextTick(function() {
		                document.getElementById('subBtn').click();
		                that.getUserInfoList();
		                that.selectionRow = [];
		            });
				}else{
					 this.$Message.info('请选择数据！');
				}
	            
	        },
			// 复选框选中数据
			selectRow:function(selection,row){
				this.selectionRow=selection;
				console.log(JSON.stringify(this.selectionRow))
			},
			// 删除用户数据
			deleteUserInfo(userId){
				axios({
					method:'GET',
					url:api.Api.removeUserInfoById+userId
				}).then(response =>{
					this.getUserInfoList();
				}).catch(error =>{
					console.log(error)
				})
			},
			// 切换下拉列表值
			listeningClass(date){
				console.log("下拉列表选中的值ID："+date)
				
			},
			// 提交表单数据
			addInfo(){
				console.log("待提交的表单数据："+JSON.stringify(this.info))
				let data = this.info;
				axios({
					method: 'POST',
					url: api.Api.saveUserInfoUrl,
					data:data
				}).then(response => {
					console.log(JSON.stringify(response));
				}).catch(error => {
					console.log(error)
				});
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
            },
            //获取用户列表信息
            getUserInfoList(){
            	axios({
            		method: 'GET',
            		url: api.Api.getUserInfoListUrl
            	}).then(response => {
            		console.log(JSON.stringify(response));
            		this.userInfoList = response.result_data;
            	}).catch(error => {
            		console.log(error)
            	})
            }
		},
		created (){
			// 班级信息
			this.classList = mockDate.baseFileDate.classList;
			// 获取列表
			this.getUserInfoList();
			this.data = [{"id":1,"name":"编辑"},{"id":2,"name":"删除"}];
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