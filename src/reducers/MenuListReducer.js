import { 
    MENU_LIST_UPDATE_SUCCESS, 
    MENU_LIST_UPDATE_FAIL,
    MENU_LIST_UPDATE_START
} from '../actions/types';

const INITAIL_STATE = {loading: false, data: []};

const dataFromAction = (action) => {
    let data = [];
    action.payload.forEach((childSnapshot)=>{
        data.push({
            key: childSnapshot.key(),
            food: childSnapshot.val()
        });
    });
    return data;
};

export default (state = INITAIL_STATE, action) => {
    switch(action.type) {
        case MENU_LIST_UPDATE_SUCCESS:
            return {...state, loading: false, data: dataFromAction(action)};
        case MENU_LIST_UPDATE_FAIL:
            return {...state, loading: false};
        case MENU_LIST_UPDATE_START:
            return {...state, loading: true};
        default:
            return state;
    }
};