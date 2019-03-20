import React from 'react';
import { View, Text, Modal } from 'react-native';
import CardSection from './CardSection'; // 注意此处导出，不从index.js引用
import Button from './Button';
import Space from './Space';
import PropTypes from 'prop-types';

const Confirm = ({ children, visible, onAccept, onCancel }) => {
    const { viewContainerStyle,textContainerStyle,buttonContainerStyle,textStyle } = styles;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={viewContainerStyle}>
                <CardSection style={textContainerStyle}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </CardSection>

                <CardSection style={buttonContainerStyle}>
                    <Button onPress={onAccept}>确认</Button>
                    <Space width={16}></Space>
                    <Button onPress={onCancel}>取消</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    viewContainerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
        padding: 32
    },
    textContainerStyle: {
        justifyContent: 'center',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    buttonContainerStyle: {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderBottomWidth: 0
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    }
};

Confirm.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool,
    onAccept: PropTypes.func,
    onCancel: PropTypes.func
};

export default Confirm;