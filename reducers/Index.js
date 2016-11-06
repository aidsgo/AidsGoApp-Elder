import {combineReducers} from 'redux'
import incidents from './Incidents'
import onGoingIncidents from './OnGoingIncidents'
import mineIncidents from './MineIncidents'
import user from './User'
import routes from './Routes';

const aidsGo = combineReducers({incidents, onGoingIncidents, mineIncidents, user, routes});

export default aidsGo