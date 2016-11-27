import {ENTER_SUCCESS, ENTER_FAILURE} from '../actions/ActionTypes';

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

export const userEnter = (action, phoneNumber, password, serialNumber) => {
    const fetchURL = (action === 'logIn') ? 'http://localhost:3000/elder/login' : 'http://localhost:3000/elder/sign_up';
    const body = JSON.stringify(
        {
            "phoneNumber": phoneNumber,
            "password": password,
            "serialNumber": serialNumber
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