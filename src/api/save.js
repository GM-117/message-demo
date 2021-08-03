import request from '@/utils/request'

export function changeBasicSettings(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/user-settings/changeBasicSettings',
    method: 'get',
    params
  })
}

export function checkSettings(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/user-settings/checkSettings',
    method: 'get',
    params
  })
}
