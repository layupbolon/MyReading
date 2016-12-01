import React,{Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import App from './containers/app';
import configureStore from './store/config-store';
const store = configureStore();

class Root extends Component {
	render() {

		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

export default Root;
