import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from './components/Logo';
import UserContainer from './containers/UserContainer';
import ButtonContainer from './containers/ButtonContainer';

const RouterWithRedux = connect()(Router);
import reducers from './reducers/Index';
const middleware = [thunkMiddleware];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);

class App extends Component {
    render() {
        return (
            <Provider store={store} showNavigationBar={false}>
                <RouterWithRedux >
                    <Scene key="root" hideNavBar>
                        <Scene key="logo" component={Logo} initial={true}/>
                        <Scene key="aigsGoLogin" component={UserContainer} />
                        <Scene key="button" component={ButtonContainer} />
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;