import React, { Component } from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    View
} from 'react-native';

import Splash from '../pages/Splash';

class App extends Component {

    renderScene(route, navigator) {
        let Component = route.component;
        return (
            <Component navigator={navigator} route={route} />
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromRight;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#3e9ce9" barStyle="light-content" />
                <Navigator
                    ref='navigator'
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
                        component: Splash,
                        name: 'Splash'
                    }}
                />
            </View>
        );
    }
}

export default App;