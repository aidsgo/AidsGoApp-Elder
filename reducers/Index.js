import {combineReducers} from 'redux'
import user from './UserReducer'
import routes from './Routes';

const aidsGo = combineReducers({user, routes});

export default aidsGo