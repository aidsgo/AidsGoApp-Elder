import React, {Component} from 'react';
import {AppRegistry,AlertIOS} from 'react-native';
import App from './App';
import JPush , {JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush'

class AidsGo extends Component {

    componentDidMount() {
        JPush.requestPermissions()
        this.pushlisteners = [
            JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
            JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
        ]
    }

    componentWillUnmount() {
        this.pushlisteners.forEach(listener=> {
            JPush.removeEventListener(listener);
        });
    }


    onReceiveMessage(message) {
        console.log(message.body);
        AlertIOS.alert(
            'Push Notification Received',
            'Alert message: ' + message.content,
            [{
                text: 'Dismiss',
                onPress: null
            }]
        );
    }

    onOpenMessage(message) {
    }



    render() {
        return (
            <App></App>
        );
    }
}

AppRegistry.registerComponent('AidsGo', () => AidsGo);


