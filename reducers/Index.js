import {combineReducers} from 'redux'
import user from './User'
import routes from './Routes';

const aidsGo = combineReducers({user, routes});

export default aidsGo