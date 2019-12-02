import React from 'react'
import {StyleSheet,Image,Text,TextInput,TouchableOpacity,View,Dimensions,ToastAndroid} from 'react-native'

var {width} = Dimensions.get('screen')
var {height} =Dimensions.get('screen')

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            userPassword:''
        }
        this.register=this.register.bind(this)
        this.login=this.login.bind(this)
    }
    register(){
        if(this.state.userName!==''){
            if(this.state.userPwd!==''){
                fetch('https://leopord.cn/updateUser', {
                    method: 'POST',
                    mode:'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ //参数
                        'userName':this.state.userName,
                        'userPassword':this.state.userPassword
                    })
                })
                .then((response) => response.json())
                .then((responseData) => { // 上面的转好的json
                    if(responseData.code==1){
                        ToastAndroid.showWithGravity('密码更改成功，请重新登录',ToastAndroid.SHORT,ToastAndroid.CENTER);
                        setTimeout(() => {
                            this.props.callbackLoginStateFalse()
                        }, 1000);
                    }else{
                        ToastAndroid.showWithGravity(responseData.msg,ToastAndroid.SHORT,ToastAndroid.CENTER);
                    }
                })
                .catch((error)=> {
                    alert(error)
                })
            }else{
                Alert.alert('请输入新密码')
            }
        }else{
            Alert.alert('请输入用户名')
        }
    }
    login(){
        this.props.callbackLoginStateFalse()
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.circleImage} source={require('../../images/user.png')}/>
                <TextInput
                    style={styles.textInput} onChangeText={(text)=>this.setState({userName:text})}
                    placeholder={'请输入手机号'}
                    underlineColorAndroid={'transparent'}/>
                <TextInput
                    style={styles.textInput} onChangeText={(text)=>this.setState({userPassword:text})}
                    placeholder={'请输入新密码'}
                    secureTextEntry={true}
                    underlineColorAndroid={'transparent'}/>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={styles.loginText} onPress={()=>this.register()}>确定修改</Text>
                </TouchableOpacity>
                <View style={styles.canNot}>
                    <Text style={{color: '#4398ff'}} onPress={()=>this.login()}>登录</Text>
                </View>
                <View style={styles.loginTheWay}>
                    <Text>其它验证方式：</Text>
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
        //alignItems: 'center',
        //textAlign:'center',
        justifyContent: 'center',
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
