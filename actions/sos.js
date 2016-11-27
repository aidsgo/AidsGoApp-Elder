import {NOTIFY_SUCCESS, NOTIFY_FAILURE} from './ActionTypes';

function notifySuccess() {
    return {
        type: NOTIFY_SUCCESS
    };
}

function notifyFailure() {
    return {
        type: NOTIFY_FAILURE
    };
}

export const sos = (userId, serialNumber, userToken) => {
    const fetchURL = 'http://localhost:3000/emergency';
    const body = JSON.stringify(
        {
            "elder_id": userId,
            "serial_number": serialNumber
        }
    );
    const config = ({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        credentials: 'same-origin',
        body
    });

    return function (dispatch) {
        return fetch(fetchURL, config)
            .then(checkStatus).then(parseJson, redirect)
            .then(json => dispatch(notifySuccess(json)))
            .catch(error => dispatch(notifyFailure(error)));
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