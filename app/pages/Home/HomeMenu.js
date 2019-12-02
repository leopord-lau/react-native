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
  TouchableOpacity,
  Dimensions
} from 'react-native';
const DevWidth=Dimensions.get('window').width;

export default class HomeMenu extends Component{
  constructor(props){
    super(props);
    this.state={
      menuIndex:0
    }
    this.jumpTo1=this.jumpTo1.bind(this)
    this.click=this.click.bind(this)
  }
  jumpTo1(){
    console.log('click')
    this.props.onClick({url:'Shops'})
  }
  click(){
    console.log('clicked')
    this.props.onClick()
  }
  render(){
    return(
      <TouchableOpacity style={styles.menu} onPress={()=>this.jumpTo1()}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                    pagingEnabled={true} onMomentumScrollEnd={(e)=>this.slideMenu(e)}
        >
          <FlatList  data={this.props.listData[0]} style={styles.menuList}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem={this.renderMenuItem} numColumns={5}
                    columnWrapperStyle={styles.menuColumn}
          />
          <FlatList data={this.props.listData[1]} style={styles.menuList}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem={this.renderMenuItem} numColumns={5}
                    columnWrapperStyle={styles.menuColumn}
          />
        </ScrollView>
        <View style={styles.indicateBar}>
          {/*渲染底部指示标签点*/}
          {this.renderIndicate()}
        </View>
      </TouchableOpacity>
    )
  }
  
  renderIndicate(){
    let jsx=[];
    let color='';
    for (let i=0;i<this.props.listData.length;i++){
      //判断是否为当前页，若为当前页则指示点color为蓝色，否则为白色
      color=(i===this.state.menuIndex)?'#7cff7e':'#9c9c9c';
      jsx.push(<Text key={i} style={{fontSize:15,color:color}}>●</Text>)
    }
    return jsx;
  }
  slideMenu(e){
    let offset=e.nativeEvent.contentOffset.x;           //获取x偏移量
    let index=Math.floor(offset/DevWidth);              //通过偏移量计算出当前页码
    this.setState({
      menuIndex:index
    })
  }
  renderMenuItem(rowData){
    /*
    console.log(url1.length)
    var url2=url1.splice(0,1)
    var url3=url2.splice(url1.length-1,1)
    console.log('url :',url)
    console.log('url1: ',url3)
    */
    return(
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.iconItem}> 
          <Image style={styles.iconImg} source={require('../../images/h_0.png')} />
          <Text style={styles.iconTitle}>{rowData.item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  menuList:{
    width:DevWidth,
    backgroundColor:'#fff'
  },
  menuColumn:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  iconItem:{
    alignItems:'center',
    marginTop:10
  },
  iconImg:{
    width:60,
    height:60
  },
  indicateBar:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:10
  }
});