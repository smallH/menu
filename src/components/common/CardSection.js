import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const CardSection = ({style, children}) => {
    return (
        <View style={[styles.containerStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF',
        padding: 16,
        flexDirection: 'row',
        position: 'relative'
    }
};

CardSection.propTypes = {
    style: PropTypes.object, // 样式
    children: PropTypes.node.isRequired //node节点
};

export default CardSection;