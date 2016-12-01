import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';

import md5 from "react-native-md5";

import Modal from './Modal';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'logIn',
            errorModal: false,
            phoneNumber: '',
            password: '',
            name: '',
            serialNumber: '',
            address: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.signedIn) {
            this.setCurrentLocation();
            Actions.button();
        } else if (!nextProps.user.signedIn) {
            this.toggleErrorModal();
        }
    }

    setCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: JSON.stringify(position.coords.latitude),
                    lng: JSON.stringify(position.coords.longitude)
                };
                this.props.updateLocation(location)
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    toggleAction() {
        this.setState({
            action: this.state.action === 'signUp' ? 'logIn' : 'signUp'
        });
    }

    toggleErrorModal() {
        this.setState({
            errorModal: !this.state.errorModal
        });
    }

    errorModal() {
        const config = {content: '用户名或密码不正确!', toggleErrorModal: () => this.toggleErrorModal()};
        return <Modal config={config}/>
    }

    login() {
        const {action, phoneNumber, password, name, serialNumber, address} = this.state;
        this.props.userEnter(action, phoneNumber, md5.str_md5(password), name, serialNumber, address);
    }

    handleInput(value, type) {
        switch(type){
            case 'phone':
                this.setState({ phoneNumber: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            case 'name':
                this.setState({ name: value });
                break;
            case 'serialNumber':
                this.setState({ serialNumber: value });
                break;
            case 'address':
                this.setState({ address: value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../public/img/background_1.png')} style={styles.backgroundImage}>
                    <View style={styles.mask}>
                        <KeyboardAvoidingView behavior={'position'}>
                            <View style={[styles.circle, styles.shadow]}>
                                <Image style={styles.avatar} source={require('./../public/img/avatar.png')}/>
                            </View>
                            <View style={styles.actionToggle}>
                                <TouchableOpacity style={[styles.leftMask, this.state.action === 'signUp' ? styles.selected : {}]} onPress={() => this.toggleAction()}>
                                    <Text style={styles.actionText}>注   册</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.rightMask, this.state.action === 'logIn' ? styles.selected : {}]} onPress={() => this.toggleAction()}>
                                    <Text style={styles.actionText}>登   录</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.halfMask}>
                                <View style={[styles.loginput, styles.size, styles.shadow, styles.username]}>
                                    <Image source={require('./../public/img/user.png')} style={styles.icon}/>
                                    <View style={styles.upright}/>
                                    <TextInput style={styles.input} placeholder='  电    话' placeholderTextColor='white'
                                               onChangeText={(value) => {this.handleInput(value, 'phone')}}>

                                    </TextInput>
                                </View>
                                <View style={[styles.loginput, styles.size, styles.shadow, styles.password]}>
                                    <Image source={require('./../public/img/lock.png')} style={styles.icon}/>
                                    <View style={styles.upright}/>
                                    <TextInput style={styles.input} placeholder='  密    码' placeholderTextColor='white'
                                               onChangeText={(value) => {this.handleInput(value, 'password')}}>

                                    </TextInput>
                                </View>
                                {this.state.action === 'signUp' ?
                                  <View style={[styles.info, {marginTop: 6}]}>
                                      <View style={[styles.infoInput, {marginTop: 4}]}>
                                          <Text style={styles.saveText}>用   户   名</Text>
                                          <TextInput style={styles.textInput}
                                                     onChangeText={(value) => {this.handleInput(value, 'name')}}>
                                          </TextInput>
                                      </View>
                                      <View style={[styles.infoInput]}>
                                          <Text style={styles.saveText}>序   列   号</Text>
                                          <TextInput style={styles.textInput}
                                                     onChangeText={(value) => {this.handleInput(value, 'serialNumber')}}>
                                          </TextInput>
                                      </View>
                                      <View style={[styles.infoInput]}>
                                          <Text style={styles.saveText}>家 庭 地 址</Text>
                                          <TextInput style={styles.textInput}
                                                     onChangeText={(value) => {this.handleInput(value, 'address')}}>
                                          </TextInput>
                                      </View>
                                  </View> : null
                                }

                                <TouchableOpacity style={[styles.loginput, styles.size, styles.shadow, styles.button, this.state.action === 'signUp'? {marginTop: 6} : {} ]}
                                                  onPress={() => this.login()}>
                                    <Text style={styles.loginText}>{this.state.action === 'logIn' ? '登      录' : '注      册'}</Text>
                                </TouchableOpacity>
                                {this.state.action === 'logIn' ? <View style={styles.forget}>
                                    <Text style={styles.tabText}>忘记密码?</Text>
                                </View> : null}
                            </View>
                            {this.state.errorModal ? this.errorModal() : null}
                        </KeyboardAvoidingView>
                    </View>
                </Image>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {},
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height
    },
    mask: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    halfMask: {
        width: width,
        height: height/2,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    actionToggle: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        marginTop: 40,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 0.5
    },
    leftMask: {
        width: width/2,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    rightMask: {
        width: width/2,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    selected: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    actionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        paddingTop: 6
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.3
    },
    circle: {
        alignSelf: 'center',
        marginTop: height / 5,
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    size: {
        width: width / 1.5,
        height: 40
    },
    loginput: {
        alignSelf: 'center',
        width: width / 1.5,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    info: {
        alignSelf: 'center',
        width: width / 1.5,
        height: height/6.5,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    infoInput: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        position: 'relative',
        height: 30
    },
    saveText: {
        marginTop: 8,
        marginLeft: 20,
        color: 'white'
    },
    textInput: {
        position: 'absolute',
        right: 12,
        width: width / 2.6,
        height: 25,
        marginTop: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: '#53585F'
    },
    username: {
        marginTop: height / 16
    },
    password: {
        marginTop: 6
    },
    icon: {
        position: 'absolute',
        top: 8,
        left: 10,
        resizeMode: 'stretch',
        width: 24,
        height: 24
    },
    upright: {
        position: 'absolute',
        top: 8,
        left: 40,
        width: 2,
        height: 24,
        borderLeftColor: 'white',
        borderLeftWidth: 1
    },
    input: {
        position: 'absolute',
        right: 12,
        width: width / 2,
        height: 30,
        marginTop: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: '#53585F'
    },
    button: {
        marginTop: 24,
        backgroundColor: '#DF647A'
    },
    forget: {
        width: width / 3,
        height: 40,
        alignSelf: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    loginText: {
        alignSelf: 'center',
        width: width / 3,
        height: 40,
        textAlign: 'center',
        color: 'white',
        lineHeight: 32,
        fontSize: 20
    },
    tabText: {
        textAlign: 'center',
        color: 'white',
        lineHeight: 34
    },
    placeholderTextColor: {
        color: 'white'
    }
});

export default Login;

