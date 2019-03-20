import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Space = ({ width, height }) => {
    return (
        <View style={{ width, height }} />
    );
};

Space.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default Space;