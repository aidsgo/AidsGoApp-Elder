import {connect} from 'react-redux'
import {acceptIncident, rejectIncident, resolveIncident} from '../actions'
import IncidentList from '../components/IncidentList'

const mapStateToProps = (state, ownProps) => {
    return {
        incidents: state.incidents
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};

const IncidentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentList);

export default IncidentListContainer
