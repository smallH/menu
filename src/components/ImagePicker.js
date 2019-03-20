import React, { Component } from 'react';
import { Modal, View, ListView, Image, TouchableHighlight } from 'react-native';
import { Header, CardSection, Button } from './common';
import PropTypes from 'prop-types';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ImagePicker extends Component {

    state = {
        dimensions: {
            width: 100,
            height: 100
        }
    }

    renderRow = (item) => {
        const { image } = item.node;
        let side = this.state.dimensions.width / 3 ;
  
        return (
            <TouchableHighlight 
                onPress={()=>{
                    this.props.onSelectImage(image);
                }} 
                style={{width:side, height:side}}
            >
                <View>
                    <Image 
                        source={{ uri: image.uri }} 
                        style={{width:side, height:side}} 
                    />
                </View>
            </TouchableHighlight>
        );
    }



    onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        this.setState({dimensions:{width,height}});
    }

    render() {
        this.dataSource = ds.cloneWithRows(this.props.images);
        const { containerStyle, listViewStyle, buttonContainerStyle } = styles;

        return (
            <Modal
                animationType='slide'
                visible={this.props.visible}
                onRequestClose={()=>{}}
            >
                <View onLayout={this.onLayout} style={containerStyle}>
                    <Header headerText="选择照片"></Header>
                    
                    <ListView
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        enableEmptySections={true}
                        contentContainerStyle={listViewStyle}
                        />

                    <CardSection style={buttonContainerStyle}>
                        <Button onPress={this.props.onCancel}>关闭</Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    listViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center'
    },
    buttonContainerStyle: {
        alignSelf: 'flex-end'
    }
};

ImagePicker.propTypes = {
    images: PropTypes.array,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onSelectImage: PropTypes.func
};

export default ImagePicker;