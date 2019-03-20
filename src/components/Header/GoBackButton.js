import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GoBackSVG from './GoBackSVG';
import PropTypes from 'prop-types';

const GoBackButton = ({label, onPress}) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress} >
            <View style={styles.buttonContainerStyle}>
                <GoBackSVG width={14} height={14} color={'#FFFFFF'} containerStyle={styles.svgContainerStyle}/>
                <Text style={styles.textStyle}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        padding: 10
    },
    buttonContainerStyle:{
        flexDirection:'row',
        alignItems: 'center'
    },
    textStyle: {
        marginLeft: 4,
        fontSize: 16,
        color: '#FFFFFF'
    },
    svgContainerStyle:{

    }
};

GoBackButton.propTypes = {
    label: PropTypes.string, // 按钮文本
    onPress: PropTypes.func.isRequired // 按钮点击时触发的函数
};

export default GoBackButton;