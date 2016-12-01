import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';

class ListItemDetail extends Component {
    
    render() {
        let {model} = this.props;

        return (
            <View style={styles.containerItem}>
                <Image
                    style={{ width: 88, height: 66, marginRight: 10 }}
                    source={{ uri: model.contentImg }}
                />
                <View style={{ flex: 1, flexDirection: 'column' }} >
                    <Text style={styles.title}>
                        {model.title}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ fontSize: 14, color: '#aaaaaa', marginTop: 5 }}>
                            来自微信公众号：
                        </Text>
                        <Text style={{ flex: 1, fontSize: 14, color: '#87CEFA', marginTop: 5, marginRight: 5 }}>
                            {model.userName}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    shouldComponentUpdate() {
        return false;
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

class ListItem extends Component {
    render() {
        let {model} = this.props;

        return (
            // {
            //     Platform.OS === 'ios' ?
            //         <TouchableOpacity
            //             //onPress={this._itemClickCallback.bind(this, rowData)}
            //             activeOpacity={0.7}
            //         >
            //             <ListItemDetail model={model} />
            //         </TouchableOpacity>
            //         :
            //         <TouchableNativeFeedback 
            //             //onPress={this._itemClickCallback.bind(this, rowData)}
            //         >
            //             <ListItemDetail model={model} />
            //         </TouchableNativeFeedback>
            // }
            <TouchableNativeFeedback 
                        //onPress={this._itemClickCallback.bind(this, rowData)}
                    >
                        <ListItemDetail model={model} />
                    </TouchableNativeFeedback>
        )
    }
}

export default ListItem;
