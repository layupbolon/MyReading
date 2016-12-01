import React, { Component } from 'React';
import {
    Image,
    InteractionManager,
    Dimensions,
} from 'react-native';

import MainContainer from '../containers/MainContainer';

let {height, width} = Dimensions.get('window');

class Splash extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Image 
            style={{flex: 1, width: width, height: height}}
            source={require('../img/splash.png')}
            />
        )
    }

    componentDidMount() {
        let {navigator} = this.props;
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: MainContainer,
                    name: 'Main'
                });
            });
        }, 500);
    }
}

export default Splash;