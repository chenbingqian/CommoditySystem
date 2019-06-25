/*
 * http请求工具类
 * eg：
 */
import axios from 'axios'
import api from 'api'
import consts from './consts'
import cacheUtils from './cacheUtils'
import utils from './utils'
import logger from './logUtils'

axios.defaults.timeout = 5000;
axios.defaults.hasGlobalSpin = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// POST传参序列化,增加token
axios.interceptors.request.use((config) => {
	
	// 判断是否存在instance_id  这里不懂，为什么要写俩次
  if(!cacheUtils.localStorage(consts.INSTANCE_ID).get(consts.INSTANCE_ID)) {
  	console.log("从缓存中获取instance_id 失败！重新生成instance_id.")
    cacheUtils.localStorage(consts.INSTANCE_ID).set(consts.INSTANCE_ID, utils.uuidV4().replace(new RegExp(/(-)/g), ''));
    console.log("重新生成的instance_id : "+ cacheUtils.localStorage(consts.INSTANCE_ID).get(consts.INSTANCE_ID))
  }
  
  config.headers[consts.INSTANCE_ID] = cacheUtils.localStorage(consts.INSTANCE_ID).get(consts.INSTANCE_ID);
  config.headers[consts.ACCESSTOKEN] = cacheUtils.cookie.get(consts.ACCESSTOKEN);
  config.headers[consts.APP_NAME] = 'KIKI';
  
  logger.log('请求参数:' + JSON.stringify(config))
  if(config.hasGlobalSpin === true) {
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error);
});

// 处理请求返回数据
axios.interceptors.response.use((res) => {
	console.log("返回数据："+JSON.stringify(res.headers))
	// 判断是否存在token
  if(res.headers[consts.ACCESSTOKEN]) {
  		console.log("token为空，")
  	var token = res.headers[consts.ACCESSTOKEN];
  	//若存在，则进行设置token 到 cookie中
    cacheUtils.cookie.set(consts.ACCESSTOKEN, token)
  }else{
  	 // 模拟产生数据
  	// cacheUtils.cookie.set(consts.ACCESSTOKEN, 'aaabbb')
  }
  logger.log('请求结果:' + JSON.stringify(res.data));
  
  if(res.data.error_code == consts.ERROR_CODE.INSTANCE_ID_NO_ACCESS_TOKEN 
  	|| res.data.error_code == consts.ERROR_CODE.UNAUTHORIZED_ACCESS
  	|| res.data.error_code == consts.ERROR_CODE.NO_ACCESS_TOKEN 
  	|| res.data.error_code == consts.ERROR_CODE.PROGRAM_ERROR) {
    return Promise.reject(res.data.error_code)
  }
  // 当数据为空时，进行初始化数据，以免出现空异常
  if(!res.data.result_data) {
    res.data.result_data = [];
  }
  // 对数据进行默认格式处理
  if(res.data.result_data && Object.keys(res.data.result_data).indexOf('items') != -1 && res.data.result_data.items != null) {
    res.data.result_data = res.data.result_data['items']
  }
  return res.data
}, (error) => {
  console.log('网络异常' + error);
  return Promise.reject(error)
});

export default axios
