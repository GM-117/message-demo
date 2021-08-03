import request from '@/utils/request'

export function getAllMessage(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/message/getAllMessage ',
    method: 'get',
    params
  })
}

export function deleteOne(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/message/delete',
    method: 'get',
    params
  })
}

export function getMessageByCondition(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/message/getMessageByCondition',
    method: 'get',
    params
  })
}

export function deleteAll(params) {
  return request({
    url: 'http://10.11.41.15:8085/message/message/deleteAll',
    method: 'get',
    params
  })
}
