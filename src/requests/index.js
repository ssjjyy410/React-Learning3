import axios from 'axios'

const isDev=process.env.NODE_ENV==='development'

const service=axios.create({
    baseURL:isDev ? 'http://rap2api.taobao.org/app/mock/176929':''
})

const service2=axios.create({
    baseURL:isDev ? 'http://rap2api.taobao.org/app/mock/176929':''
})

service.interceptors.request.use((config)=>{
    config.data=Object.assign({},config.data,{
        // authToken:window.localStorage.getItem('authToken')
        authToken:'Sam'
    })
    return config
})

service.interceptors.response.use((response)=>{
    if(response.data.code===200){
        return response.data.data //axios的数据嵌套了一层data
    }else{
        //全局处理错误
    }
})

//获取文章列表
export const getArticle=(offset=0,limited=10)=>{
    return service.post('/api/v1/articleList',{
        offset,
        limited
    })
}

//通过id删除文章
export const deleteArticle=(id)=>{
    return service.post(`/api/v1/articleDelete/${id}`)
}

//通过id获取单个文章
export const getArticleById=(id)=>{
    return service.post(`/api/v1/article/${id}`)
}

//保存文章
export const saveArticle=(id,data)=>{
    return service.post(`/api/v1/articleEdit/${id}`,data)
}

//获取通知列表
export const getNotifications=()=>{
    return service.post('/api/v1/notifications')
}

//登录(不做拦截处理)
export const loginRequest=(userInfo)=>{
    return service2.post('/api/v1/login',userInfo)
}
