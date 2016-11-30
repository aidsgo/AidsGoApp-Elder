import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE} from '../actions/ActionTypes';

const user = (state={}, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                location: action.location
            });
        case ENTER_SUCCESS:
            return Object.assign({}, state, {
                signedIn: true,
                profile: action.userInfo
            });
        case ENTER_FAILURE:
            return Object.assign({}, state, {
                signedIn: false
            });
        case UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                profile: action.userInfo
            });
        case UPDATE_PROFILE_FAILURE:
        default:
            return state
    }
};
export default user;