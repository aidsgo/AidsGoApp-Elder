import React, {Component} from 'react';
import {AppRegistry,PushNotificationIOS,AlertIOS} from 'react-native';

import App from './App';
import AV  from 'leancloud-storage';
import LeancloudInstallation from 'leancloud-installation'
AV.init('1BhFGoQ6zEcNNE30PmCR9U8q-gzGzoHsz', 'aa5tB6e9pgou4YKWkIMMsahv');
var Installation = LeancloudInstallation(AV);
console.log(AV);
console.log(Installation.getCurrent());
console.log(PushNotificationIOS);

var logs = [];
var startTime = Date.now();


class AidsGo extends Component {

    componentDidMount() {
        console.log('Subscribe to register event of PushNotificationIOS.');
        PushNotificationIOS.addEventListener('register', this._onRegister);
        console.log('PushNotificationIOS.requestPermissions()');
        PushNotificationIOS.addEventListener('notification',this._onNotification);
        PushNotificationIOS.requestPermissions();
    }

    componentWillUnmount() {
        PushNotificationIOS.removeEventListener('register', this._onRegister);
        PushNotificationIOS.removeEventListener('notification',this._onNotification);

    }

    log(text) {
        text = '[' + (Date.now() - startTime) + 'ms] ' + text;
        logs.push(text);
        this.setState({logs});
        console.log(text);
    }

    _onRegister(deviceToken) {
        console.log('_onRegistered called with deviceToken: ' + deviceToken);
        Installation.getCurrent()
            .then(installation => {
                console.log('Current installaton got: ' + JSON.stringify(installation.toJSON()));
                console.log('Set new deviceToken and save.');
                return installation.save({
                    deviceToken: deviceToken
                });
            })
            .then(installation => {
                console.log('Installation updated: ' + JSON.stringify(installation.toJSON()));
                PushNotificationIOS.presentLocalNotification({
                    alertBody: 'Installation updated.'
                });
            })
            .catch(error => {});
    }

    _onNotification(notification) {
        AlertIOS.alert(
            'Push Notification Received',
            'Alert message: ' + notification.getMessage(),
            [{
                text: 'Dismiss',
                onPress: null
            }]
        );
    }


    render() {
        return (
            <App></App>
        );
    }
}

AppRegistry.registerComponent('AidsGo', () => AidsGo);
