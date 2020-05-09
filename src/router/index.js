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
    icon: 'svg-name'             the icon show in the sidebar
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

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据总览', icon: 'DataOverview' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/factoryData',
    name: 'Example',
    meta: { title: '工厂建模', icon: 'example' },
    children: [
      {
        path: 'factoryData',
        name: 'factoryData',
        component: () => import('@/views/factoryData/index'),
        meta: { title: '工厂数据', icon: 'ZW' }
      },
      {
        path: 'WorkshopData',
        name: 'WorkshopData',
        component: () => import('@/views/WorkshopData/index'),
        meta: { title: '车间数据', icon: 'ZW' }
      },
      {
        path: 'ProductionData',
        name: 'ProductionData',
        component: () => import('@/views/ProductionData/index'),
        meta: { title: '产线数据', icon: 'ZW' }
      },
      {
        path: 'StationData',
        name: 'StationData',
        component: () => import('@/views/StationData/index'),
        meta: { title: '工位数据', icon: 'ZW' }
      },
      {
        path: 'VehiclData',
        name: 'VehiclData',
        component: () => import('@/views/VehiclData/index'),
        meta: { title: '车型数据', icon: 'ZW' }
      },
      {
        path: 'ProcessData',
        name: 'ProcessData',
        component: () => import('@/views/ProcessData/index'),
        meta: { title: '工序数据', icon: 'ZW' }
      },
      {
        path: 'faultManagement',
        name: 'faultManagement',
        component: () => import('@/views/faultManagement/index'),
        meta: { title: '故障管理', icon: 'ZW' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '数据分析',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: '/nestedcopy',
    component: Layout,
    redirect: '/nestedcopy/menu1',
    name: 'nestedcopy',
    meta: {
      title: '故障监测',
      icon: 'nested'
    },
    children: [
      {
        path: 'nestedcopymenu1',
        component: () => import('@/views/nestedcopy/nestedcopymenu1/index'), // Parent router-view
        name: 'nestedcopyMenu1',
        meta: { title: 'nestedcopyMenu1' },
        children: [
          {
            path: 'nestedcopymenu1-1',
            component: () => import('@/views/nestedcopy/nestedcopymenu1/menu1-1'),
            name: 'nestedcopyMenu1-1',
            meta: { title: 'Menu1-1' }
          }
        ]
      },
      {
        path: 'nestedcopymenu2',
        component: () => import('@/views/nestedcopy/nestedcopymenu2/index'),
        meta: { title: 'nestedcopymenu2' }
      }
    ]
  },
  

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '人员管理', icon: 'link' }
      }
    ]
  },

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
