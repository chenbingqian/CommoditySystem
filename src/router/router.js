//  前端路由
import Vue from 'vue'
// es6语法引入
import Router from 'vue-router'
import Vuex from 'vuex';
import iView from 'iview';

// 1、引入组件,进行路由切换组件
import Start from '@/view/Start.vue'
import Avue from '@/view/A.vue'
import xIndex from '@/view/index/operations.vue'
import study from '@/view/doc/study.vue'


import one from '@/view/business/one.vue'
import two from '@/view/business/two.vue'
import three from '@/view/business/three.vue'
import four from '@/view/business/four.vue'

import baseFile from '@/view/study/baseFile.vue'
import userInfo from '@/view/study/userInfoManger.vue'
import codeTypeList from '@/view/business/codeTypeList.vue'
// 2、注册
//使用VueRouter进行路由配置重定向,可以判断出路由的去向;
Vue.use(Router)
Vue.use(iView);
//可以配置全局使用公用状态,组件中可以状态共享;
Vue.use(Vuex);



// 3、实例化
export default new Router({
  routes: [
    {
      // 4、配置路由
      path: '/', // 默认的初始页面
      name: '默认的初始页面',
      component: Start
    },{
    	path: '/avue',
    	component: Avue
    },
    {
    	path: '/xIndex',
    	component: xIndex
    },
    {
      path: '/xIndex',
      name: '/xIndex',
      component: xIndex,
      auth: true,
      children: [
		    {
		    	path: 'one',
		    	name: '标题1',
		    	component: one
		    },
		    {
		    	path: '/xIndex/two',
		    	name: '标题2',
		    	component: two
		    },
		    {
		    	path: '/xIndex/three',
		    	name: '标题3',
		    	component: three
		    },
		    {
		    	path: '/xIndex/four',
		    	name: '标题4',
		    	component: four
		    },
		    {
		    	path: '/xIndex/study',
		    	name: '学习测试章节',
		    	component: study
		    },
		    {
		    	path: '/xIndex/study/baseFile',
		    	name: '常用操作',
		    	component: baseFile
		    },
		    {
		    	path: '/xIndex/study/userInfo',
		    	name: '用户列表',
		    	component: userInfo
		    },
		    {
		    	path: '/xIndex/codetypelist',
		    	name: '数字信息化',
		    	component: codeTypeList
		    }
      ]
    }
  ]
     
})
