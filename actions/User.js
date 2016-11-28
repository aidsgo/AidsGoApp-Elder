import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION} from '../actions/ActionTypes';

function enterSuccess(userInfo) {
    return {
        type: ENTER_SUCCESS,
        userInfo: userInfo
    };
}

function enterFailure() {
    return {
        type: ENTER_FAILURE
    };
}

export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        location: location
    }
};

export const userEnter = (action, phoneNumber, password, serialNumber, address) => {
    const fetchURL = (action === 'logIn') ? 'http://localhost:3000/elders/login' : 'http://localhost:3000/elders/sign_up';
    const body = JSON.stringify(
        {
            "phone_number": phoneNumber,
            "password": password,
            "serial_number": serialNumber,
            "address": address
        }
    );
    const config = ({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body
    });

    return function (dispatch) {
        return fetch(fetchURL, config)
            .then(checkStatus).then(parseJson, redirect)
            .then(json => dispatch(enterSuccess(json)))
            .catch(error => dispatch(enterFailure(error)));
    }
};

const checkStatus = (response) => {
    const status = response.status;
    if(status < 200 || status >= 300) {
        const error = new Error(status);
        error.response = response;

        throw error;
    }

    return response;
};

const parseJson = (response) => {
    return response.json();
};

const redirect = (error) => {
    throw error;
};