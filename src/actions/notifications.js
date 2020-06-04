import actionTypes from './actionTypes'
import { getNotifications } from "../requests";

//标记为已读
export const markNotificationAsReadById=(id)=>{
    return dispatch=>{
        dispatch(markStartNotificationsAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                id
            })
            dispatch(markFinishNotificationsAsRead())
        },2000)
    }
}

//全部标记为已读
export const markAllNotificationsAsRead=()=>{
    return dispatch=>{
        dispatch(markStartNotificationsAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
            })
            dispatch(markFinishNotificationsAsRead())
        },2000)
    }
}

//标记加载开始
export const markStartNotificationsAsRead=()=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.MARK_START_NOTIFICATIONS_AS_READ,
        })
    }
}

//标记加载结束
export const markFinishNotificationsAsRead=()=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.MARK_FINISH_NOTIFICATIONS_AS_READ,
        })
    }
}

//获取通知信息列表
export const getNotificationList=()=>{
    return dispatch=>{
        dispatch(markStartNotificationsAsRead())
        getNotifications().then(res=>{
            dispatch({
                type:actionTypes.RECEIVED_NOTIFICATIONS,
                list:res.list
            })
            dispatch(markFinishNotificationsAsRead())
        })
    }
}

