import React from 'react';
import {
    View,
    Text,
    FlatList,
    RefreshControl,
} from 'react-native';
import  OrderItemView from './OrderItemView'
import  queryMyOrder from '../../mock/OrdersjSON'
import FooterRefreshControl,{FooterRefreshControlState} from "../../component/RefreshFooterControl";
//import {createStackNavigator} from 'react-navigation-stack'
import OrderRemark from './OrderRemark'
let navigation={};
export default class OrderScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            headerRefreshing:false,
            headerRefreshTitle:'下拉刷新',
            footerRefreshState:FooterRefreshControlState.EndRefreshing,
            dataSource:[],
            pageIndex : 0,
            pageSize : 8,
            showRemark:false
        };
    };
    callbackOrder=()=>{
        this.setState({
            showRemark:false
        })
    }
    render () {
        return (
            <View style={{ flex: 1, backgroundColor:'fff'}}>
                {
                    this.state.showRemark?
                    <OrderRemark callbackOrder={this.callbackOrder}/>:
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={({item,index}) => <OrderItemView model={item} listOnPressItem={this.listOnPressItem}/>}
                    keyExtractor={(item, index)=>index+''}
                    ItemSeparatorComponent = {()=>(<View style={{height:1,backgroundColor:'#fff'}}><View style={{height:0.5,marginLeft:15,backgroundColor:'#eee'}}/></View>)}
                    //有订单数据才显示头部标题
                    ListHeaderComponent={this.state.dataSource.length>0&&<Text style={{height:50,padding:15,color:'#444',fontSize:20,fontWeight:'bold'}}>我的订单</Text>}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.headerRefreshing}
                        onRefresh={()=>this.listRefreshData()}
                        title={this.state.headerRefreshTitle}
                        />
                    }
                    onEndReached={(info)=>{this.listOnEndReached(info)}}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={<FooterRefreshControl
                          state={this.state.footerRefreshState}
                      />}
                />
                }
            </View>

        );

    }

    componentDidMount() {

        this.listRefreshData()
    }

    listOnPressItem=()=>{
        this.setState({
            showRemark:true
        })
        //this.props.navigation.push('Details',this.state.dataSource[index]);
    }

    listOnEndReached (info){

        this.setState((state, props) => ({
            pageIndex:state.pageIndex+1,
            footerRefreshState :FooterRefreshControlState.Refreshing,
        }));
        this.listLoadMore();
    }

    listRefreshData() {



        this.setState({
            headerRefreshing : true,
            footerRefreshState:FooterRefreshControlState.EndRefreshing,
            headerRefreshTitle:'正在刷新...',
            pageIndex:0,
        });

        ///模拟网络延迟加载
        setTimeout(()=>{

            let result = queryMyOrder(this.state.pageIndex,this.state.pageSize);
            this.setState((state, props) => ({
                dataSource:result,
                headerRefreshing :false,
                headerRefreshTitle:'下拉刷新',
                pageIndex:state.pageIndex+1,

            }));

        },2000);

    }

    listLoadMore() {
        console.log('==>loadMore');

        ///模拟网络延迟加载
        setTimeout(()=>{

            let result = queryMyOrder(this.state.pageIndex,this.state.pageSize);
            if(result.length>0){
                console.log('==>EndRefreshing');
                this.setState((state, props) => ({
                    dataSource: state.dataSource.concat(result),
                    footerRefreshState :FooterRefreshControlState.EndRefreshing,
                    pageIndex:state.pageIndex+1,
                }));
            }else {
                this.setState((state, props) => ({
                    footerRefreshState :FooterRefreshControlState.NoMoreData,
                }));
            }
        },2000);


    }

};
/*
export default OrderStack =createStackNavigator(  //将所有的navigator放置一起
    {
      Order:{screen:OrderScreen},
      Remark:{screen:OrderRemark},
    },
  )
  */