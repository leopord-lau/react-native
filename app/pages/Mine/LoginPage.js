import React from 'react'
import {StyleSheet,Image,Text,TextInput,TouchableOpacity,View,Dimensions,Alert,ToastAndroid} from 'react-native'

var {width} = Dimensions.get('screen')
var {height} =Dimensions.get('screen')

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            userPwd:''
        }
        this.login=this.login.bind(this)
        this.update=this.update.bind(this)
    }
    update(){
        this.props.callbackUpdateState()
    }
    login(){
        if(this.state.userName!==''){
            if(this.state.userPwd!==''){
                fetch('https://leopord.cn/loginUser', {
                    method: 'POST',
                    mode:'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ //参数
                        'userName':this.state.userName,
                        'userPassword':this.state.userPwd
                    })
                })
                .then((response) => response.json())
                .then((responseData) => { // 上面的转好的json
                    console.log(responseData);
                    console.log(responseData.code==1)
                    if(responseData.code==1){
                        if(responseData.data[0].shopper===1){
                            ToastAndroid.showWithGravity('登录成功，欢迎您查看店铺信息',ToastAndroid.SHORT,ToastAndroid.CENTER);
                            setTimeout(() => {
                                this.props.callbackLoginState()
                                this.props.callbackManager()
                            }, 1000);
                        }else{
                            ToastAndroid.showWithGravity('登录成功,欢迎您使用鹏鹏外卖App',ToastAndroid.SHORT,ToastAndroid.CENTER);
                            setTimeout(() => {
                                this.props.callbackLoginState()
                            }, 1000);
                        }
                    }
                })
                .catch((error)=> {
                    alert(error)
                })
            }else{
                Alert.alert('请输入密码')
            }
        }else{
            Alert.alert('请输入用户名')
        }
    }
    register(){
        this.props.callbackRegister()
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.circleImage} source={require('../../images/user.png')}/>
                <TextInput
                    style={styles.textInput}
                    placeholder={'请输入用户名'} onChangeText={(text)=>{this.setState({userName:text})}}
                    underlineColorAndroid={'transparent'}/>
                <TextInput
                    style={styles.textInput} onChangeText={(text)=>{this.setState({userPwd:text})}}
                    placeholder={'请输入密码'}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}/>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={styles.loginText} onPress={()=>this.login()}>登录</Text>
                </TouchableOpacity>
                <View style={styles.canNot}>
                    <Text style={{color: '#4398ff'}} onPress={()=>this.update()}>忘记密码？</Text>
                    <Text style={{color: '#4398ff'}} onPress={()=>this.register()}>新用户</Text>
                </View>
                <View style={styles.loginTheWay}>
                    <Text>其它登录方式：</Text>
                    <Image style={styles.image} source={require('../../images/alipay.png')}/>
                    <Image style={styles.image} source={require('../../images/wechat.png')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dddddd',
        alignItems: 'center',
        height:height-120
    },
    circleImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 80,
        marginBottom: 25,
    },
    textInput: {
        height: 40,
        width: width,
        marginBottom: 5,
        backgroundColor: 'white',
        textAlign: 'center',
    },
    canNot: {
        width: width - 32,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loginTheWay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 130,
        left: 100,
    },
    image: {
        width: 25,
        height: 25,
        marginLeft: 5,
        borderRadius: 25,
    },
    btnStyle: {
        height: 40,
        width: width - 32,
        borderRadius: 5,
        marginTop: 20,
        backgroundColor: '#4398ff',
        justifyContent: 'center',
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        textAlignVertical: 'center',
    }

});
