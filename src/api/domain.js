'use strict';
/*!
 * domain.js v1.0.0
 * 域名配置类,分成测试和上线两种情况
 */

// 定义API版本号
const API_VERSION = '/v1';

export const KikiApi =  (process.env.NODE_ENV === 'kiki') ?
	'production' : 'http://localhost:8000/kiki'+API_VERSION;