import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from '../actions/types';
import {getValueFromStore, saveToStore, deleteFromStore} from '../../utils/SecureStore';

export const LogoutAction = () =>{

    return (dispatch) => {
      dispatch(LogoutRequest());
      axios
          .post("http://192.168.8.195:5000/auth/logout")
          .then(res => {
              deleteFromStore('token');
              dispatch(LogoutSuccess());
          })
          .catch(err => {
              dispatch(LogoutFailure(err));
          });
    }
}
export const LoginAction = (user) =>{
    return (dispatch) => {
        dispatch(LoginRequest());
        axios
            .post("http://192.168.8.195:5000/auth/login",user)
            .then(res => {
                saveToStore('token',res.data.Authorization);
                axios.defaults.headers.common['Authorization'] = res.data.Authorization;
                dispatch(LoginSuccess(res.data));
            })
            .catch(err => {
                dispatch(LoginFailure(err));
            });
    }
}

export const RegisterAction = (user) =>{
    return (dispatch) => {
        dispatch(RegisterRequest());
        axios
            .post("http://192.168.8.195:5000/user/",user)
            .then(res => {
                //SecureStore.setItemAsync('access_token',res.data.accessToken);
                //SecureStore.setItemAsync('refresh_token',res.data.refreshToken);
                dispatch(RegisterSuccess(res.data));
            })
            .catch(err => {
                dispatch(RegisterFailure(err));
            });
    }
}

export const LoginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const LoginSuccess = tokens => {
  return {
    type: LOGIN_SUCCESS,
    payload: tokens
  }
}

export const LoginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

export const LogoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
}
export const LogoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
}
export const LogoutFailure = error => {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

export const RegisterRequest = () => {
  return {
    type: REGISTER_REQUEST
  }
}
export const RegisterSuccess = (response) => {
  return {
    type: REGISTER_SUCCESS,
    payload: response
  }
}
export const RegisterFailure = error => {
  return {
    type: REGISTER_FAILURE,
    payload: error
  }
}
