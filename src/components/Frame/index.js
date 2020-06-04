import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {adminRouter} from '../../routes'
import { Layout, Menu,Dropdown,Badge, Avatar} from 'antd';
import { DownOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import './index.less'
import { getNotificationList } from "../../actions/notifications";
import {logout} from '../../actions/users' 

const { Header, Content, Sider } = Layout;  

const mapState=state=>{
  return {
    //通知消息数量
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
    avatar:state.users.avatar,
    displayName:state.users.displayName
  }
}

//使用withRouter包装组件使其可以使用history
@withRouter
@connect(mapState,{
  getNotificationList,
  logout
})
class Frame extends Component{

    componentDidMount(){
      this.props.getNotificationList()
    }

    //菜单项点击事件
    onMenuClick=({key})=>{
      this.props.history.push(key) //跳转路由
    }

    //ui路由跳转
    onDropDownClick=(item)=>{
      if(item.key==='/logout'){
        this.props.logout()
      }else{
        this.props.history.push(item.key)
      }
    }

    //下拉菜单（函数式，能实时随数据变化而渲染变化）
    renderMenu =()=>(
      <Menu onClick={this.onDropDownClick}>
        <Menu.Item key="/admin/notifications">
          <Badge dot={Boolean(this.props.notificationsCount)}> 
              通知中心
          </Badge>
        </Menu.Item>
        <Menu.Item key="/admin/profile">
            个人设置
        </Menu.Item>
        <Menu.Item key="/logout">
            退出登录
        </Menu.Item>
      </Menu>
    );

    render(){
      const menus=adminRouter.filter(route=>route.isNav===true)
       
        return (
            <Layout>
    <Header className="header">
      <div className="logo">
        <img src="./网易.png" alt="logo"/>
      </div>
      <div className="left-drop">
        <Dropdown overlay={this.renderMenu}>
            <div>
            <Avatar src={this.props.avatar} />&nbsp;
        <span>你好！{this.props.displayName}</span>
            <Badge count={this.props.notificationsCount} offset={[-7,-10]}> 
              <DownOutlined />
            </Badge>
            </div>
        </Dropdown>
      </div>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={this.props.location.pathname}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.onMenuClick}
        >
          {
            menus.map(route=>{
              return (
                <Menu.Item key={route.pathname}>
                {route.icon}
                {route.title}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
        )
    }
}

export default Frame