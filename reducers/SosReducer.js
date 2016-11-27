import {NOTIFY_SUCCESS, NOTIFY_FAILURE} from '../actions/ActionTypes';

const sosInfo = (state={}, action) => {
    switch (action.type) {
        case NOTIFY_SUCCESS:
            return Object.assign({}, state, {
                notify: true
            });
        case NOTIFY_FAILURE:
            return Object.assign({}, state, {
                notify: false
            });
        default:
            return state
    }
};
export default sosInfo;