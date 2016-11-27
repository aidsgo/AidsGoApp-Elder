import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import Modal from './Modal';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorModal: false
        };
    }

    handleSOS() {
        const {user, sosInfo, sos} = this.props;
        if(!sosInfo.notify){
                sos(user.profile.id, user.profile.serial_number, user.profile.token)
        } else {
            this.setState({
                errorModal: !this.state.errorModal
            });
        }
    }

    toggleErrorModal() {
        this.setState({
            errorModal: !this.state.errorModal
        });
    }

    errorModal() {
        const config = {content: '求救成功, \n小雷锋正在火速赶来!', toggleErrorModal: () => this.toggleErrorModal()};
        return <Modal config={config}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../public/img/background_2.png')} style={styles.backgroundImage}>
                    <View style={styles.mask}>
                        <View style={styles.header}>
                            <Image source={require('./../public/img/user.png')} style={styles.icon}/>
                        </View>
                        <View style={styles.button}>
                            <View style={[styles.circle, styles.circle1, styles.shadow]}>
                                <View style={[styles.circle, styles.circle2, styles.shadow]}>
                                    <TouchableOpacity style={[styles.circle, styles.circle3, styles.shadow]}
                                                      onPress={() => this.handleSOS()}>
                                        <View style={[styles.circle, styles.circle4, styles.shadow]}></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.tabText}>SOS</Text>
                    </View>
                    {this.state.errorModal ? this.errorModal() : null}
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
        backgroundColor: 'rgba(44,12,62,0.95)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: 70,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        borderBottomWidth: 2
    },
    icon: {
        position: 'absolute',
        top: 30,
        right: 30,
        resizeMode: 'stretch',
        width: 24,
        height: 24
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.3
    },
    button: {
        marginTop: 0,
        top: -120,
        left: -100
    },
    circle: {
        position: 'absolute',
        alignSelf: 'center'
    },
    circle1: {
        width: 220,
        height: 220,
        borderRadius: 220 / 2,
        backgroundColor: '#3C0824'
    },
    circle2: {
        top: 5,
        left: 5,
        width: 210,
        height: 210,
        borderRadius: 210 / 2,
        backgroundColor: '#6C0C32'
    },
    circle3: {
        top: 20,
        left: 20,
        width: 170,
        height: 170,
        borderRadius: 170 / 2,
        backgroundColor: '#A81538'
    },
    circle4: {
        top: 5,
        left: 5,
        width: 160,
        height: 160,
        borderRadius: 160 / 2,
        backgroundColor: 'rgba(232,0,85,0.9)'
    },
    tabText: {
        position: 'absolute',
        alignSelf: 'center',
        top: 520,
        left: 138,
        textAlign: 'center',
        color: 'white',
        fontSize: 60,
        lineHeight: 60
    }
});

export default Button;

