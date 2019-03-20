import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import PropTypes from 'prop-types';

class AuthScreen extends Component {
    static navigationOptions = {
        title: '用户认证',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            color: '#FFFFFF'
        }
    }
    
    onEmailChanged = (text) => {
        this.props.emailChanged(text);
    }

    onPasswordChanged = (text) => {
        this.props.passwordChanged(text);
    }

    onLoginPress = () => {
        const { auth, navigation } = this.props;
        // navigation.navigate('MenuList', { title: '用户认证' });
        this.props.loginUser(auth.email, auth.password, navigation);
    }

    renderButton() {
        if(this.props.auth.loading){
            return (
                <View style={{flex:1}}>
                    <ActivityIndicator size='small' />
                </View>
            );
        }else{
            return <Button onPress={this.onLoginPress}>登录</Button>;
        }
    }

    renderErrorMessage(error) {
        if(error){
            return (
                <CardSection>
                    <View style={{        
                        flex: 1, 
                        padding: 0,
                        textAlignVertical: 'center' 
                        }}>
                        <Text style={{        
                            fontSize: 13,
                            color: 'red',
                            alignSelf:'center'
                            }}>
                            {error}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    render() {
        const { auth } = this.props;
        
        return (
            <View>
                <CardSection>
                    <Input
                        label='邮箱'
                        placeholder='user@icloud.com'
                        onChangeText={this.onEmailChanged}
                        value={auth.email} />
                </CardSection>

                <CardSection>
                    <Input
                        label='密码' 
                        placeholder='请输入密码'
                        secureTextEntry
                        onChangeText={this.onPasswordChanged}
                        value={auth.password} />
                </CardSection>

                {this.renderErrorMessage(auth.error)}
              
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </View>
        );
    }
}

AuthScreen.propTypes = {
    emailChanged: PropTypes.func, // email输入字段改变时触发的函数
    passwordChanged: PropTypes.func, // password输入字段改变时触发的函数
    loginUser: PropTypes.func, // 用户登录时触发的函数
    auth: PropTypes.object, // 用户权限reducer返回对象
    navigation: PropTypes.object // navigation 导航数据对象
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(AuthScreen);