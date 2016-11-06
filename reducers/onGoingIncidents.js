import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL, RESOLVE_INCIDENT_SUCCESS
} from '../actions/ActionTypes'

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
                items: Object.keys(action.incidents).map(incidentId => Number(incidentId))
            });
        case REQUEST_ONGOING_INCIDENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case RESOLVE_INCIDENT_SUCCESS:
            const index = state.items.indexOf(action.incidentId);
            const newItems = [...state.items];
            if(index >= 0) {
                newItems.splice(index, 1);
            }
            return Object.assign({}, state, {items: newItems});
        default:
            return state
    }
};

export default onGoingIncidents;
