'use strict';
import React from 'react'
//var Util = require('../util/util');
//var Global = require('../util/global');
//var API = require('../network/api');
//var Loading = require('./loading');
import Loading from '../../component/Loading'
import {
  	StyleSheet,
  	View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import ListView from 'deprecated-react-native-listview'
import NavBar from '../../component/NavBar'
import Button from '../../component/Button'
export default class Cart extends React.Component{
  constructor(){
      super()
      this.state={
          cartList:{
        dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
        loaded:true,
      },
      }
  }
  componentDidMount(){
    this._fetchData();
  }
  _fetchData(){
    var thiz = this;

    var thizDataSource = thiz.state.cartList.dataSource;
    this.setState({
      cartList:{
        dataSource:[
          {
        default_image:"https://cube.elemecdn.com/1/ea/5f30f4586a1b4ac4e9267a5eca304jpeg.jpeg",
        goods_name:'宫保鸡丁',
        shichang:'100',
        quantity:'1',
          },
          {
            default_image:"https://cube.elemecdn.com/1/ea/5f30f4586a1b4ac4e9267a5eca304jpeg.jpeg",
            goods_name:'宫保鸡丁',
            shichang:'100',
            quantity:'1',
              },
              {
                default_image:"https://cube.elemecdn.com/1/ea/5f30f4586a1b4ac4e9267a5eca304jpeg.jpeg",
                goods_name:'宫保鸡丁',
                shichang:'100',
                quantity:'1',
                  }
        ]
      ,
      loaded:true
      }
      
    })
    /*
    Util.post(API.CARTLIST,Global.user,
      function (ret){
        if(ret.code==0&&ret.data.length>0){
          thiz.setState({
            cartList:{
              dataSource: thizDataSource.cloneWithRows(ret.data),
              loaded:true,
            },
          });
        }
      });
      */
  }
  /*
   _renderCartList(rowData, sectionID, rowID){
    var products = rowData.products;
    var procuctsView = [];
    for(var i = 0; i < products.length; i++){
      var item = products[i];
      procuctsView.push(
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.default_image }} />
            <View style={{flex:1}}>
              <Text style={{flex:1}}>{item.goods_name}</Text>
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Text style={{color:'#f28006',flex:1}}>{item.shichang}</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image style={{height:25,width:25}} source={require("../../images/h_1.png")}/>
                  <Text style={{color:'#f28006',paddingLeft:10,paddingRight:10}}>{item.quantity}</Text>
                  <Image style={{height:25,width:25}} source={require("../../images/h_1.png")}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
        </View>
        );
    };
    return(
      <View style={{marginBottom:15,backgroundColor:'#ffffff',}}>
        <View style={styles.line}/>
        <View style={{justifyContent:'center',height:45,paddingLeft:15}}>
          <Text style={{color:'#333333'}}>{rowData.store.title}</Text>
        </View>
         <View style={styles.line}/>
         {procuctsView}
      </View>
      );
  }

  render() {
    if(!this.state.cartList.loaded){
        return <Loading loadingtext='正在购物车数据...'/>
    };
    
    return (
      <View style={styles.container}>
        <ListView
          style={{}}
          dataSource={this.state.cartList.dataSource}
          renderRow={this._renderCartList}/>
      </View>
    )
  }
  */
  render(){
    let item={
      default_image:"https://cube.elemecdn.com/1/ea/5f30f4586a1b4ac4e9267a5eca304jpeg.jpeg",
        goods_name:'宫保鸡丁',
        shichang:'21',
        quantity:'1',
    }
    let item2={
        id:'1029920190209100003',
        goods_name:'鱼香茄子',
        subTitle:'酸辣，醋溜，如有特别，请备注',
        default_image:'https://cube.elemecdn.com/2/56/205ec57c88ce99127fccf8e35d9e8jpeg.jpeg',
        monthSale:'312',
        praise:'100%',
        shichang:'29',
        quantity:'1'
    }
    return(
      <ScrollView style={{marginBottom:15,backgroundColor:'#ffffff',}}>
        <NavBar
          title='购物车'
        />
         <View style={styles.line}/>
         <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.default_image }} />
            <View style={{flex:1}}>
              <Text style={{flex:1}}>{item.goods_name}</Text>
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Text style={{color:'#f28006',flex:1}}>{item.shichang}</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <TouchableOpacity >
                  <Text style={{backgroundColor:'#fff',textAlign:'center',
                    fontWeight:'500',color:'#4398ff',fontSize:24,borderRadius:10.5,borderColor:'#4398ff',borderWidth:2,overflow:'hidden',
                    height:21,width:21,lineHeight:24,}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{color:'#f28006',paddingLeft:10,paddingRight:10}}>{item.quantity}</Text>
                  <TouchableOpacity >
                  <Text style={{backgroundColor:'#fff',textAlign:'center',
                    fontWeight:'500',color:'#4398ff',fontSize:24,borderRadius:10.5,borderColor:'#4398ff',borderWidth:2,overflow:'hidden',
                    height:21,width:21,lineHeight:24,}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item2.default_image }} />
            <View style={{flex:1}}>
              <Text style={{flex:1}}>{item2.goods_name}</Text>
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Text style={{color:'#f28006',flex:1}}>{item2.shichang}</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity >
                  <Text style={{backgroundColor:'#fff',textAlign:'center',
                    fontWeight:'500',color:'#4398ff',fontSize:24,borderRadius:10.5,borderColor:'#4398ff',borderWidth:2,overflow:'hidden',
                    height:21,width:21,lineHeight:24,}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{color:'#f28006',paddingLeft:10,paddingRight:10}}>{item2.quantity}</Text>
                  <TouchableOpacity >
                  <Text style={{backgroundColor:'#fff',textAlign:'center',
                    fontWeight:'500',color:'#4398ff',fontSize:24,borderRadius:10.5,borderColor:'#4398ff',borderWidth:2,overflow:'hidden',
                    height:21,width:21,lineHeight:24,}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
        </View>
        <View style={[{flexDirection:'row',alignItems:'center',backgroundColor:'#3D3D3F',height:44,marginTop:320}]}>
                <View style={{backgroundColor:'#4398ff',zIndex:1000, position:'absolute',top:-15,left:20,height:70,
                    width:70,borderWidth:10,borderColor:'#3b3b3b',borderRadius:40}}>
                    {
                        /*角标*/
                        //this.props.data&&this.props.data.badge>0&&
                        <Text style={{position:'absolute',top:-10,right:-5,height:18,lineHeight:18,paddingLeft:6,
                        paddingRight:6,textAlign:'center',color:'#fff',fontSize:14,
                        borderRadius:9,overflow:'hidden',backgroundColor:'red'}}>{'2'}</Text>
                    }
                    {/*购物车图片*/}
                    <Image style={{width:30,height:30,position:'absolute',left:'50%',top:'50%',marginLeft:-15,marginTop:-15}}
                           source={require(`../../images/ic-gouwuche-normall.png`)}
                    />
                </View>
                <View style={{width:'100%',height:'100%',paddingLeft:100,paddingRight:120,paddingTop:5,justifyContent:'center',paddingBottom:10}}>
                    {/**合计*/}
                    <Text style={{fontSize:16,color:'#fff'}}>
                        {'￥50'}
                    </Text>
                    {
                        //this.props.data&&this.props.data.total>0&&
                            <Text style={{fontSize:12,color:'#bbb',marginTop:3}}>{'免费配送'}</Text>
                    }
                </View>
                <TouchableOpacity
                                  style={{zIndex:1001, position:'absolute',alignItems:'center',justifyContent:'center',
                                      right:0,bottom:0,height:'100%',width:120,backgroundColor:'#2CA853'}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'500'}} >{'去结算'}</Text>
                </TouchableOpacity>
            </View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eef0f3',
    paddingBottom:68,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height:90,
    justifyContent: 'center',
  },
  line:{
    backgroundColor:'#eef0f3',
    height:1,
  },
});
