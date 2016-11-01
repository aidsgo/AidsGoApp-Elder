import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

class IncidentDescription extends Component {

    getIncidentColor(incident){
        var is_taken = incident.taken;
        var is_resolved = incident.resolved;
        if (is_resolved){
            return {borderLeftColor: '#00beb3'}
        }else if(is_taken){
            return {borderLeftColor: '#ff9a2a'}
        }else{
            return { borderLeftColor: '#c9232d'}
        }

    };

  render() {
    return (
        <TouchableOpacity style={[styles.container, this.getIncidentColor(this.props.incident)]}
                          onPress={() => Actions.incidentDetailsContainer({incident: this.props.incident})}>
          <Text style={styles.title}>{this.props.incident.name} need your help!</Text>
          <Text style={[styles.subTitle, {marginTop: 5}]}>{this.props.incident.distance} meters away from you</Text>
          <Text style={styles.subTitle}>{this.props.incident.time.toLocaleString()}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3',
        borderLeftWidth: 15,
        marginTop: 10,
        padding: 15,
    },
    title: {
        color: 'black',
        fontSize: 16
    },
    subTitle: {
        // color: '#9397A0',
        fontSize: 12,
    }

});

module.exports = IncidentDescription;
