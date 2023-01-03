import axios from 'axios'

const MATCHES_REST_API_URL ='http://localhost:8080/findAllMatches';
const MATCHES_DAY_SUMMARY_REST_API_URL ='http://localhost:8080/findAllMatchDaySummary';
const TEAM_STANDING_REST_API_URL ='http://localhost:8080/findTeamStanding';
const MATCHES_CREATE_REST_API_URL ='http://localhost:8080/addMatches';

class MatchService {
    getMatches(){
       return  axios.get(MATCHES_REST_API_URL);
    }
    createMatches(matches){
        return axios.post(MATCHES_CREATE_REST_API_URL,matches)
    }
    getMatchesDaySummary(){
        return  axios.get(MATCHES_DAY_SUMMARY_REST_API_URL);
    }

    getTeamStanding(){
        return  axios.get(TEAM_STANDING_REST_API_URL);
    }
}

export default new MatchService()