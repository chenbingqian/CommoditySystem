'use strict'
/*!
 * consts.js v1.0.0
 * 常量列表js，主要是用来存一些常量，避免大家都各自在各个地方定义常量，便于统一管理<br>
 * 缓存的前缀和key需要注意，不能重复，所以，缓存的前缀，大家尽量按照模块名称来取，保证前缀不重复，例如登录的相关信息，前缀都用login
 * key也都在这里统一定义，这样就可以很明确的知道那些名字已经被占用了，已经存在了。
 * Author:
 * Date:
 * 使用方法：
 *        import consts from 'common/consts.js'
 *        consts.INSTANCE_ID
 */


/** **************缓存相关start*************************/
// 登录成功,用户相关信息
// 用户信息
const INSTANCE_ID = 'instance_id'

// access_token缓存
const ACCESSTOKEN = 'access_token'

// 应用名称
const APP_NAME = 'application_name'


/** **************缓存相关end*************************/

const ERROR_CODE = {
  SUCCESS: '10000', // 成功
  INSTANCE_ID_NO_SECURITY_ID: '61011', // instance_id和security_id不匹配
  INSTANCE_ID_NO_ACCESS_TOKEN: '61012', // instance_id和access_token不匹配
  UNAUTHORIZED_ACCESS: '61018', // 无权访问
  NO_ACCESS_TOKEN: '61003', // access_token不存在
  NO_SECURITY_ID: '61004', // security_id不存在
}

export default {
  INSTANCE_ID,
  ACCESSTOKEN,
  APP_NAME,
  ERROR_CODE
}
export { 
  INSTANCE_ID,
  ACCESSTOKEN,
  APP_NAME,
  ERROR_CODE
 }
