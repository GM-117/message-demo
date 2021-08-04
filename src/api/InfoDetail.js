import request from '@/utils/request'

// 首页获取服务器信息
export function getSysInfo(params) {
  return request({
    // url: 'http://10.11.42.203:88/api/realtime-monitor/monitor/system/sysInfo',
    url: '/realtime-monitor/monitor/system/sysInfo',
    method: 'get',
    params,
    baseURL: '/api'
  })
}
// 系统配置post请求
export function postConfig(data) {
  return request({
    url: 'http://10.11.42.203:8083/monitor/sysconfig/update',
    method: 'post',
    data
  })
}
// 系统配置get获取信息
export function getConfig(params) {
  return request({
    url: '/realtime-monitor/monitor/sysconfig/SysConfigInfo',
    method: 'get',
    params,
    baseURL: '/api'
  })
}
// 1小时
export function get01DateSysInfo(params) {
  return request({
    url: '/realtime-monitor/monitor/system/collOneDateSysInfo/1',
    method: 'get',
    params,
    baseURL: '/api'
  })
}
// 24小时
export function get24DateSysInfo(params) {
  return request({
    url: '/realtime-monitor/monitor/system/collOneDateSysInfo/24',
    method: 'get',
    params,
    baseURL: '/api'
  })
}

// 接口信息
export function addUserSettings(params) {
  return request({
    // url: 'http://10.11.42.203:88/api/realtime-monitor/monitor/system/sysInfo',
    url: 'http://10.11.41.15:8085/message/user-settings/addUserSettings',
    method: 'get',
    params
  })
}
// 接口信息
export function changeBasicSettings(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/user-settings/changeBasicSettings',
    method: 'get',
    params
  })
}
// 接口信息
export function changeMonitorSettings(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/user-settings/changeMonitorSettings',
    method: 'get',
    params
  })
}
// 接口信息
export function changeWorkSettings(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/user-settings/changeWorkSettings',
    method: 'get',
    params
  })
}

// 接口信息
export function getUser(params) {
  return request({
    // url: 'http://10.11.42.203:88/api/realtime-monitor/monitor/system/sysInfo',
    url: 'http://10.11.40.120:8082/userservice/user/quaryAll',
    method: 'get',
    params
  })
}
