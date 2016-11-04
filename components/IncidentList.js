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

    componentDidMount() {
        this.props.fetchOngoingIncidents();
        this.props.fetchMineIncidents();
    }

    visibleIncidents() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (this.state.currentTab == "mine") {
            return ds.cloneWithRows(this.props.mineIncidents);
        } else if (this.state.currentTab == "all") {
            return ds.cloneWithRows(this.props.onGoingIncidents);
        }
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
                    renderRow={(incident) => <IncidentDescription incident={incident} ></IncidentDescription>}
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