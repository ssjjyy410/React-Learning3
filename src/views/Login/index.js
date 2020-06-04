import React,{Component} from 'react'
import {Card,Form,Input,Button,Checkbox} from "antd"
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../actions/users'
import "./index.less"       

const mapState=state=>({
    isLogin:state.users.isLogin,
    isLoading:state.users.isLoading
})

@connect(mapState,{
    login
})
class Login extends Component{

    handleSubmit=(values)=>{
        this.props.login(values)
    }

    render(){
        const formLayout={
            xs:{
                span:20,
                offset:2
            },
            md:{
                sapn:8,
                offset:8
            }
        }
        return (
            this.props.isLogin
            ?
            <Redirect to='/admin'/>
            :
            <Card 
                title="登录" 
                bordered={false} 
                {...formLayout}
                >
                <Form
                    name="login"
                    onFinish={this.handleSubmit}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required:true,
                                message:'用户名是必填的'
                            }
                        ]}
                    >
                        <Input disabled={this.props.isLoading} prefix={<UserOutlined className="username-item-icon" />} placeholder="username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required:true,
                                message:'密码是必填的'
                            }
                        ]}
                    >
                        <Input disabled={this.props.isLoading} prefix={<LockOutlined className="password-item-icon" />} placeholder="password" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={this.props.isLoading} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Login
