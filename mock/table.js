const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    'action|1':['请处理','请审批','请审核','请测试'],
    theme: '@sentence(10, 15)',
    'status|1': ['已解决', '处理中', '未处理','指派','已关闭'],
    'priority|1':['高', '中', '低'],
    createWay: '人工创建',
    accepted: 'admin',
    'founder|1':['管理员','普通用户'],
    createTime: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
