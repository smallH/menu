import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import GoBackButton from '../components/Header/GoBackButton';
import { connect } from 'react-redux';
import ListItem from '../components/ListItem';
import PropTypes from 'prop-types';
import { fetchMenuList } from '../actions';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const EMPTY_FOOD = {
    name: '',
    imageUrl: '',
    price: ''
};

class MenuListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
       return { 
            title: '菜单',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTitleStyle: {
                flex: 1, 
                textAlign: 'center',
                color: '#FFFFFF'
            },
            headerRight: (
                <TouchableOpacity 
                    style={styles.headerRightButtonStyle}
                    onPress={() => navigation.navigate('Food', { selectedItem: { food: EMPTY_FOOD } ,title:'菜单'})}    
                >
                    <Text style={styles.headerRightTextStyle}>
                        +
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft:(
                <GoBackButton onPress={()=>{navigation.goBack();}} label={navigation.getParam('title','返回')} />
            )
        };
    }

    dataSource = (list) => {
        return ds.cloneWithRows(list);
    }

    renderRow = (item) => {
        return <ListItem item={item} navigation={this.props.navigation} />;
    }
    
    UNSAFE_componentWillMount() {
        this.props.fetchMenuList();
    }

    renderFooter = () => {
        return <View style={{height: 8}} />;
    }

    render() {
        if(this.props.loading){
            const { loadingContainerStyle, loadingStyle } = styles;
            return (
                <View style={loadingContainerStyle}>
                    <ActivityIndicator style={loadingStyle} size='large' animating={true} />
                </View>
            );
        }else{
            return (
                <ListView
                    dataSource={this.dataSource(this.props.data)}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter}
                    enableEmptySections={true} />
            );
        }
    }
}

const styles = {
    headerRightButtonStyle: {
        padding: 10
    },
    headerRightTextStyle: {
        fontSize: 24,
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    loadingContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
};

MenuListScreen.propTypes = {
    data: PropTypes.array,
    fetchMenuList: PropTypes.func,
    navigation: PropTypes.object,
    loading: PropTypes.bool
};

const mapStateToProps = (state) => {
    const { loading, data } = state.menu_list;
    return {
        loading,
        data
    };
};

export default connect(mapStateToProps,{ fetchMenuList })(MenuListScreen);