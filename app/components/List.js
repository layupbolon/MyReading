import React, { Component } from 'react';
import {
    View,
    RefreshControl,
    ListView,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    ActivityIndicator,
    InteractionManager
} from 'react-native';

import { connect } from 'react-redux';
import { fetchArticles } from '../actions/read';
import {LoadingView} from '../components';
import WebViewPage from '../pages/WebViewPage';

let canLoadMore;
let page = 1;
let loadMoreTime = 0;

class List extends Component {
    constructor(props) {
        super(props);

        canLoadMore = false;

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            typeId:props.tabTag.id
        };

        this.renderItem = this.renderItem.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(fetchArticles(false, true, this.state.typeId));        
    }

    renderItem(article, sectionID, rowID) {
        return (
            <TouchableOpacity 
            onPress={this.onPress.bind(this, article)}
            >
                <View style={styles.containerItem}>
                    <Image
                        style={{ width: 88, height: 66, marginRight: 10 }}
                        source={{ uri: article.contentImg }}
                    />
                    <View style={{ flex: 1, flexDirection: 'column' }} >
                        <Text style={styles.title}>
                            {article.title}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontSize: 14, color: '#aaaaaa', marginTop: 5 }}>
                                来自微信公众号：
                            </Text>
                            <Text style={{ flex: 1, fontSize: 14, color: '#87CEFA', marginTop: 5, marginRight: 5 }}>
                                {article.userName}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onPress(article) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: WebViewPage,
                name: 'WebViewPage',
                article: article
            });
        });
    }

    onEndReached(typeId) {
        let time = Date.parse(new Date()) / 1000;
        if (canLoadMore && time - loadMoreTime > 1) {
            page++;
            const {dispatch} = this.props;
            dispatch(fetchArticles(false, false, this.state.typeId, true, page));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        }
    }

    renderFooter() {
        let {read} = this.props;
        if (read.isLoadMore) {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color='#3e9ce9' size='large'/>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                        数据加载中……
                    </Text>
                </View>
            );
        }
    }

    onScroll() {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    onRefresh(typeId) {
        let {dispatch} = this.props;
        canLoadMore = false;
        dispatch(fetchArticles(true, false, this.state.typeId));
    }

    render() {
        let typeId = this.state.typeId;
        let {read} = this.props;
        if (read.loading) {
            return <LoadingView />;
        }

        let datasource = this.state.dataSource.cloneWithRows(read.articleList[typeId] === undefined ? [] : read.articleList[typeId]);

        return (
            <ListView
                initialListSize={1}
                dataSource={datasource}
                renderRow={this.renderItem}
                style={{backgroundColor: '#eeeeec'}}
                onEndReached={this.onEndReached.bind(this, typeId)}
                onEndReachedThreshold={10}
                onScroll={this.onScroll}
                enableEmptySections
                scrollRenderAheadDistance={500}
                renderFooter={this.renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={read.isRefreshing}
                        onRefresh={this.onRefresh.bind(this, typeId)}
                        title="Loading..."
                        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                    />
                }
            />
        );
    }
}

let styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  }
});


function mapStateToProps(state) {
    let {read} = state;
    return {
        read
    };
}

export default connect(mapStateToProps)(List);