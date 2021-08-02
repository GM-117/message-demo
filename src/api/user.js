import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function queryUserAll(params) {
  return request({
    url: 'http://10.11.41.15:8082/userservice/user/quaryAll',
    method: 'get',
    params
  })
}

export function saveUser(data) {
  return request({
    url: 'http://10.11.41.15:8082/userservice/user/save',
    method: 'post',
    data
  })
}
export function editUser(data) {
  return request({
    url: 'http://10.11.41.15:8082/userservice/user/updateById',
    method: 'post',
    data
  })
}
export function deleteOneUser(params) {
  return request({
    url: `http://10.11.41.15:8082/userservice/user/deleteById/${params.uid}`,
    method: 'get'
  })
}
export function deleteAllUser(params) {
  return request({
    url: 'http://10.11.41.15:8082/userservice/user/delete',
    method: 'get',
    params
  })
}
