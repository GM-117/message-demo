import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/userCenter',
  //   component: () => import('@/views/userCenter/userCenter'),
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'user', isHomePage: true }
    }
    ]
  },
  {
    path: '/userCenter',
    component: Layout,
    hidden: true,
    children: [{
      path: 'userCenter',
      name: 'userCenter',
      component: () => import('@/views/userCenter/userCenter'),
      meta: { title: '个人中心', isHomePage: true }
    }]
  },
  {
    path: '/config_page',
    component: Layout,
    redirect: '/config_page',
    children: [{
      path: 'config_page',
      name: 'Config_page',
      component: () => import('@/views/config_page/index'),
      meta: { title: '系统配置', icon: 'example', isHomePage: true }
    }
    ]
  },
  {
    path: '/smallServe',
    component: Layout,
    redirect: '/smallServe',
    children: [{
      path: 'smallServe',
      name: 'smallServe',
      component: () => import('@/views/smallServe/index'),
      meta: { title: '微服务监控', icon: 'international', isHomePage: true }
    }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '用户管理', icon: 'form', isHomePage: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/manage',
    name: 'order',
    // component: () => import('@/views/table/index'),
    meta: { title: '工单管理', icon: 'dashboard', affix: true },
    children: [
      {
        path: 'display',
        name: 'Display',
        component: () => import('@/views/display/index'),
        meta: { title: '工单展示', icon: 'table', isHomePage: true }
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/add/index'),
        meta: { title: '工单添加', icon: 'tree', isHomePage: true }
      }
    ]
  },

  {
    path: '/subscribe',
    component: Layout,
    redirect: '/subscribe',
    children: [
      {
        path: 'subscribe',
        name: 'subscribe',
        component: () => import('@/views/subscribe/index'),
        meta: { title: '订阅管理', icon: 'nested', isHomePage: true }
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    redirect: '/history',
    children: [{
      path: 'history',
      name: 'history',
      component: () => import('@/views/history/index'),
      meta: { title: '历史消息', icon: 'message', isHomePage: true }
    }
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
