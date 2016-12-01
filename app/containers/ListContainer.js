import React, { Component } from 'react';
import {
    View,
    InteractionManager
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { List, ScrollableTabBar } from '../components';
import CATEGORIES from '../constants/Category';
import theme from '../config/theme';
import TabItemSwitcherPage from '../pages/TabItemSwitcherPage';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

const defaultItems = [
    { id: 0, name: "热门", value: true },
    { id: 12, name: "点赞", value: true },
    { id: 9, name: "科技", value: true },
    { id: 2, name: "段子", value: true }
];

class ListContainer extends Component {
    constructor(props) {
        super(props);
        this._handleTabNames = this._handleTabNames.bind(this);
        this.state = {
            items: defaultItems || []
        };
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar pullDownOnPress={this._pullDownCallback.bind(this)} />}
                tabBarBackgroundColor="rgb(22,131,251)"
                tabBarActiveTextColor="white"
                tabBarInactiveTextColor="rgba(255,255,255,0.5)"
                tabBarTextStyle={{ fontSize: theme.scrollView.fontSize }}
                tabBarUnderlineStyle={theme.scrollView.underlineStyle}
                >
                {this.state.items.map((item, i) => {
                    return (
                        <View tabLabel={item.name} key={i}>
                            <List tabTag={item} navigator={this.props.navigator} />
                        </View>
                    );
                })}
            </ScrollableTabView>
        )
    }

    _pullDownCallback() {
        this.props.navigator.push({
            name: "TabItemSwitcherPage",
            component: TabItemSwitcherPage,
            args: { selectedItems: this.state.items }
        });
    }

    componentDidMount() {
        RCTDeviceEventEmitter.addListener('valueChange', this._handleTabNames);
    }

    componentWillUnmount() {
        RCTDeviceEventEmitter.removeListener('valueChange', this._handleTabNames);
    }

    _handleTabNames(items) {
        this.setState({ items: items });
    }
}

export default ListContainer;