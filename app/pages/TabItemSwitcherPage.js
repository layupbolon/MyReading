'use strict';

import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Platform, PixelRatio, Switch, BackAndroid, ToastAndroid } from 'react-native';
import theme from '../config/theme';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../components/SimpleNavigationBar';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import { GridView, Button } from '../components';
import MainContainer from '../containers/MainContainer';

export default class TabItemSwitcherPage extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this._handleBack.bind(this);
        this.renderItem = this._renderItem.bind(this);
        this.onPress = this.onPress.bind(this);
        this.state = {
            dataArray: [
                { id: 1, name: "推荐", value: false },
                { id: 2, name: "段子", value: false },
                { id: 3, name: "养生", value: false },
                { id: 4, name: "私房", value: false },
                { id: 5, name: "八卦", value: false },
                { id: 6, name: "生活", value: false },
                { id: 7, name: "财经", value: false },
                { id: 8, name: "汽车", value: false },
                { id: 9, name: "科技", value: false },
                { id: 10, name: "潮人", value: false },
                { id: 11, name: "辣妈", value: false },
                { id: 12, name: "点赞", value: false },
                { id: 13, name: "旅行", value: false },
                { id: 14, name: "职场", value: false },
                { id: 15, name: "美食", value: false },
                { id: 16, name: "古今", value: false },
                { id: 17, name: "学霸", value: false },
                { id: 18, name: "星座", value: false },
                { id: 19, name: "体育", value: false }
            ],
            selectedItems: props.route.args.selectedItems || []
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar title="我感兴趣的" backOnPress={this.handleBack} />
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f2f2f2' }}>
                    <GridView
                        items={Array.from(this.state.dataArray)}
                        itemsPerRow={4}
                        renderItem={this.renderItem}
                        />
                </View>
            </View>
        );
    }

    _renderItem(item) {
        let isSelect = Array.from(this.state.selectedItems).map((item) => { return item.id }).indexOf(parseInt(item.id)) !== -1;
        return (
            <Button
                key={item.id}
                containerStyle={[{ margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#dddddd' }, isSelect ? { backgroundColor: '#3e9ce9' } : { backgroundColor: '#fcfcfc' }]}
                style={[{ fontSize: 16, textAlign: 'center' }, isSelect ? { color: '#fcfcfc' } : { color: 'black' }]}
                text={item.name}
                onPress={this.onPress.bind(this, item)}
                />
        );
    }

    onPress(item) {
        let lastState = Array.from(this.state.selectedItems);
        let lastStateIds = lastState.map((i) => { return i.id });

        let pos = lastStateIds.indexOf(item.id);
        if (pos === -1) {
            lastState.push(item);
        } else {
            lastState.splice(pos, 1);
        }
        
        this.setState({
            selectedItems: lastState
        });
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.
    // }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
    }

    _handleBack() {
        let items = [];
        for (let i in this.state.selectedItems) {
            items.push(this.state.selectedItems[i]);
        }
        RCTDeviceEventEmitter.emit('valueChange', items);

        // const navigator = this.props.navigator;
        // navigator.resetTo({
        //     component: MainContainer,
        //     name: 'Main'
        // });
        // return true;

        //back to the last page
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }
}

class Item extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        isSwitchOn: PropTypes.bool,
        callbackParent: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isSwitchOn: this.props.isSwitchOn
        };
    }

    render() {
        return (
            <View style={styles.item}>
                <Icon name="ios-menu" size={px2dp(25)} color="#ccc" />
                <Text style={{ fontSize: theme.actionBar.fontSize, color: '#000', marginLeft: px2dp(20) }}>{this.props.name}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Switch
                        onValueChange={this._onValueChange.bind(this)}
                        value={this.state.isSwitchOn}
                        />
                </View>
            </View>
        );
    }

    _onValueChange(value) {
        this.setState({
            isSwitchOn: value
        });
        this.props.callbackParent(this.props.id, this.state.isSwitchOn);
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        height: px2dp(49),
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});