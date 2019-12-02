import React from 'react';
import { Text, View,Image } from 'react-native';
import { createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import Mine from './pages/Mine/Mine'
import MineScreen1 from './pages/Mine/MineScreen'
import Cart from './pages/Cart/cart'
import  HomeStack  from './pages/Home/HomeScreen' 
import ShopStack from './pages/Shop/ShopScreen'
import ShopScreen from './pages/Shop/ShopScreen1'
import ShopInside from './pages/Shop/ShopInside'
import EditAddress from './pages/Address/EditAddress'
import OrderPage from './pages/Address/OrderPage'
import Address from './pages/Address/Address';
import OrderScreen from './pages/order/OrderScreen';
/*
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./images/ic_home.png')}
                style={[{height: 24, width: 24}]}/>
        <Text>Home</Text>
      </View>
    );
  }
}
*/
class TypeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('./images/ic_type.png')}
                style={[{height: 24, width: 24}]}
            />
        <Text>Type</Text>
      </View>
    );
  }
}
/*
class ShopCarScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('./images/ic_shop_car.png')}
                style={[{height: 24, width: 24}]}
            />
            <Text>ShopCar</Text>
        </View>
      );
    }
  }
  */
  /*
  class MineScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('./images/ic_me.png')}
                style={[{height: 24, width: 24}]}
            />
            <Text>Mine</Text>
        </View>
      );
    }
  }
*/
const TabNavigator = createBottomTabNavigator({
    /*
  Home: { screen: HomeScreen, },
  Type: { screen: TypeScreen },
  ShopCar:{ screen: ShopCarScreen},
  Mine: { screen: MineScreen}
  */
 Home: {
    screen: HomeStack,
    navigationOptions: {
        //stackNavigator的属性
        headerTitle: '首页',
        gestureResponseDistance: {horizontal: 300},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#EB3695'},//导航栏的样式
        headerTitleStyle: {//导航栏文字的样式
            color: 'white',
            //设置标题的大小
            fontSize: 16,
            //居中显示
            alignSelf: 'center',
        },
        //tab 的属性
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./images/ic_home.png')}
                style={[{height: 24, width: 24},{tintColor:tintColor}]}/>
        ),

    },
},

ShopCar: {
  screen: Cart,
  navigationOptions: {
      //stackNavigator的属性
      headerTitle: '购物车',
      gestureResponseDistance: {horizontal: 300},
      headerBackTitle: null,
      headerStyle: {backgroundColor: '#EB3695'},//导航栏的样式
      headerTitleStyle: {//导航栏文字的样式
          color: 'white',
          //设置标题的大小
          fontSize: 16,
          //居中显示
          alignSelf: 'center',
      },
      //tab 的属性
      tabBarLabel: '购物车',
      tabBarIcon: ({tintColor}) => (
          <Image
              source={require('./images/ic_shop_car.png')}
              style={[{height: 24, width: 24},{tintColor:tintColor}]}
          />
      ),
  }
},
Type: {
    screen: OrderScreen,
    navigationOptions: {
        //stackNavigator的属性
        headerTitle: '订单',
        gestureResponseDistance: {horizontal: 300},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#EB3695'},//导航栏的样式
        headerTitleStyle: {//导航栏文字的样式
            color: 'white',
            //设置标题的大小
            fontSize: 16,
            //居中显示
            alignSelf: 'center',
        },
        //tab 的属性
        tabBarLabel: '订单',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./images/ic_type.png')}
                style={[{height: 24, width: 24},{tintColor:tintColor}]}
            />
        ),
    }
},
Mine: {
    screen: Mine,
    navigationOptions: {
        //stackNavigator的属性
        headerTitle: '我的',
        gestureResponseDistance: {horizontal: 300},
        headerBackTitle: null,
        headerStyle: {backgroundColor: '#EB3695'},//导航栏的样式
        headerTitleStyle: {//导航栏文字的样式
            color: 'white',
            //设置标题的大小
            fontSize: 16,
            //居中显示
            alignSelf: 'center',
        },
        //tab 的属性
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./images/ic_me.png')}
                style={[{height: 24, width: 24},{tintColor:tintColor}]}
            />
        ),
    }
},
});

export default Index= createAppContainer(TabNavigator);