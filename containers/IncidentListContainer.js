import {connect} from 'react-redux'
import {fetchMineIncidents} from '../actions/mineIncidents'
import {fetchOnGoingIncidents} from '../actions/onGoingIncidents'
import IncidentList from '../components/IncidentList'

const mapStateToProps = (state, ownProps) => {
    return {
        incidents: state.incidents
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchOngoingIncidents: () => {
            dispatch(fetchOnGoingIncidents())
        },
        fetchMineIncidents: () => {
            dispatch(fetchMineIncidents())
        }
    }
};

const IncidentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentList);

export default IncidentListContainer
