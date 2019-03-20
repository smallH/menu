import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const GoBackSVG = ({width, height, color, containerStyle}) => (
    <View style={containerStyle}>
        <Svg t="1545683980136" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4732" width={width || 32} height={height || 32}>
            <Path fill={color || '#ccc'} d="M993.726 452.32c-19.387-45.837-47.128-86.989-82.454-122.313-35.326-35.326-76.479-63.068-122.314-82.455-47.486-20.084-97.893-30.269-149.823-30.269H263.133l180.39-180.288H239.865L0.007 276.854l239.858 239.858h203.658L263.132 336.425h376.002c146.518 0 265.719 119.201 265.719 265.719 0 146.519-119.201 265.719-265.719 265.719H137.03c-32.9 0-59.571 26.671-59.571 59.571s26.671 59.571 59.571 59.571h502.104c51.931 0 102.337-10.185 149.823-30.269 45.837-19.388 86.988-47.13 122.314-82.456 35.326-35.324 63.067-76.478 82.454-122.313 20.085-47.485 30.269-97.894 30.269-149.823s-10.183-102.338-30.268-149.824z" p-id="4733"></Path>
        </Svg>
    </View>
);

GoBackSVG.propTypes = {
    width: PropTypes.number, // SVG宽度
    height: PropTypes.number, // SVG高度
    color: PropTypes.string, // SVG背景色
    containerStyle: PropTypes.object // 包裹SVG容器的样式
};

export default GoBackSVG;