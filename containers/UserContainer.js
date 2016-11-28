import {connect} from 'react-redux'
import {userEnter, updateLocation} from '../actions/User'
import Login from '../components/Login'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userEnter: (action, phoneNumber, password, serialNumber, address) => {
            dispatch(userEnter(action, phoneNumber, password, serialNumber, address))
        },
        updateLocation: (location) => {
            dispatch(updateLocation(location))
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default UserContainer;
