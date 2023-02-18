import axios from 'axios'
const SERVER_URL = 'http://localhost:8080';
const MATCHES_REST_API_URL = SERVER_URL + '/findAllMatches';
const MATCHES_DAY_SUMMARY_REST_API_URL = SERVER_URL + '/findAllMatchDaySummary';
const TEAM_STANDING_REST_API_URL = SERVER_URL + '/findTeamStanding';
const MATCHES_CREATE_REST_API_URL = SERVER_URL + '/addMatches';

class MatchService {
    getMatches(){
       return  axios.get(MATCHES_REST_API_URL);
    }
    getMatchesByDivision(division){
        return  axios.get(MATCHES_REST_API_URL+"/"+division);
    }
    createMatches(matches){
        return axios.post(MATCHES_CREATE_REST_API_URL,matches)
    }
    getMatchesDaySummary(){
        return  axios.get(MATCHES_DAY_SUMMARY_REST_API_URL);
    }
    getMatchesDaySummaryByDivision(division){
        return  axios.get(MATCHES_DAY_SUMMARY_REST_API_URL+"/"+division);
    }
    getTeamStanding(){
        return  axios.get(TEAM_STANDING_REST_API_URL);
    }
    getTeamStandingByDivisionAndSchool(division,school){
        return  axios.get(TEAM_STANDING_REST_API_URL+"/"+division+"/"+school);
    }
    getTeamStandingByDivision(division){
        if(division=='All'){
            return  axios.get(TEAM_STANDING_REST_API_URL)
        }
        else{
            return  axios.get(TEAM_STANDING_REST_API_URL+"/"+division);
        }
    }
}

export default new MatchService()