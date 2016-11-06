import {
    REQUEST_MINE_INCIDENTS, RECEIVE_MINE_INCIDENTS, REQUEST_MINE_INCIDENTS_FAIL, ACCEPT_INCIDENT_SUCCESS
} from '../actions/ActionTypes'

const mineIncidents = (state = {isFetching: false, items: [], error: null}, action) => {
    switch (action.type) {
        case REQUEST_MINE_INCIDENTS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            });
        case RECEIVE_MINE_INCIDENTS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                items: Object.keys(action.incidents)
            });
        case REQUEST_MINE_INCIDENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case ACCEPT_INCIDENT_SUCCESS:
            return Object.assign({}, state, {
                items: [...state.items, action.incidentId]
            });
        default:
            return state
    }
};

export default mineIncidents;