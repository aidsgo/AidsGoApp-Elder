import {combineReducers} from 'redux'
import incidents from './incidents'
import onGoingIncidents from './onGoingIncidents'
import mineIncidents from './mineIncidents'
import routes from './routes';

const aidsGo = combineReducers({incidents, onGoingIncidents, mineIncidents, routes});

export default aidsGo