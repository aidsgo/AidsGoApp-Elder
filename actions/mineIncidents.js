import {
    REQUEST_MINE_INCIDENTS, RECEIVE_MINE_INCIDENTS, REQUEST_MINE_INCIDENTS_FAIL
} from '../actions/ActionTypes'

function requestMineIncidents() {
    return {
        type: REQUEST_MINE_INCIDENTS
    };
}

function receiveMineIncidents(incidents) {
    return {
        type: RECEIVE_MINE_INCIDENTS,
        incidents: incidents
    };
}

function requestMineIncidentsFail(error) {
    return {
        type: REQUEST_MINE_INCIDENTS_FAIL,
        error: error
    };
}

export function fetchMineIncidents(userId) {
    return function (dispatch) {
        dispatch(requestMineIncidents());
        return fetch('http://10.201.132.43:3000/emergency?name=name%201&volunteer_location={%22lat%22:34.256403,%22lng%22:108.953661}')
            .then(response => response.json())
            .then(json => dispatch(receiveMineIncidents(json)))
            .catch(error => dispatch(requestMineIncidentsFail(error)))
    }
}
