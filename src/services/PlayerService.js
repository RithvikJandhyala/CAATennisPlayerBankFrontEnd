import axios from 'axios'
const SERVER_URL = 'http://localhost:8080';
const PLAYERS_REST_API_URL = SERVER_URL + '/findAllPlayers';
const PLAYERS_BY_SCHOOL_REST_API_URL = SERVER_URL + '/findPlayersBySchool';
const PLAYERS_BY_SCHOOL_DIVISION_PLAYERTYPE_REST_API_URL = SERVER_URL + '/findPlayersBySchoolAndDivisionAndPlayerType';
const PLAYER_CREATE_REST_API_URL = SERVER_URL + '/addPlayer';


class PlayerService {
    getPlayers(){
       return  axios.get(PLAYERS_REST_API_URL);
    }
    getPlayersBySchool(school){
        var url = PLAYERS_BY_SCHOOL_REST_API_URL+"/"+school;
        return axios.get(url)
       
    }    
    getPlayersBySchoolAndDivisionAndPlayerType(school,division,playerType){
        var url = PLAYERS_BY_SCHOOL_DIVISION_PLAYERTYPE_REST_API_URL+"/"+school+"/"+division+"/"+playerType;
        return axios.get(url)
       
    }    
    createPlayer(player){
        return axios.post(PLAYER_CREATE_REST_API_URL,player)
    }

}

export default new PlayerService()