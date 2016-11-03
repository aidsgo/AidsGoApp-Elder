import {
    REQUEST_MINE_INCIDENTS, RECEIVE_MINE_INCIDENTS, REQUEST_MINE_INCIDENTS_FAIL
} from '../actions/actionTypes'

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

export function fetchMineIncidents() {
    return function (dispatch) {
        dispatch(requestMineIncidents());
        return fetch('url')
            .then(response => response.json())
            .then(json => dispatch(receiveMineIncidents(json)))
            .catch(error => dispatch(requestMineIncidentsFail(error)))
    }
}
