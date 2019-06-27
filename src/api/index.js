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
  	delCodeType:KikiApi+'/codetype/del',
  	
    // get code all list
    codeList :KikiApi+'/code/list',
    // insert code
    insertCode: KikiApi+'/code/insert',
    // delete code
    delCode: KikiApi +'/code/del',
};

export default {
	Api
};
export {
	Api
};
