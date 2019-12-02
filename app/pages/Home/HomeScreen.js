import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createSwitchNavigator} from 'react-navigation'
//import DetailScreen from './DetailScreen'
import ShopScreen from '../Shop/ShopScreen'
import ShopDetail from '../Shop/ShopDetail'
import ShopInside from '../Shop/ShopInside'

import HomeMenu from './HomeMenu'
import MediumBlock from './MediumBlock'
import SmallBlock from './SmallBlock'
import LargeBlock from './LargeBlock'

import menuData from '../../mock/TopMenu.json'
import actData from '../../mock/MeiTuanAct.json'
let navigation={};
 class HomeScreen extends Component{
  static navigationOptions={
    header:HomeHeader
  };
 constructor(){
   super()
   this.state={}
   this.jumpShop=this.jumpShop.bind(this)
 }
 jumpShop(url){
   navigation.navigate('Shops',url)
 }
  render(){
    navigation=this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        {/*菜单栏*/}
        <HomeMenu listData={menuData.data} onClick={this.jumpShop}/>
        {/*中间活动广告*/}
        <View style={styles.middle}>
          <View style={styles.middleLeft}>
            <MediumBlock data={actData.data[0]}/>
          </View>
          <View>
            <View style={styles.rightTop}>
              <SmallBlock data={actData.data[1]}/>
            </View>

            <SmallBlock data={actData.data[2]}/>
          </View>
        </View>
        {/*底部活动广告*/}
        <View style={styles.bottom}>
          <LargeBlock data={actData.data[3]}/>
          <SmallBlock data={actData.data[4]}/>
          <SmallBlock data={actData.data[5]}/>
          <SmallBlock data={actData.data[6]}/>
          <SmallBlock data={actData.data[7]}/>
        </View>
      </ScrollView>
    )
  }

}

//渲染tab图标
function renderIcon(tab,component){
  let iconSrc='';
  if (tab.focused){                       //标签激活状态下icon的路径
    iconSrc='icon_tabbar_'+component+'_selected';
  }else{                                  //未激活状态下的icon
    iconSrc='icon_tabbar_'+component;
  }
  return <Image source={{uri:iconSrc}} style={{width:30,height:30}} />
}
//渲染头部
function HomeHeader (){
  return(
    <View style={styles.header}>
      <Text style={styles.headerText}>广州</Text>
      <TextInput style={styles.headerInput} underlineColorAndroid='transparent'
                 placeholder="请输入要查询的信息"/>
      <Image style={styles.headerImage} source={{uri:'icon_homepage_scan'}} />
    </View>
  )
}

export default HomeStack =createStackNavigator(  //将所有的navigator放置一起
  {
    Home:{screen:HomeScreen},
    Shops:{screen:ShopScreen},
  },
)

const DevWidth=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    width:DevWidth,
    height:60,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    backgroundColor: '#4398ff'//'#8bffce',
  },
  headerText:{
    fontSize:16
  },
  headerInput:{
    width:DevWidth*0.618,
    height:40,
    borderRadius:20,
    paddingLeft:15,
    backgroundColor:'#fff',
    fontSize:15
  },
  headerImage:{
    width:25,
    height:25
  },
  middle:{
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#DDDDDD',
    borderBottomWidth:1,
    borderBottomColor:'#DDDDDD',
    backgroundColor:'#fff'
  },
  middleLeft:{
    borderRightWidth:1,
    borderRightColor:'#DDDDDD'
  },
  rightTop:{
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
  },
  bottom:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
    backgroundColor:'#fff'
  }
});
