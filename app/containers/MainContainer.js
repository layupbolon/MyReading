import React, { Component } from 'React';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import ListContainer from './ListContainer';

const selectedColor = 'rgb(22,131,251)';
const normalColor = '#a9a9a9';

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home"
        }
    }
    
    render() {
        return (
            <TabNavigator
                tabBarStyle={styles.tabbar}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title="首页"
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{ color: selectedColor }}
                    renderIcon={() => <Icon name="md-home" size={22} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name="md-home" size={22} color={selectedColor} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <ListContainer navigator={this.props.navigator}>
                        首页
                    </ListContainer>
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title="发现"
                    selected={this.state.selectedTab === 'compass'}
                    selectedTitleStyle={{ color: selectedColor }}
                    renderIcon={() => <Icon name="md-compass" size={22} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name="md-compass" size={22} color={selectedColor} />}
                    onPress={() => this.setState({ selectedTab: 'compass' })}>
                    <Text>发现</Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title="消息"
                    selected={this.state.selectedTab === 'notification'}
                    selectedTitleStyle={{ color: selectedColor }}
                    renderIcon={() => <Icon name="md-notifications" size={22} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name="md-notifications" size={22} color={selectedColor} />}
                    onPress={() => this.setState({ selectedTab: 'notification' })}>
                    <Text>消息</Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title="我"
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{ color: selectedColor }}
                    renderIcon={() => <Icon name="md-person" size={22} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name="md-person" size={22} color={selectedColor} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    <Text>我</Text>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: 49,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle: {
        padding: 8
    },
    tab: {
        width: 22,
        height: 22
    }
});

export default MainContainer;