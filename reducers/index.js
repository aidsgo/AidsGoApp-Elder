import { combineReducers } from 'redux'
import incidents from './incidents'
import routes from './routes';

const aidsGo = combineReducers({incidents,  routes});

export default aidsGo