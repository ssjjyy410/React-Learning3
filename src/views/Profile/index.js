import React,{Component} from 'react'
import {Card,Upload,Spin} from 'antd';
import {connect} from 'react-redux'
import axios from 'axios' 
import {changeAvatar} from '../../actions/users'   

const mapState=state=>({
    avatarUrl:state.users.avatar
})

@connect(mapState,{
    changeAvatar
})
class Profile extends Component{
    state={
        isUploading:false, //是否上传中
    }

    //自定义上传实现
    handleUploadAvatar=({file})=>{
        //定义上传图片数据的格式
        const data=new FormData()
        //整合上传数据
        data.append('Token','473d3337bd4d4cbbb3f8348d02d1d47ff054c1d6:QVCXTvmvZ4QcQWuYcd0pf0bGSSw=:eyJkZWFkbGluZSI6MTU5MDM5MTA0MywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE5NzM5IiwiYWlkIjoiMTY5MTc3NSIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        //加载中
        this.setState({
            isUploading:true
        })
        //向接口发送上传图片请求
        axios.post('http://up.imgapi.com/',data).then(res=>{
            console.log(res)
            if(res.status===200){
                this.setState({
                    isUploading:false,
                })
                this.props.changeAvatar(res.data.linkurl)
            }else{
                //处理错误情况
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        return (
            <Card
                title="个人设置"
                bordered={false}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                >
                    <Spin spinning={this.state.isUploading}>
                        {
                            this.props.avatarUrl ? <img src={this.props.avatarUrl} alt="user"/> : <span>上传头像</span>
                        }
                    </Spin>
                </Upload>
            </Card>
        )
    }
}

export default Profile
