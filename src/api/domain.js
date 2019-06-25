'use strict';
/*!
 * domain.js v1.0.0
 * 域名配置类,分成测试和上线两种情况
 */

// 定义API版本号
const API_VERSION = '/v1';

export const OperationApi =  (process.env.NODE_ENV === 'production') ?
	'production' : 'http://192.168.10.106:5555/operation/operation'+API_VERSION;
export const UserInfoApi =  (process.env.NODE_ENV === 'userinfo') ?
	'userinfo' : 'http://localhost:8099/userInfo'+API_VERSION;