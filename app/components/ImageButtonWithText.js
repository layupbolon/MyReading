/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

export default class ImageButton extends Component{

    static propTypes = {
        text: PropTypes.string,
        image: PropTypes.number,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        imgSize: PropTypes.number,
        fontSize: PropTypes.number,
        color: PropTypes.string,
        btnStyle: View.propTypes.style
    };

    static defaultProps = {
        imgSize: px2dp(40),
        fontSize: px2dp(13)
    };

    render() {
        const {text, image, icon, onPress, color, imgSize, fontSize, btnStyle} = this.props;

        if (Platform.OS === 'ios') {
            if (image) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        <View style={[styles.view, btnStyle]}>
                            <Image source={image} style={{width: imgSize, height: imgSize}}/>
                            {text ?
                                <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                                :
                                null
                            }
                        </View>
                    </TouchableOpacity>
                );
            } else if (icon) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        <View style={[styles.view, btnStyle]}>
                            <Icon name={icon} size={imgSize} color={color}/>
                            {text ?
                                <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                                :
                                null
                            }
                        </View>
                    </TouchableOpacity>
                );
            }
        } else if (Platform.OS === 'android') {
            if (image) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        <View style={[styles.view, btnStyle]}>
                            <Image source={image} style={{width: imgSize, height: imgSize}}/>
                            {text ?
                                <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                                :
                                null
                            }
                        </View>
                    </TouchableNativeFeedback>
                );
            } else if (icon) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        <View style={[styles.view, btnStyle]}>
                            <Icon name={icon} size={imgSize} color={color}/>
                            {text ?
                                <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                                :
                                null
                            }
                        </View>
                    </TouchableNativeFeedback>
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        marginTop: px2dp(4)
    }
});