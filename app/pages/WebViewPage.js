'use strict';

import React from 'react';
import {
  StyleSheet,
  WebView,
  BackAndroid,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';

import NavigationBar from '../components/SimpleNavigationBar';
import { ToastShort } from '../utils/ToastUtils';
import LoadingView from '../components/LoadingView';
import { NaviGoBack } from '../utils/CommonUtils';

var canGoBack = false;

class WebViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  goBack() {
    return NaviGoBack(this.props.navigator);
  }

  renderLoading() {
    return <LoadingView />;
  }

  render() {
    const {navigator, route} = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar title={route.article.userName} backOnPress={this.goBack} />
        <WebView
          ref='webview'
          automaticallyAdjustContentInsets={false}
          style={{ flex: 1 }}
          source={{ uri: route.article.url }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          decelerationRate="normal"
          onShouldStartLoadWithRequest={(event) => {
            return true;
          } }
          onNavigationStateChange={this.onNavigationStateChange}
          renderLoading={this.renderLoading.bind(this)}
          />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center'
  },
  shareContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
});

export default WebViewPage;