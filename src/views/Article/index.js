import React,{Component} from 'react'
import {Card,Button,Table, Tag,Modal,Typography,message} from 'antd'
import moment from 'moment/moment'
import {getArticle,deleteArticle} from '../../requests' 

const titleDisplayMap={
    id:'id',
    title:'标题',
    author:'作者',
    createAt:'创建时间',
    amount:'阅读量'
}
                                        
export default class Article extends Component{
    state={
        dataSource:[
            
          ],
          
          columns: [
            
          ],
          total:0, //总的表格行数
          isLoading:false, //表格是否加载
          offset:0, //当前所在分页
          limited:10, //每个分页显示数量
          title:'', //删除的文章名
          confirmLoading:false, //对话框确定按钮是否加载,
          visible:false, //对话框是否显示
    }

    //获取文章列表
    getData=()=>{
        this.setState({
            isLoading:true //表格加载中
        })
        getArticle(this.state.offset,this.state.limited).then(res=>{
            //获取标题
            const columnKeys=Object.keys(res.list[0])
            const columns=columnKeys.map(item=>{
                if(item==='amount'){
                    return {
                        title:titleDisplayMap[item],
                        key: item,
                        render:(record)=>{
                            const {amount}=record
                            return <Tag color={amount>230 ? 'red':'green'}>{record.amount}</Tag>
                        }
                    } 
                }else if(item==='createAt'){
                    return {
                        title:titleDisplayMap[item],
                        key: item,
                        render:(record)=>{
                            const {createAt}=record
                            return moment(createAt).format('YYYY-MM-DD HH:mm:ss')
                        }
                    } 
                }
                return {
                    title:titleDisplayMap[item],
                    dataIndex:item,
                    key: item,
                }
            })
            columns.push({
                title:'操作',
                key:'action',
                render:(record)=>{
                    return <div>
                        <Button type="primary" size="small" onClick={this.toEdit.bind(this,record)}>编辑</Button><Button type="primary" danger size="small" onClick={this.onDeleteArticle.bind(this,record)}>删除</Button>
                    </div>
                }
            })
            //避免异步加载数据后，路由跳转导致该组件销毁从而state无法渲染的问题
            //只有组件加载后才能渲染，避免上述错误
            if(this.updater.isMounted(this)) 
                return this.setState({
                    total:res.total,
                    dataSource:res.list, //表格内容
                    columns //表格标题
                })
        }).catch(()=>{

        }).finally(()=>{
            //避免异步加载数据后，路由跳转导致该组件销毁从而state无法渲染的问题
            //只有组件加载后才能渲染，避免上述错误
            if(this.updater.isMounted(this))
                return this.setState({
                    isLoading:false //表格加载完成
                })
        })
    }
    //当前分页改变
    onPageChange=(page,pageSize)=>{
        console.log(page,pageSize)
        this.setState({
            offset:pageSize*(page-1),
            limited:pageSize
        },()=>{
            this.getData()
        })
    }
    //分页跳转
    onShowSizeChange=(current,size)=>{
        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getData()
        })
    }

    componentDidMount(){
        this.getData()
    }
    //删除行
    onDeleteArticle=(record)=>{
        //如果是删除按钮点击        
        if(this.state.visible===false){
            this.setState({
                title:record.title,
                visible:true
            })
        }else{//如果是对话框确认按钮点击
            this.setState({
                confirmLoading:true,
            }) //加载中
            deleteArticle(record.id).then(res=>{
                this.setState({
                    confirmLoading:false,
                    visible:false
                })
                message.success(res.msg) //弹出全局提示
            }).finally(()=>{
                this.setState({
                    offset:0
                },()=>{
                    this.getData()
                })
            })
        }
    }
    //对话框取消按钮事件
    onHideDeleteModal=()=>{
        this.setState({
            visible:false
        })
    }
    //编辑按钮事件
    toEdit=(record)=>{
        this.props.history.push({
            pathname:`/admin/article/edit/${record.id}`,
            state:record
        })
    }

    render(){
        const {dataSource,columns,total,isLoading,offset,limited,title,visible,confirmLoading}=this.state
        return (
            <Card title="文章列表" bordered={false} extra={<Button>导出Excel</Button>}>
                <Table 
                    dataSource={dataSource} 
                    columns={columns}
                    hideOnSinglePage={true}
                    rowKey={record=>record.id}
                    loading={isLoading}
                    pagination={{
                        onChange:this.onPageChange,
                        showQuickJumper:true,
                        total,
                        onShowSizeChange:this.onShowSizeChange,
                        current:offset/limited+1
                    }}
                />;
                <Modal 
                    title='此操作不可逆，谨慎删除!!!'
                    okText='确定删除'
                    cancelText='取消'
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.onDeleteArticle}
                    onCancel={this.onHideDeleteModal}
                >
                    <Typography>确定删除<span style={{color:'red'}}>{title}</span>吗?</Typography>
                </Modal>
            </Card>
        )
    }
}