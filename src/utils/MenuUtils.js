import { resolve } from 'path'
import Layout from '@/views/layout/Layout'
export default (routers, data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  // generaMenu(routers, data)
  getMenu(routers, data)
}

const getMenu = (routers, data) => {
  console.log('data:', data)
  const menus = []
  for (let i = 0; i < data.length; i++) {
    const menuModule = data[i]
    const menu = {
      'path': `/${menuModule.moduleUrl}`,
      'component': Layout,
      'name': `${menuModule.moduleUrl}`,
      'meta': {
        'title': `${menuModule.moduleUrl}`,
        'icon': '',
        roles: ['admin', 'editor']
      },
      'children': []
    }
    console.info(menu)
    generateMenu(menu.children, menuModule)
    if (menu.children.length) {
      menu.redirect = menu.children[0].path
    }
    menus.push(menu)
    routers.push(menu)
  }
}

const generateMenu = (childrens, menuModule) => {
  for (let index = 0; index < menuModule.children.length; index++) {
    const el = menuModule.children[index]

    if (!el.component) continue
    const menu = {
      'path': `${el.moduleUrl}`,
      'name': `${el.moduleUrl}`,
      // "component":`@/views/${menuModule.moduleUrl}/${el.component}`,
      'component': resolve =>
        require([`@/views/${menuModule.moduleUrl}/${el.component}`], resolve),

      'meta': {
        'title': `${el.component}`,
        'icon': ''
      },
      'children': []
    }
    generateMenu(menu.children, el)
    childrens.push(menu)
  }
}
