import {
    RECEIVE_ONGOING_INCIDENTS, RECEIVE_MINE_INCIDENTS, ACCEPT_INCIDENT_SUCCESS, RESOLVE_INCIDENT_SUCCESS, UPLOAD_IMAGE
} from '../actions/ActionTypes'

const incidents = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ONGOING_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case RECEIVE_MINE_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case ACCEPT_INCIDENT_SUCCESS:
            const incident = state[action.incidentId];
            const newIncident = Object.assign({}, incident, {taken: [...incident.taken, action.userId]});
            return Object.assign({}, state, {[action.incidentId]: newIncident});
        case RESOLVE_INCIDENT_SUCCESS:
            return Object.assign({}, state, {[action.incident.id]: action.incident});
        case UPLOAD_IMAGE:
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    images: [...incident.images, action.image]
                })
            });
        default:
            return state
    }
};

export default incidents;