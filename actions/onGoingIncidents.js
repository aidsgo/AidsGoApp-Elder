import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL
} from '../actions/ActionTypes'

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
        return fetch('http://10.201.132.43:3000/emergency?name=name%201&volunteer_location={%22lat%22:34.256403,%22lng%22:108.953661}')
            .then(response => response.json())
            .then(json => dispatch(receiveOnGoingIncidents(json)))
            .catch(error => dispatch(requestOnGoingIncidentsFail(error)))
    }
}
