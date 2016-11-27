import {connect} from 'react-redux'
import {userEnter} from '../actions/User'
import Login from '../components/Login'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userEnter: (action, phoneNumber, password, serialNumber) => {
            dispatch(userEnter(action, phoneNumber, password, serialNumber))
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default UserContainer;
