import axios from 'axios';
const setAuthToken = (token) =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }else{
        axios.defaults.headers.common['Authorization'] = '';
    }
};

export default setAuthToken;