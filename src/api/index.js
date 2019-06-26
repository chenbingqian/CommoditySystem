'use strict';
import {
	KikiApi
} from './domain';

const Api = {
	// 获取列表用 get*,添加数据用 save*,删除数据用：remove*
	//get codeType list
  	codeTypeList:KikiApi+'/codetype/list',
  	// add codeType 
  	addCodeType:KikiApi+'/codetype/insert',
  	// del codeType
  	delCodeType:KikiApi+'/codetype/del'
  	

};

export default {
	Api
};
export {
	Api
};
