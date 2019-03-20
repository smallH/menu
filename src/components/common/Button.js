import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({onPress, children}) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity style={ buttonStyle } onPress={onPress}>
            <Text style={ textStyle }>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#007AFF',
        padding: 8
    },
    textStyle: {
        fontSize: 16,
        color: '#007AFF',
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'center'
    }
};

Button.propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node
};

export default Button;