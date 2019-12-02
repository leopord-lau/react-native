import React from 'react';
import {View,ScrollView,StyleSheet,SafeAreaView,StatusBar,Text,Platform,Dimensions} from 'react-native';

import ShopHeaderView from '../ShopDetail/ShopHeaderView';
import ShopIndexView from '../ShopDetail/ShopIndexView';
import ShopTabs from '../ShopDetail/ShopTabs';
import TabSellerInfoView from '../ShopDetail/TabSellerInfoView';
import TabFoodsView from '../ShopDetail/TabFoodsView';
import TabEvaluateView from '../ShopDetail/TabEvaluateView';
import ShopTrolleyBar from '../ShopDetail/ShopTrolleyBar';
import EditAddress from '../Address/EditAddress'

import {queryRecommends,queryFoods} from '../../mock/SellerFoodsJSON'


const  TabsBarHeight =  35;
export  default class ShopScreen1 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            statusBarHeight: 20,
            statusBarStyle: 'light-content',
            sellerDetails:{
                image:'https://cube.elemecdn.com/b/b5/1cfd09539c63113f198296c0e9234png.png',
                backgroundImage:'https://cube.elemecdn.com/1/bb/be3cd75f2fa4c401d37791cda4256png.png',
                sellerName:'荣味家大食堂',
                score:'4.9',
                monthSale:'1120',
                sendOutUp:'15.00',
                shippingFee:'5.00',
                distance:'2km',
                sendTime:'35分钟',
                isBrand:true,
                tags:['其他快餐','品质联盟','川湘菜'],
                activitys:[
                    {
                        type:3,// 特
                        content:'特价商品11元起'
                    },
                    {
                        type:0,//减
                        content:'满35减10，满55减20'
                    },
                    {
                        type:1, //折
                        content:'折扣商品5折起'
                    },
                    {
                        type:2,// 首
                        content:'新用户下单立减17元'
                    },
                ],
                tickes :[{id:'00h9-032n-32x5-009x',money:8,type:0,condition:'无门槛'},
                         {id:'098x-556x-44e4-65d6', money:10,type:1,condition:'满58可用'}],
                notice:'公告：亲爱的顾客，感谢您的光临，如需发票，多饭，换汤等，均可提交订单时备注，小伙伴会即时为您处理的哦！祝您用餐愉快！'
        
            },
            tabsIndex : 0,
            tabsBarFixed:false,
            foodListScrollEnabled:false,
            recommends:[],
            foods:[],
            shopTrolleyFoods:[],
            shopTrolleyData:{
                badge:0,   //角标
                shippingFee:'', //配送费
                total:0,   //总价格
                sendOutUp:0  ///起送价
            },
            showOrder:false
        };
        this.setTabHorizontalScrollRef = element => {
            this.tabHorizontalScroll = element;
        };

    }


    static navigationOptions =  ({ navigation }) => {
        ///*****导航栏透明 需要同时设置 headerTransparent:true 和 backgroundColor:'rgba(255,255,255,0)' 才有效
        let headerOpaque = navigation.getParam('headerOpaque');
        return {
            headerTransparent:true,
            headerTintColor: headerOpaque?'#333':'#fff',
            title:headerOpaque&&navigation.getParam('sellerName'),
            headerStyle:{
                backgroundColor:`rgba(255,255,255,0)`
            },
        };
    };
    render () {

        ///推荐商家栏高度
        this.RecommendsHeight = this.state.recommends&&this.state.recommends.length>0?170:0;
        ///商品列表栏高度
        this.FoodListHeight =  Dimensions.get('screen').height-this.state.statusBarHeight-TabsBarHeight;


        this.HorizontalScrollHeight = Dimensions.get('screen').height-this.state.statusBarHeight-TabsBarHeight + this.RecommendsHeight;

        if(Platform.OS==='android'){
            this.HorizontalScrollHeight-=this.state.statusBarHeight;
            this.FoodListHeight-=this.state.statusBarHeight;
        }
/**
 * {
                    !this.state.showOrder?
                    <View><EditAddress /></View>
                    :
 */
        return (
            this.state.showOrder?
            <EditAddress />:
            <View style={{flex: 1, backgroundColor:'#4398ff'}}>
                    <StatusBar barStyle={this.state.statusBarStyle} />
                    <View style={{zIndex:99,position:'absolute',top:0,left:0,right:0,height:this.state.statusBarHeight,
                        backgroundColor:`rgba(255,255,255,${this.props.navigation.getParam('headerOpaque')?1:0})`}}/>
                    {
                        this.state.tabsBarFixed&&
                        <ShopTabs
                            style={{zIndex:999,height:TabsBarHeight,position:'absolute',left:0,top:this.state.statusBarHeight,right:0}}
                            items={['点餐','评价','商家']}
                            currentIndex={this.state.tabsIndex}
                            tabsPressed={(index)=>{this.tabsPressed(index)}}
                        />
                    }
                    <ScrollView style={{flex:1}}
                            onScroll={(e)=>{this.mainOnScroll(e)}} scrollEventThrottle={10}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                    >
                        <ShopHeaderView
                            backgroundImage={this.state.sellerDetails&&this.state.sellerDetails.backgroundImage}
                            image={this.state.sellerDetails&&this.state.sellerDetails.image}
                        />
                        <ShopIndexView sellerDetails={this.state.sellerDetails}/>
                        {
                            <View style={{height:TabsBarHeight,marginTop:5,backgroundColor:'#fff'}}>
                                {
                                    !this.state.tabsBarFixed&&
                                    <ShopTabs
                                        style={{height:TabsBarHeight}}
                                        items={['点餐','评价','商家']}
                                        currentIndex={this.state.tabsIndex}
                                        tabsPressed={(index)=>{this.tabsPressed(index)}}
                                    />
                                }
                            </View>
                        }
                        <ScrollView
                            ref={this.setTabHorizontalScrollRef}
                            style={{flexDirection:'row',height:this.HorizontalScrollHeight}}
                            scrollEnabled={this.state.tabsScrollScrollEnabled}
                            pagingEnabled={true}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            onMomentumScrollEnd={({nativeEvent:{contentOffset: { x, y },layoutMeasurement: { height, width }}})=>{
                            let index = parseInt(x/width+0.01) ; ///消除浮点误差
                            this.setState({tabsIndex:index});
                            }}
                        >
                            <TabFoodsView
                                RecommendsHeight={this.RecommendsHeight}
                                ListHeight={this.FoodListHeight}
                                style={{width:Dimensions.get('screen').width}}
                                foodListScrollEnabled={this.state.foodListScrollEnabled}
                                foodListOnScroll={({nativeEvent:{contentOffset: { x, y }}})=>{
                                    ///滑到顶部禁止滚动
                                    this.setState({foodListScrollEnabled:y>0});
                                }}
                                recommends={this.state.recommends}
                                foods={this.state.foods}
                                ///获取foodList的引用
                                forwardFoodListRef={(elenment)=>{
                                    this.foodList =  elenment;
                                    }}
                                recommendsReduceButtonOnPress={(index)=>{this._recommendsReduceButtonOnPress(index)}}
                                ///商家推荐-加点击
                                recommendsAddButtonOnPress={(index)=>{this._recommendsAddButtonOnPress(index)}}
                                ///food列表-减点击
                                foodListReduceButtonOnPress={(index, section)=>{this._foodListReduceButtonOnPress(index, section)}}
                                ///food列表-加点击
                                foodListAddButtonOnPress={(index, section)=>{this._foodListAddButtonOnPress(index, section)}}
                            />
                            {/*评价*/}
                            <TabEvaluateView style={{ backgroundColor:'#761',width:Dimensions.get('screen').width}}/>
                            {/*商家*/}
                            <TabSellerInfoView style={{ backgroundColor:'#877',width:Dimensions.get('screen').width}}/>
                        </ScrollView>
                    </ScrollView>
                    {
                        /*工具栏*/
                        this.state.tabsIndex===0&&
                        <ShopTrolleyBar callbackOrder={this.callbackOrder} data={this.state.shopTrolleyData} style={{zIndex:1000,position:'absolute',left:0,bottom:0,height:55}}/>
                    }
            </View>
        );
    }
    callbackOrder=()=>{
        this.setState({
            showOrder:true
        })
    }

    ///加入购物车操作
    ///商家推荐-减点击
    _recommendsReduceButtonOnPress(index){

       let item = this.state.recommends[index];
        if(item.buyCount&&item.buyCount>0){
            item.buyCount-- ;

        }else {
            item.buyCount=0;
        }


        ///更新状态
        this.setState((state,props)=>({
            shopTrolleyData:{
                total:state.shopTrolleyData.total-parseFloat(item.price),
                badge:state.shopTrolleyData.badge-1,
                //shippingFee:parseFloat(state.sellerDetails.shippingFee),
                //sendOutUp:parseFloat(state.sellerDetails.sendOutUp),
            },
            recommends:state.recommends
        }));



    }
    ///商家推荐-加点击
    _recommendsAddButtonOnPress(index){
        let item = this.state.recommends[index];

        if(!item.buyCount){
            item.buyCount=1;
        }else {
            item.buyCount++;
        }
        console.log(item.price)
        ///更新状态
        this.setState((state,props)=>({
            shopTrolleyData:{
                total:state.shopTrolleyData.total+parseFloat(item.price),
                badge:state.shopTrolleyData.badge+1,
                //shippingFee:parseFloat(state.sellerDetails.shippingFee),
                //sendOutUp:parseFloat(state.sellerDetails.sendOutUp),
            },
            recommends:state.recommends
        }));
    }
    /// food列表-减点击
    _foodListReduceButtonOnPress(index, section){

        let item = section.data[index];
        if(item.buyCount&&item.buyCount>0){
            item.buyCount-- ;
        }else {
            item.buyCount=0;
        }
        ///更新状态
        this.setState((state,props)=>({
            shopTrolleyData:{
                total:state.shopTrolleyData.total-parseFloat(item.price),
                badge:state.shopTrolleyData.badge-1,
                //shippingFee:parseFloat(state.sellerDetails.shippingFee),
                //sendOutUp:parseFloat(state.sellerDetails.sendOutUp),
            },
            foods:state.foods
        }));


    }
    ///food列表-加点击
    _foodListAddButtonOnPress(index, section){
        let item = section.data[index];
        if(!item.buyCount){
            item.buyCount=1;
        }else {
            item.buyCount++;
        }


        ///更新状态
        this.setState((state,props)=>({
            shopTrolleyData:{
                total:state.shopTrolleyData.total+parseFloat(item.price),
                badge:state.shopTrolleyData.badge+1,
                //shippingFee:parseFloat(state.sellerDetails.shippingFee),
                //sendOutUp:parseFloat(state.sellerDetails.sendOutUp),

            },
            foods:state.foods
        }));

    }


    ///tabs点击
    tabsPressed(index){
        ///更新状态
        this.setState({tabsIndex:index});
        //切换tab内容
        this.tabHorizontalScroll.scrollTo({x: index*Dimensions.get('screen').width, y: 0, animated: true});
    }
    ///主srcoll滑动监听
    mainOnScroll({ nativeEvent: { contentOffset: { x, y },contentSize: { height, width }}}){

        ///导航头部不透明
        let  headerOpaque = y+this.state.statusBarHeight//y>Device.NavigationBarHeight+this.state.statusBarHeight;

        this.props.navigation.setParams({
            headerOpaque:headerOpaque
        });

        let  distance =  height-Dimensions.get('screen').height-1;

        if (Platform.OS==='android'){
            distance =  height-(Dimensions.get('screen').height -this.state.statusBarHeight)-1;
        }

        this.setState({
            statusBarStyle:headerOpaque?'dark-content':'light-content'
        });
        
        /// 有浮点小数误差用1补偿
        
        ///bool 量
        let  foodListScrollEnabled =  y>=distance;
        let  tabsBarFixed =  y>=distance-this.RecommendsHeight;
        console.log(this.state.statusBarHeight);
        console.log(distance+'----->'+y);
        ///主srcoll 滑到底部时 允许foodList滑动 反之不允许
        this.setState({foodListScrollEnabled:foodListScrollEnabled});
        ///tabs 吸顶固定
        this.setState({tabsBarFixed:tabsBarFixed});
        /// 主srcoll 滑到底部时 foodList 让滚动到顶部
        // foodListScrollEnabled&&this.foodList.scrollToLocation({animated: true,itemIndex:0,sectionIndex:0,viewOffset:0,viewPosition:0});

    }
    componentDidMount() {
        ///订阅监听导航生命周期，设置状态栏
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus', ()=>{this.setState({statusBarStyle:'light-content'})}
        );
        this.didBlurSubscription = this.props.navigation.addListener(
            'didBlur', ()=>{this.setState({statusBarStyle:'dark-content'})}
        );
        ///获取状态栏高度
        /*
        global.statusBarManager.statusHeight((height)=>{
            this.setState({
                statusBarHeight:height
            });
        });
        */
        ///初始数据  实际开发中json数据使用网络请求实际数据
        this.setState({
            //sellerDetails:this.props.navigation.state.params,
            recommends:queryRecommends(),
            foods:queryFoods(),
            shopTrolleyData:{
                total:0,
                badge:0,
                shippingFee:parseFloat(this.props.navigation.getParam('shippingFee')),
                sendOutUp:0
            }

        });
    }
    ///移除订阅
    componentWillUnmount() {
        this.didFocusSubscription.remove();
        this.didBlurSubscription.remove();
    }
};