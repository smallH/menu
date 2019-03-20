import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({label, value, placeholder, onChangeText, keyboardType, secureTextEntry,editable=true}) => {
    const { viewStyle, viewTextStyle, textStyle, textInputStyle } = styles;

    return (
        <View style={viewStyle}>
            <View style={viewTextStyle}>
                <Text style={textStyle}>{label}</Text>
            </View>
            <TextInput 
                style={textInputStyle} 
                value={value}
                keyboardType={keyboardType} 
                placeholder={placeholder}
                onChangeText={onChangeText}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                editable={editable} />
        </View>
    );
};

// flex: 1 占满父组件主轴方向的全部空间
const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewTextStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16
    },
    textInputStyle: {
        flex: 2,
        fontSize: 16,
        height: 30,
        padding: 0,
        textAlignVertical: 'center'
    },   
};

Input.propTypes = {
    label: PropTypes.string, // 标签名
    value: PropTypes.string, // 输入文本
    placeholder: PropTypes.string, // 输入文本预期值的提示信息
    onChangeText: PropTypes.func, // 输入文本改变时触发的函数
    secureTextEntry: PropTypes.bool, // 是否为密码，用 * 替代输入
    editable: PropTypes.bool, // 是否可编辑
    keyboardType: PropTypes.string // 数据类型
};

export default Input;