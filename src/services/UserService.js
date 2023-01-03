import axios from 'axios'

const USER_LOGIN_REST_API_URL ='http://localhost:8080/userlogin';
class UserService {
    
    authenticateUser(user){
        return axios.post(USER_LOGIN_REST_API_URL,user)
    }
}

export default new UserService()