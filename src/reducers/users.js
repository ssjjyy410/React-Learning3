import actionTypes from '../actions/actionTypes'

//判断是否登陆过
const isLogin=Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo=JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState={
    ...userInfo,
    isLogin,
    isLoading:false
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLoading:false,
                isLogin:true
            }
        case actionTypes.LOGIN_FAILED:
            //必须返回初始值，否则退出登录操作失败
            return {
                id:'',
                displayName:'',
                avatar:'',
                isLogin:false,
                isLoading:false,
                role:'' //用户的权限
            }
        case actionTypes.CHANGE_AVATAR:
            return {
                ...state,
                avatar:action.payload.avatarUrl
            }
        default:
            return state
    }
}
