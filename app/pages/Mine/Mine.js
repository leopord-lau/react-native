import React from 'react'
import {Text,View,Image,StyleSheet,ScrollView,Dimensions,TextInput,TouchableOpacity} from 'react-native'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import MineScreen from './MineScreen'
import UpdatePage from './UpdatePage'
import MineScreenManager from './MineScreen-manager'

export default class Mine extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loginState:false,
            showRegister:false,
            showUpdate:false,
            showManager:false
        }
    }
    callbackLoginState=()=>{  //已登录状态
        this.setState({
            loginState:true,
            showRegister:false,
            showUpdate:false
        })
    }
    callbackRegister=()=>{    //展示注册页面
        this.setState({
            showRegister:true,
            showUpdate:false,
            loginState:false
        })
    }
    callbackLoginStateFalse=()=>{  //展示登录页面
        this.setState({
            loginState:false,
            showRegister:false,
            showUpdate:false
        })
    }
    callbackUpdateState=()=>{
        this.setState({
            loginState:false,
            showRegister:false,
            showUpdate:true
        })
    }
    callbackManager=()=>{
        this.setState({
            loginState:true,
            showRegister:false,
            showUpdate:false,
            showManager:true
        })
    }
    render(){
        return(
            <ScrollView>
                {
                    this.state.loginState?
                    <View>{
                        this.state.showManager?
                        <MineScreenManager />
                        :
                        <MineScreen callbackUpdateState={this.callbackUpdateState}/>
                        }</View>
                    :
                    <View>
                        {
                            this.state.showRegister?
                            <View><RegisterPage callbackLoginStateFalse={this.callbackLoginStateFalse}/></View>
                            :
                            <View>
                                {
                                    this.state.showUpdate?
                                    <UpdatePage callbackLoginStateFalse={this.callbackLoginStateFalse}/>
                                    :
                                    <LoginPage callbackManager={this.callbackManager} callbackLoginState={this.callbackLoginState} callbackRegister={this.callbackRegister} callbackUpdateState={this.callbackUpdateState}/>
                                }
                                
                            </View>
                        }
                    </View>
                }
            </ScrollView>
        )
    }
}
var styles=StyleSheet.create({
    
})