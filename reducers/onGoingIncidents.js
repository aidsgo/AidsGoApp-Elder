import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL
} from '../actions/actionTypes'

const onGoingIncidents = (state = {isFetching: false, items: [], error: null}, action) => {
    switch (action.type) {
        case REQUEST_ONGOING_INCIDENTS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            });
        case RECEIVE_ONGOING_INCIDENTS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                items: action.incidents.map(incident => incident.id)
            });
        case REQUEST_ONGOING_INCIDENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state
    }
};

export default onGoingIncidents;
