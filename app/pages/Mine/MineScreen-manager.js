import React from 'react';
import {
    View,
    Text,
    Button,
    StatusBar,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import  MineListFooterView from './view/MineFooterView'
import  MineListHeaderView from './view/MineHeaderManager'
import  MineListItemManager from './view/MineListItemManager'
import Operation from './Operation'
import AddFood from '../Goods/AddFood'

export  default  class MineScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:{
                userName:'荣味家大食堂',
                userAccount:'13143374570'
            },
            dataSource:[
                {title:'我的店铺',details:'',icon:require('../../images/ic-mine-sc.png'),next:''},
                {title:'商品管理',details:'添加',icon:require('../../images/ic-mine-kf.png'),next:''},
                {title:'我的客服',details:'',icon:require('../../images/ic-mine-tjyj.png'),next:''},
                {title:'商务合作',details:'',icon:require('../../images/ic-mine-tjyj.png'),next:''},
                {title:'办卡有礼',details:'',icon:require('../../images/ic-mine-bkyl.png'),next:''},
                {title:'设置',   details:'',icon:require('../../images/ic-mine-sz.png'),next:'Setting'},
            ],
            showOperation:false,
            showAdd:false
        };
    };
    callbackAdd=()=>{
        this.setState({
            showOperation:true,
            showAdd:true
        })
    }
    callbackShop=()=>{
        this.setState({
            showOperation:true,
            showAdd:false
        })
    }
    render() {
        return (
            <View style={listViewStyles.container}>
                {
                    this.state.showOperation?
                    <View>
                        {
                            this.state.showAdd?
                            <AddFood callbackShop={this.callbackShop}/>
                            :
                            <Operation callbackAdd={this.callbackAdd}/>
                        }
                    </View>
                    :
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <MineListItemManager callbackOperation={this.callbackOperation} model={item} onPress={()=>this.pressItem(item)}/>}
                    keyExtractor={(item, index)=>index+''}
                    ListHeaderComponent={<MineListHeaderView
                        userName={this.state.user?this.state.user.userName:'登录/注册'}
                        usePhone={this.state.user?this.state.user.userAccount:'登录后享受更多特权'}
                        onUserInfoPress={()=>{this.onUserInfoPress()}}
                        redPcketItemPress={(item,index)=>{this.redPcketItemPress(item,index)}}
                    />}
                    ListFooterComponent={<MineListFooterView/>}
                />
                }
                

            </View>
        );
    }
    callbackOperation=()=>{
        this.setState({
            showOperation:true
        })
    }
    componentDidMount() {

        this.loaduser();
    }


    //头部用户信息栏点击
    onUserInfoPress() {
        this.props.callbackUpdateState()
        /*
        if (this.state.user){

            this.props.navigation.navigate('Setting');

        }else {
            this.props.navigation.navigate('Login');
        }
        */
    }

    //红包/津贴/钱包点击
    redPcketItemPress(item,index){
        console.log(item);
        console.log(index);
    }
    //加载用户登录信息
    loaduser() {
        /*
        storage.load({
            key: 'user',
            id:'current',
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            console.log(ret);
            this.setState({
                user:ret
            });

        }).catch(err => {
            ///登录数据过期或者没找到数据
            rootNavigation.navigate('Login');
        });
        */
       console.log('load')
    }


    pressItem(item){
        console.log(item);
        if (item.next){
            this.props.navigation.push(item.next);
        }

    }
}

const listViewStyles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'rgba(245,245,245,1)',
    }
});