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
        this.state = {currentTab: 'onGoing'};
    }

    onSwitchTab(tab) {
        this.setState({currentTab: tab});
    }

    componentDidMount() {
        this.props.fetchOngoingIncidents();
        this.props.fetchMineIncidents(this.props.user.id);
    }

    visibleIncidents() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (this.state.currentTab == "mine") {
            return ds.cloneWithRows(this.props.mineIncidents);
        } else if (this.state.currentTab == "onGoing") {
            return ds.cloneWithRows(this.props.onGoingIncidents);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tabRow}>
                    <TouchableOpacity
                        style={[styles.tab, styles.firstTab, this.state.currentTab=='onGoing'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('onGoing')}}>
                        <Text style={styles.tabText}>On going</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, styles.lastTab, this.state.currentTab=='mine'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('mine')}}>
                        <Text style={styles.tabText}>Mine</Text>
                    </TouchableOpacity>
                </View>
                <ListView style={styles.list}
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
        paddingBottom: 10,
        backgroundColor: '#EE8280'
    },
    tab: {
        width: 100,
        height: 32,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstTab: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    lastTab: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 0
    },
    currentTab: {
        backgroundColor: '#F8CCCB'
    },
    tabText: {
        color: '#333f48',
        fontSize: 14
    },
    list: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        backgroundColor: "#F0F0F1"
    }
});

module.exports = IncidentList;