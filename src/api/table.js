import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

export function getList(params) {
  return request({
    url: 'http://10.11.47.209:8084/workservice/work/selectAll',
    method: 'get',
    params
  })
}

export function deleteById(data) {
  return request({
    url: `http://10.11.47.209:8084/workservice/work/${data.wid}`,
    method: 'post'
  })
}
// 选中后的批量删除
export function deleteLists(data) {
  return request({
    url: 'http://10.11.47.209:8084/workservice/work/deleteLists',
    method: 'post',
    data
  })
}

export function getWork(data) {
  return request({
    url: 'http://10.11.47.209:8084/workservice/work/getWork',
    method: 'post',
    data
  })
}

export function createWork(data) {
  return request({
    url: 'http://10.11.47.209:8084/workservice/work/createWork',
    method: 'post',
    data
  })
}

export function updateWorkInfo(data) {
  return request({
    url: 'http://10.11.47.209:8084/workservice/work/updateWorkInfo',
    method: 'post',
    data
  })
}
