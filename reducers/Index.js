import {combineReducers} from 'redux'
import user from './UserReducer'
import sosInfo from './SosReducer'
import routes from './Routes';

const aidsGo = combineReducers({user, sosInfo, routes});

export default aidsGo