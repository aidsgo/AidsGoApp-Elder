import {
    RECEIVE_ONGOING_INCIDENTS, RECEIVE_MINE_INCIDENTS, ACCEPT_INCIDENT, RESOLVE_INCIDENT, UPLOAD_IMAGE
} from '../actions/actionTypes'

const incidents = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ONGOING_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case RECEIVE_MINE_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case ACCEPT_INCIDENT:
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    taken: true
                })
            });
        case 'REJECT_INCIDENT':
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    rejected: true
                })
            });
        case RESOLVE_INCIDENT:
            return state.map(incident => {
                if (incident.id !== action.id) {
                    return incident;
                }
                return Object.assign({}, incident, {
                    resolved: true
                })
            });
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