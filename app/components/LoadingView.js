'use strict';

import React from 'react';
import {
	ActivityIndicator,
	Text,
	StyleSheet,
	View
} from 'react-native';

class LoadingView extends React.Component {
	render() {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size='large' />
				<Text style={styles.loadingText}>数据加载中...</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',		
	},
	loadingText: {
		marginTop: 10,
		textAlign: 'center'
	}
});

export default LoadingView;