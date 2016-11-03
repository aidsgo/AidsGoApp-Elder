import {
    REQUEST_MINE_INCIDENTS, RECEIVE_MINE_INCIDENTS, REQUEST_MINE_INCIDENTS_FAIL
} from '../actions/actionTypes'

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
                items: action.incidents.map(incident => incident.id)
            });
        case REQUEST_MINE_INCIDENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state
    }
};

export default mineIncidents;