import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER_StART,
    FOOD_NAME_CHANGED,
    FOOD_PRICE_CHANGED,
    FOOD_IMAGE_CHANGED,
    MENU_LIST_UPDATE_SUCCESS,
    MENU_LIST_UPDATE_FAIL,
    MENU_LIST_UPDATE_START,
    FOOD_INIT
} from './types';
import { FILE_UPLOAD_URL, FILE_DELETE_URL } from '../config';


var wilddog = require('wilddog');

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }).toUpperCase();
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = (email, password, navigation) => (dispatch) => {
    dispatch({ type: LOGIN_USER_StART });
    wilddog.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            loginSuccess(dispatch, wilddog.auth().currentUser, navigation);
        })
        .catch(() => {
            wilddog.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    loginSuccess(dispatch, user, navigation);
                })
                .catch(() => {
                    dispatch({
                        type: LOGIN_USER_FAIL,
                        payload: '用户登录错误!'
                    });
                });
        });
};

const loginSuccess = (dispatch, user, navigation) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
  
    navigation.navigate('MenuList', { title: '用户认证' });
};

export const foodNameChanged = (text) => {
    return {
        type: FOOD_NAME_CHANGED,
        payload: text
    };
};

export const foodPriceChanged = (text) => {
    return {
        type: FOOD_PRICE_CHANGED,
        payload: text
    };
};

export const foodImageChanged = (imageUrl) => {
    return {
      type: FOOD_IMAGE_CHANGED,
      payload: imageUrl
    };
};

export const initFood = (food) => {
    return {
        type: FOOD_INIT,
        payload: food
    };
};

const updateMenuList = (refToMenuList, key, food) => {
    if(key){
        refToMenuList.child(key).update(food);
    }else{
        refToMenuList.push(food);
    }
};

const checkStatus = (response) => {
    if(response.status >= 200 && response.status <= 300){
        return response;
    } else{
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const saveFood = ({key, food, navigation}) => (dispatch) => {
    let userId = wilddog.auth().currentUser.uid;
    let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);
    refToMenuList.on('value', (snapshot) => {
        dispatch({
            type: MENU_LIST_UPDATE_SUCCESS,
            payload: snapshot
        });
        navigation.goBack(); 
    }, (error) => {
        dispatch({
            type: MENU_LIST_UPDATE_FAIL,
            payload: error
        });
    });

    if(food.imageUrl){
        let proptocol = food.imageUrl.split('://')[0];
        if(proptocol !== 'http' && proptocol !== 'https'){
            const file = {
                uri: food.imageUrl,
                name: `${userId}-${uuid()}.jpg`,
                type: 'image/jpg'
            };

            const body = new FormData();
            body.append('file',file);   
            
            fetch(FILE_UPLOAD_URL, {
                method: 'POST',
                body,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                food.imageUrl = response.url;
                updateMenuList(refToMenuList, key, food);
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            updateMenuList(refToMenuList, key, food);
        }
    }else{
        updateMenuList(refToMenuList, key, food);
    }
};

export const deleteFood = (key, food, navigation) => (dispatch) => {
    let userId = wilddog.auth().currentUser.uid;
    let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);
    refToMenuList.on('value', (snapshot) => {
        dispatch({
            type: MENU_LIST_UPDATE_SUCCESS,
            payload: snapshot
        });
        navigation.goBack();
    }, (error) => {
        dispatch({
            type: MENU_LIST_UPDATE_FAIL,
            payload: error
        });
    });

    if(food.imageUrl){
        let proptocol = food.imageUrl.split('://')[0];
        if(proptocol === 'http' || proptocol === 'https'){
            let filename = food.imageUrl.split(/[/]+/).pop();
            fetch(FILE_DELETE_URL + `/${filename}`,{
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            })
            .then(checkStatus)
            .then(() => {
                if(key){
                    refToMenuList.child(key).remove();
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            if(key){
                refToMenuList.child(key).remove();
            }
        }
    }else {
        if(key){
            refToMenuList.child(key).remove();
        }
    }
};

export const fetchMenuList = () => (dispatch) => {
    let userId = wilddog.auth().currentUser.uid;
    let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);
    dispatch({ type: MENU_LIST_UPDATE_START });
    refToMenuList.on('value', (snapshot) => {
        dispatch({
            type: MENU_LIST_UPDATE_SUCCESS,
            payload: snapshot
        }); 
    }, (error) => {
        dispatch({
            type: MENU_LIST_UPDATE_FAIL,
            payload: error
        });
    });
};

