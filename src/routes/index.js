/**
 * 路由配置
 */
import React from 'react'
import { DashboardOutlined,UnorderedListOutlined,SettingOutlined } from '@ant-design/icons';

import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    Notifications,
    Noauth,
    Profile,
    ArticleEdit,
    ArticleList
} from '../views'

export const mainRouter=[{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
},]

export const adminRouter=[{
    pathname:'/admin/dashboard',
    component:Dashboard,
    title:'仪表盘',
    icon:<DashboardOutlined />,
    isNav:true,
    roles:['001','002','003']
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    icon:<SettingOutlined />,
    isNav:true,
    roles:['001','002']
},{
    pathname:'/admin/notifications',
    component:Notifications,
    exact:true,
    roles:['001','002','003']
},{
    pathname:'/admin/noauth',
    component:Noauth,
    exact:true,
    roles:['001','002','003']
},{
    pathname:'/admin/profile',
    component:Profile,
    exact:true,
    roles:['001','002','003']
},{
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
    roles:['001','002']
},{
    pathname:'/admin/article',
    component:ArticleList,
    exact:true,
    title:'文章管理',
    icon:<UnorderedListOutlined />,
    isNav:true,
    roles:['001','003']
}]
