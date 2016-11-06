import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';

import Communications from 'react-native-communications';
import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

class IncidentDetails extends Component {
    constructor(props) {
        super(props);
    }

    isTakenByMe(incident, userId) {
        return !!incident.taken.find(volunteerId => volunteerId === userId)
    }

    isResolved(incident) {
        return incident.resolved;
    }

    renderButtons() {
        if (this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (<View style={{alignItems: 'center'}}><TouchableOpacity style={styles.resolveBtn}
                                                                           onPress={() => {this.props.onIncidentResolve(this.props.incident.id, this.props.user.id); Actions.pop()}}>
                <Text style={styles.btnText}>Resolve</Text>
            </TouchableOpacity></View>)
        } else if (!this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (<View style={styles.row}>
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onIncidentAccept(this.props.incident.id, this.props.user.id); Actions.pop()}}>
                    <Text style={styles.btnText}>Volunteer</Text>
                </TouchableOpacity>
            </View>)
        }
    };

    uploadImage() {
        var options = {title: 'Select an image'};
        var onImageUpload = this.props.onImageUpload.bind(this);
        ImagePicker.showImagePicker(options, (response)=> {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                var source;
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    source = {uri: response.uri, isStatic: true};
                }
                onImageUpload(this.props.incident.id, source);
            }
        });
    }

    image() {
        return (
            <View style={styles.images}>
                {
                    this.props.incident.images.map((image) => {
                    return <Image source={image} style={styles.image}/>
                })
                }
            </View>
        );
    }

    showUploadButton() {
        if (this.props.incident.taken && !this.props.incident.resolved) {
            return (
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={this.uploadImage.bind(this)}>
                        <Icon style={{color: 'white'}} name={'ios-camera'} size={25}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showImage() {
        if (this.props.incident.taken) {
            return (
                <View>
                    {this.image()}
                    {this.showUploadButton()}
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.details_container}>
                    <View style={styles.row}>
                        <Text style={[styles.label]}>Name : </Text>
                        <Text style={styles.subTitle}> {this.props.incident.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={[styles.label]}>Location: </Text>
                        <Text style={styles.subTitle}> {this.props.incident.distance} meters away from you</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label]}>Time: </Text>
                        <Text style={styles.subTitle}> {this.props.incident.time}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency Call: </Text>
                        <TouchableOpacity
                            onPress={() => Communications.phonecall(this.props.incident.emergency_call, true)}>
                            <Text style={[styles.subTitle, styles.phone]}>{this.props.incident.emergency_call}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Property Management Company: </Text>
                        <TouchableOpacity
                            onPress={() => Communications.phonecall(this.props.incident.property_management_company_phone, true)}>
                            <Text
                                style={[styles.subTitle, styles.phone]}>{this.props.incident.property_management_company_phone}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true}
                         initialRegion={{
                                            latitude: this.props.incident.location.lat,
                                            longitude: this.props.incident.location.lng,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05}}>
                    <MapView.Marker
                        coordinate={{latitude: this.props.incident.location.lat, longitude: this.props.incident.location.lng}}/>
                </MapView>
                {this.renderButtons()}
            </ScrollView>

        );
    }
}

let deviceWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 64,
        paddingLeft: 10,
        paddingRight: 10,
    },
    details_container: {
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
        paddingBottom: 20

    },
    map: {
        height: 200,
        margin: 10,
    },
    phone: {
        color: '#c9232d'
    },
    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        // flex: 1,
        width: deviceWidth / 3,
        height: deviceWidth / 3,
        borderWidth: 1,
        borderColor: 'white',
        resizeMode: "cover"
    },
    title: {
        color: 'black',
        fontSize: 16,
        lineHeight: 25,
        marginTop: 30,
    },
    subTitle: {
        fontSize: 16,
        lineHeight: 25,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 25,
    },
    row: {
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3,
    },
    uploadBtn: {
        flex: 1,
        backgroundColor: '#8ECCD8',
        height: 45,
        width: 60,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        backgroundColor: '#4DB623',
        height: 40,
        width: 100,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    resolveBtn: {
        flex: 1,
        backgroundColor: '#4DB623',
        width: deviceWidth,
        height: 40,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = IncidentDetails;