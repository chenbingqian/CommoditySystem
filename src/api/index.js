'use strict';
import {
	OperationApi,
	UserInfoApi
} from './domain';

const Api = {
	// 获取列表用 get*,添加数据用 save*,删除数据用：remove*
	//获取系统的url
  	getSystemUrl:OperationApi+'/system/list',
  	saveUserInfoUrl:UserInfoApi+'/insert',
  	//获取用户列表
  	getUserInfoListUrl:UserInfoApi+'/query/list',
  	// 删除用户数据
  	removeUserInfoById:UserInfoApi+'/remove/userinfo/', //remove/userinfo/{userid} 
  	// 导出用户列表
  	exportUserInfoList:"http://localhost:8099/excel/v1/userinfo/list/export"
};

export default {
	Api
};
export {
	Api
};
