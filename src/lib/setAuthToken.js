import axios from 'axios';

const setAuthToken = () =>{
    const token = localStorage.getItem('authToken');
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        axios.defaults.headers.common['Authorization'] = '';
    }
};

export default setAuthToken;