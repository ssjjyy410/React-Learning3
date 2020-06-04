import actionTypes from './actionTypes'
import {loginRequest} from '../requests'

//更改头像
export const changeAvatar=(avatarUrl)=>{
    return {
        type:actionTypes.CHANGE_AVATAR,
        payload:{
            avatarUrl
        }
    }
}

//开始登录
const startLogin=()=>{
    return {
        type:actionTypes.START_LOGIN
    }
}

//登陆成功
const loginSuccess=(userInfo)=>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}

//登录失败
const loginFailed=()=>{
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return {
        type:actionTypes.LOGIN_FAILED
    }
}

//退出登录
export const logout=()=>{
    return dispatch=>{
        dispatch(loginFailed())
    }
}

//登录
export const login=(userInfo)=>{
    return dispatch=>{
        dispatch(startLogin())
        loginRequest(userInfo).then((res)=>{
            if(res.data.code===200){
                const {
                    authToken,
                    ...userInfos
                }=res.data.data
                if(userInfo.remember){
                    //存储用户信息到本地
                    window.localStorage.setItem('authToken',authToken)
                    window.localStorage.setItem('userInfo',JSON.stringify(userInfos))
                }else{
                    //存储用户信息到会话
                    window.sessionStorage.setItem('authToken',authToken)
                    window.sessionStorage.setItem('userInfo',JSON.stringify(userInfos))
                }
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(loginFailed())
            }
        })
    }
}
