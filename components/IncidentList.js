import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';

import IncidentDescription from './IncidentDescription'

class IncidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {currentTab: 'all'};
    }

    onSwitchTab(tab) {
        this.setState({currentTab: tab});
    }

    visibleIncidents() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        if (this.state.currentTab == "mine") {
            var filteredIncidents = this.props.incidents.filter((incident) => {
                return incident.taken && !incident.rejected;
            });
            return ds.cloneWithRows(filteredIncidents);
        } else if (this.state.currentTab == "all") {
            var filteredIncidents = this.props.incidents.filter((incident) => {
                return !incident.rejected;
            });
            return ds.cloneWithRows(filteredIncidents);
        }
    }

    onImageUpload(incidentId, image) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state.data.forEach((incident, index) => {
            if (incident.id == incidentId) {
                var images = this.state.data[index].images;
                images.push(image);
                this.state.data[index]['images'] = images
            }
        });
        let data = this.state.data;

        this.setState({
            data,
            dataSource: ds.cloneWithRows(data)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[styles.tab, styles.firstTab, this.state.currentTab=='all'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('all')}}>
                        <Text style={styles.tabText}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, styles.lastTab, this.state.currentTab=='mine'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('mine')}}>
                        <Text style={styles.tabText}>Mine</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.visibleIncidents()}
                    renderRow={(incident) => <IncidentDescription incident={incident} onImageUpload={this.onImageUpload.bind(this)} ></IncidentDescription>}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 64,

    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    tab: {
        width: 100,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstTab: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    },
    lastTab: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderLeftWidth: 0
    },
    currentTab: {
        backgroundColor: '#c8c9c7'
    },
    tabText: {
        color: '#333f48',
        fontSize: 12
    }
});

module.exports = IncidentList;


[1, 2, 3].filter(function (item) {
    return item == 1;
})