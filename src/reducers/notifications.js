import actionTypes from "../actions/actionTypes";

const initState={
    isLoading:false,
    list:[]
}

export default (state=initState,action)=>{
    switch(action.type){
        case actionTypes.RECEIVED_NOTIFICATIONS:
            return {
                ...state,
                list:action.list
            }
        case actionTypes.MARK_START_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.MARK_FINISH_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                isLoading:false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            let newList=state.list.map(item=>{
                if(item.id===action.id){
                    item.hasRead=true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list:state.list.map(item=>{
                    item.hasRead=true
                    return item
                })
            }
        default:
            return state
    }
}
