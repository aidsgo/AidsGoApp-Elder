import {connect} from 'react-redux'
import {updateProfile} from '../actions/User'
import Profile from '../components/Profile'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProfile: (user) => {
            dispatch(updateProfile(user))
        }
    }
};

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ProfileContainer;
