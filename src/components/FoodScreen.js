import React, { Component } from 'react';
import { Text, Image, TouchableHighlight, Dimensions, CameraRoll, PermissionsAndroid } from 'react-native';
import GoBackButton from '../components/Header/GoBackButton';
import HeaderRightNull from '../components/Header/HeaderRightNull';
import { Card, CardSection, Input, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { 
    foodNameChanged, 
    foodPriceChanged,
    foodImageChanged, 
    saveFood,
    initFood,
    deleteFood 
} from '../actions';
import PropTypes from 'prop-types';
import ImagePicker from '../components/ImagePicker';

const { width } = Dimensions.get('window');

class FoodScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '菜',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor:'#FFFFFF',
        headerTitleStyle: {
            flex: 1, 
            textAlign: 'center'
        },
        headerRight:(
            <HeaderRightNull />
        ),
        headerLeft:(
            <GoBackButton onPress={()=>{navigation.goBack();}} label={navigation.getParam('title','返回')} />
        )
    })

    state = {
        showDeleteConfirm: false,
        showImagePicker: false,
        images: []
    }

    UNSAFE_componentWillMount() {
        const { selectedItem } = this.props;
        if(selectedItem) {
            this.props.initFood(selectedItem.food);
        }

        this.requestReadPermission();
    }

    getPhotos(){
        CameraRoll.getPhotos({ first: 30, assetType: 'All' })
        .then((result) => {
            this.setState({ images: result.edges });
        }).catch((error) => {
            console.log(error);
        });
    }

    async requestReadPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    //第一次请求拒绝后提示用户你为什么要这个权限
                    'title': '我要读写权限',
                    'message': '没权限我不能工作，同意就好了'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('你已获取了读写权限');
                this.getPhotos();
            } else {
                console.log('获取读写权限失败');
            }
        } catch (err) {
            console.log(err.toString());
        }
    }

    onNameChanged = (text) => {
        this.props.foodNameChanged(text);
    }

    onPriceChanged = (text) => {
        this.props.foodPriceChanged(text);
    }

    onFoodSave = () => {
        const { selectedItem, food, navigation } = this.props;
        const key = selectedItem ? selectedItem.key : null;
        console.log('selectedItem:',selectedItem);
        console.log('food',food);
        this.props.saveFood({
            key,
            food,
            navigation
        });
    }

    onFoodDeleteAccepted = () => {
        const { selectedItem, food, navigation } = this.props;
        if(selectedItem.key){
            this.props.deleteFood(selectedItem.key, food, navigation);
        }
    }

    onFoodDeleteCanceled = () => {
        this.setState({showDeleteConfirm: false});
    }

    renderDeleteButton = () => {
        const { selectedItem } = this.props;
        if(selectedItem && selectedItem.key){
            return (
                <CardSection>
                    <Button onPress={() => this.setState({showDeleteConfirm: true})}>删除</Button>
                </CardSection>
            );
        }
    }

    getImageSource(imageUrl){
        console.log(imageUrl);
        if(imageUrl){
            return {uri: imageUrl};
        }else{
            return require('../../img/image-placeholder.jpg');
        }

    }

    onSelectImage = (image) => {
        console.log(image);
        this.setState({showImagePicker: false});
        this.props.foodImageChanged(image.uri);
    }

    render() {
        const { name, imageUrl, price } = this.props.food;

        return (
            <Card>
                <CardSection>
                    <Input
                        label='菜名'
                        placeholder='请输入菜名'
                        onChangeText={this.onNameChanged}
                        value={name} />
                </CardSection>

                <CardSection>
                    <Text style={{ 
                            flex: 1, 
                            fontSize: 16, 
                            textAlign:'center'
                        }}>图片</Text>
                    <TouchableHighlight 
                        style={{ flex:2 }}
                        onPress = {() => { 
                            this.setState({showImagePicker: true}); 
                        }}
                    >
                        <Image
                            source={this.getImageSource(imageUrl)}
                            style={{width:width*0.5, height:width*0.5}}    
                        />
                    </TouchableHighlight>
                </CardSection>

                <CardSection>
                    <Input
                        label='价格'
                        placeholder='请输入价格(元)'
                        keyboardType='numeric'
                        onChangeText={this.onPriceChanged}
                        value={price} />
                </CardSection>

                <CardSection>
                    <Button onPress={this.onFoodSave.bind(this)}>保存</Button>
                </CardSection>

                {this.renderDeleteButton()}

                <ImagePicker 
                    visible={this.state.showImagePicker}
                    images={this.state.images}
                    onCancel={() => {
                        this.setState({showImagePicker: false});
                    }} 
                    onSelectImage={this.onSelectImage}
                />


                <Confirm 
                    visible={this.state.showDeleteConfirm}
                    onAccept={this.onFoodDeleteAccepted.bind(this)}
                    onCancel={this.onFoodDeleteCanceled.bind(this)}
                >
                    您真的需要删除这道菜吗？
                </Confirm>
            </Card>
        );
    }
}

FoodScreen.propTypes = {
    foodNameChanged: PropTypes.func, // 编辑菜名称时触发的函数
    foodPriceChanged: PropTypes.func, // 编辑菜价格时触发的函数
    foodImageChanged: PropTypes.func,
    food: PropTypes.object, // food菜对象
    saveFood: PropTypes.func, // 点击保存按钮时触发的函数
    navigation: PropTypes.object,
    selectedItem: PropTypes.object,
    initFood: PropTypes.func,
    deleteFood: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    const param = ownProps.navigation.getParam('selectedItem');
    return {
        food: state.food,
        selectedItem: param ? param : null
    };
};

export default connect(mapStateToProps, { foodNameChanged, foodPriceChanged, foodImageChanged, saveFood, initFood, deleteFood })(FoodScreen);