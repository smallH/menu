import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_StART } from '../actions/types';

const INITAL_STATE = {
    email: '1@qq.com',
    password: '123456',
    user: null,
    error: '',
    loading: false
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case LOGIN_USER_StART:
            return {...state, loading: true, user: null, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITAL_STATE, user: action.payload};
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
};