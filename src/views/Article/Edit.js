import React,{Component} from 'react'
import {Card,Button,Form,Input,DatePicker,Spin,message} from 'antd'
import E from 'wangeditor'
import {getArticleById,saveArticle} from '../../requests'
import moment from 'moment'

class Edit extends Component{
    constructor(props){
        super(props)
        this.editorRef = React.createRef()
        this.formRef=React.createRef()
        this.state={
            isSaving:false
        }
    }

    componentDidMount(){
        this.initEditor()

        //根据url中的id从后台获取单个文章
        this.setState({
            isSaving:true
        })
        getArticleById(this.props.match.params.id).then(res=>{
            console.log(res)
            const {id,...data}=res //获取需要的值
            data.createAt=moment(data.createAt) //时间格式化(moment转时间戳)，以便在表单中显示
            this.formRef.current.setFieldsValue(data) //设置form表单内容
            this.editor.txt.html(data.content) //设置文版编辑框内容
        }).finally(()=>{
            this.setState({
                isSaving:false
            })
        })
    }

    //表单提交事件
    onSubmit=(values)=>{
        this.setState({
            isSaving:true
        })
        const data=Object.assign({},values,{
            createAt:values.createAt.valueOf() //将时间戳改为时间
        }) 
        //保存文章
        saveArticle(this.props.match.params.id,data).then(res=>{
            message.success(res.msg)
            //路由跳转
            this.props.history.push('/admin/article')
        }).finally(()=>{
            this.setState({
                isSaving:false
            })
        })
    }

    //创建文本编辑器
    initEditor=()=>{
        this.editor=new E(this.editorRef.current)
        this.editor.customConfig.zIndex = 100
        this.editor.customConfig.onchange = (html)=>{
            // html 即变化之后的内容
            console.log(html)
            this.formRef.current.setFieldsValue({
                content:html
            })
        }
        this.editor.create()
    }

    render(){
        const formItemLayout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 21,
            },
        };
        const {isSaving}=this.state
        return (
            <Card 
                title="文章编辑" 
                bordered={false} 
                extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
                <Spin spinning={isSaving}>    
                <Form
                    onFinish={this.onSubmit}
                    ref={this.formRef}
                    >
                    <Form.Item
                        {...formItemLayout}
                        name="title"
                        label="标题"
                        rules={[
                            {
                                required:true,
                                message:'标题是必填的'
                            }
                        ]}
                    >
                        <Input placeholder="标题" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="author"
                        label="作者"
                        rules={[
                            {
                                required:true,
                                message:'作者是必填的'
                            }
                        ]}
                    >
                        <Input placeholder="作者" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="amount"
                        label="阅读量"
                        rules={[
                            {
                                required:true,
                                message:'阅读量是必填的'
                            }
                        ]}
                    >
                        <Input placeholder="0" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="createAt"
                        label="创建时间"
                        rules={[
                            {
                                required:true,
                                message:'时间是必填的'
                            }
                        ]}
                    >
                        <DatePicker showTime placeholder="选择时间"/>
                    </Form.Item> 
                    <Form.Item
                        {...formItemLayout}
                        name="content"
                        label="内容"
                        rules={[
                            {
                                required:true,
                                message:'内容是必填的'
                            }
                        ]}
                    >
                        <div ref={this.editorRef}></div>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={
                            {span:4,offset:12}
                        }
                    >
                        <Button htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
                </Spin>
            </Card>
        )
    }
}

export default Edit
