
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import ShopHeaderView from '../ShopDetail/ShopHeaderView';
import ShopIndexView from '../ShopDetail/ShopIndexView'
import {queryFoods} from '../../mock/SellerFoodsJSON'
import TabFoodsManager from '../Goods/TabFoodsManager'
import Button from '../../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import px2dp from '../../util'

const  TabsBarHeight =  35;
export  default class Operation extends React.Component {
    constructor(props){
        super(props)
        this.state={
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
            foods:[],
            recommends:[],
            statusBarHeight: 20,
            foodListScrollEnabled:false,
        }
        this.add=this.add.bind(this)
    }
    add(){
        this.props.callbackAdd()
    }
    componentDidMount(){
        this.setState({
            foods:queryFoods(),
        });
    }
    render() {
        this.RecommendsHeight = 0
        this.FoodListHeight =  Dimensions.get('screen').height-this.state.statusBarHeight-TabsBarHeight;


        this.HorizontalScrollHeight = Dimensions.get('screen').height-this.state.statusBarHeight-TabsBarHeight + this.RecommendsHeight;
        return (
            <ScrollView syle={{flex:1}}>
                <ShopHeaderView backgroundImage={this.state.sellerDetails&&this.state.sellerDetails.backgroundImage}
                    image={this.state.sellerDetails&&this.state.sellerDetails.image}/>
                <ShopIndexView sellerDetails={this.state.sellerDetails}/>
                <View style={{height:5,marginTop:5,backgroundColor:'#fff'}}>
                </View>
                <Button style={{marginTop: 20, marginHorizontal: 16, borderRadius: 6, overflow:"hidden"}} >
          <View style={{height: px2dp(45),flexDirection:"row", backgroundColor: "#fff", flex: 1, alignItems:"center", justifyContent: "center"}}>
            <Text style={{color: "#0096ff", fontSize: px2dp(14), marginLeft: 8}} onPress={()=>this.add()}>{"新增商品"}</Text>
          </View>
        </Button>
                <View style={{height:5,marginTop:5,backgroundColor:'#fff'}}>
                </View>
                <TabFoodsManager
                                RecommendsHeight={this.RecommendsHeight}
                                ListHeight={this.FoodListHeight}
                                style={{width:Dimensions.get('screen').width}}
                                foodListScrollEnabled={this.state.foodListScrollEnabled}
                                foodListOnScroll={({nativeEvent:{contentOffset: { x, y }}})=>{
                                    this.setState({foodListScrollEnabled:y>0});
                                }}
                                recommends={this.state.recommends}
                                foods={this.state.foods}
                                ///获取foodList的引用
                                forwardFoodListRef={(elenment)=>{
                                    this.foodList =  elenment;
                                    }}
                            />
            </ScrollView>
        );
    }

}