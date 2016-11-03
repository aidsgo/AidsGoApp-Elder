import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL
} from '../actions/actionTypes'


function requestOnGoingIncidents() {
    return {
        type: REQUEST_ONGOING_INCIDENTS
    };
}

function receiveOnGoingIncidents(incidents) {
    return {
        type: RECEIVE_ONGOING_INCIDENTS,
        incidents: incidents
    };
}

function requestOnGoingIncidentsFail(error) {
    return {
        type: REQUEST_ONGOING_INCIDENTS_FAIL,
        error: error
    };
}

export function fetchOnGoingIncidents() {
    return function (dispatch) {
        dispatch(requestOnGoingIncidents());
        return fetch('url')
            .then(response => response.json())
            .then(json => dispatch(receiveOnGoingIncidents(json)))
            .catch(error => dispatch(requestOnGoingIncidentsFail(error)))
    }
}
