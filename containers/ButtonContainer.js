import {connect} from 'react-redux'
import {sos} from '../actions/Sos'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        sosInfo: state.sosInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sos: (userId, serialNumber, userToken) => {
            dispatch(sos(userId, serialNumber, userToken))
        }
    }
};

const ButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button);

export default ButtonContainer;
