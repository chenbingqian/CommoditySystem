// 模拟数据 : xxxDate（xxx代表文件名称）

'use strict'

const vheaderDate = {
	// 菜单
	operationMenus : [
        {
        	"routerName":null,"names":"信息化配置","code":0,
          "icon":{"default":"../../static/image/other/journal.svg"},
          "subMenus":[
        		{"routerName":"/xIndex/codeTypeList","name":"数字信息化","code":0,"permissions":[]},
        		{"routerName":"/xIndex/two","name":"一级菜单1-2","code":0,"permissions":[],"index":3}
        		]
        },
        {
        	"routerName":null,"names":"一级菜单2","code":0,
          "icon":{"default":"../../static/image/other/journal.svg","hover":"","active":""},
          "subMenus":[
          	{"routerName":"/xIndex/three","name":"一级菜单2-1","code":0,"permissions":[],"index":4},
        		{"routerName":"/xIndex/four","name":"一级菜单2-2","code":0,"permissions":[],"index":5}
        	]
        },
        {
        	"routerName":null,"names":"技能模块","code":0,
          "icon":{"default":"../../static/image/other/journal.svg","hover":"","active":""},
          "subMenus":[
          	{"routerName":"/xIndex/study","name":"study-学习呢","code":0,"permissions":[],"index":6},
          	{"routerName":"/xIndex/study/baseFile","name":"study-常用操作","code":0,"permissions":[],"index":7},
            {"routerName":"/xIndex/study/userInfo","name":"study-用户操作","code":0,"permissions":[],"index":8}
        	]
        }
    ]
}
// 数据
const baseFileDate = {
	departmentList :  [
		{"id":0,"name":"跨部门"},{"id":70,"name":"销售部"},{"id":79,"name":"运营部"},{"id":88,"name":"开发部"},{"id":90,"name":"供应链"}
	],
	classList :  [
		{"id":9,"name":"高中一年级_0班"},{"id":10,"name":"高中一年级_1班"},{"id":11,"name":"高中二年级_0班"}
	],
	roleList :	[
		{"name":"市场岗位2","department_name":"市场部","description":"","create_time":1529043376,"id":10026},
		{"name":"市场岗位","department_name":"市场部","description":"","create_time":1529043351,"id":10025},
		{"name":"市场部-负责人","department_name":"市场部","description":"市场","create_time":1529043304,"id":10024}
	]
      
}



export default{
	vheaderDate,
	baseFileDate
}
export {
	vheaderDate,
	baseFileDate
}
