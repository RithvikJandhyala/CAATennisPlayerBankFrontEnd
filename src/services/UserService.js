import axios from 'axios'
const SERVER_URL = 'http://localhost:8080';
const USER_LOGIN_REST_API_URL = SERVER_URL + '/userlogin';
class UserService {
    
    authenticateUser(user){
        return axios.post(USER_LOGIN_REST_API_URL,user)
    }
}

export default new UserService()