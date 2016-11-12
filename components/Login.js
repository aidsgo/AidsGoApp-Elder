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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../public/img/background_1.png')} style={styles.backgroundImage} >
                    <View style={styles.mask} >
                        <View style={[styles.circle, styles.shadow]}/>
                        <View style={[styles.loginput, styles.size, styles.shadow, styles.username]}>
                            <Image source={require('./../public/img/avatar.png')} style={styles.icon} />
                            <View style={styles.upright}/>
                            <TextInput style={styles.input} placeholder='  电    话' placeholderTextColor='white'></TextInput>
                        </View>
                        <View style={[styles.loginput, styles.size, styles.shadow, styles.password]}>
                            <Image source={require('./../public/img/lock.png')} style={styles.icon} />
                            <View style={styles.upright}/>
                            <TextInput style={styles.input} placeholder='  密    码' placeholderTextColor='white'></TextInput>
                        </View>
                        <TouchableOpacity style={[styles.loginput, styles.size, styles.shadow, styles.button]} >
                            <Text style={styles.loginText}>登     录</Text>
                        </TouchableOpacity>
                        <View style={styles.forget} >
                            <Text style={styles.tabText}>忘记密码?</Text>
                        </View>
                    </View>
                </Image>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    mask: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.2)'
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
        marginTop: height/5,
        width: 130,
        height: 130,
        borderRadius: 130/2,
        backgroundColor: 'white'
    },
    size: {
        width: width/1.5,
        height: 40
    },
    loginput: {
        alignSelf: 'center',
        width: width/1.5,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    username: {
        marginTop: height/6
    },
    password: {
        marginTop: 10
    },
    icon: {
        position: 'absolute',
        top: 8,
        left: 10,
        resizeMode :'stretch',
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
        width: width/2,
        height: 30,
        marginTop: 5,
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#DF647A'
    },
    forget: {
        width: width/3,
        height: 40,
        alignSelf: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1

    },
    loginText: {
        alignSelf: 'center',
        width: width/3,
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

