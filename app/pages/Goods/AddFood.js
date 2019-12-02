/**
 * @author Lei
 * @repo https://github.com/stoneWeb/elm-react-native
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  Image
} from 'react-native'
import px2dp from '../../util'
import NavBar from '../../component/NavBar'
import Button from '../../component/Button'
import Icon from 'react-native-vector-icons/Ionicons'
//FontAwesome
export default class AddFood extends Component {
  constructor(props){
      super(props)
      this.state = {
        name: "",
        phone: "",
        tag: null,
        gender: null,
        address: ""
      }
  }
  componentDidMount(){
    /*
    if(this.props.pageType == 1){
      let obj = {};
      ["name","phone","tag","gender","address","number"].forEach((item) => {
          obj[item] = this.props.data[item]
      })
      this.setState(obj)
    }*/
    //this.refs.name.focus()
  }
  submit(){

  }

  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar 
          title='新增商品'
        />
        <ScrollView>
          <View style={{marginTop: 10,backgroundColor:"#fff",paddingLeft: 16}}>
            <View style={styles.item}>
              <Text style={styles.label} onPress={()=>this.props.callbackShop()}>商品名称</Text>
              <View style={{flex: 1}}>
                <TextInput underlineColorAndroid="transparent" autoCapitalize={"none"} ref={"name"} style={styles.textInput} placeholder="食品名称" placeholderTextColor="#aaa"/>
                <View style={{paddingTop: 10, marginTop: 10, flexDirection:"row", borderTopWidth: 1, borderTopColor: "#f8f8f8"}}>
                  <Button style={{marginLeft: 10}} onPress={()=>{this.setState({gender:0})}}>
                    <Text style={[styles.radio, this.state.gender===0?styles.active:null]}>{"主食"}</Text>
                  </Button>
                  <Button style={{marginLeft: 10}} onPress={()=>{this.setState({gender:1})}}>
                    <Text style={[styles.radio, this.state.gender===1?styles.active:null]}>{"小吃"}</Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{"价格"}</Text>
              <View style={{flex: 1}}>
                <TextInput underlineColorAndroid="transparent" keyboardType={"numeric"} style={styles.textInput} placeholder="例如：￥10" placeholderTextColor="#aaa"/>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{"商品介绍"}</Text>
              <View style={{flex: 1}}>
                <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="食材、配菜" placeholderTextColor="#aaa"/>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.label}>{"商品种类"}</Text>
              <View style={{flex: 1}}>
                <TextInput underlineColorAndroid="transparent" style={styles.textInput} placeholder="例：蔬菜" placeholderTextColor="#aaa"/>
              </View>
            </View>
            <View style={[styles.item, {alignItems: "center"}]}>
              <Text style={{fontSize: px2dp(13), color:"#222", minWidth: 45}}>{"标签"}</Text>
              <View style={{flexDirection:"row", flex: 1}}>
                <Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:0})}}>
                  <Text style={[styles.radio, this.state.tag===0?styles.active:null]}>{"满减"}</Text>
                </Button>
                <Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:1})}}>
                  <Text style={[styles.radio, this.state.tag===1?styles.active:null]}>{"热门"}</Text>
                </Button>
                <Button style={{marginLeft: 10}} onPress={()=>{this.setState({tag:2})}}>
                  <Text style={[styles.radio, this.state.tag===2?styles.active:null]}>{"最新"}</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.productItem}>
                <Image
                    style={styles.productImage}
                    source={{uri:'https://cube.elemecdn.com/1/ea/5f30f4586a1b4ac4e9267a5eca304jpeg.jpeg'}}
                />
                <View style={styles.productRight}>
                    <Text>商品图片</Text>
                </View>
            </View>
          <Button style={{marginTop: 90, marginHorizontal: 16, borderRadius: 6, overflow:"hidden"}} onPress={this.submit.bind(this)}>
            <View style={{flex: 1, height: 40, backgroundColor: "#4398ff", alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: "#fff"}}>{"确定提交"}</Text>
            </View>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  active: {
    borderColor: "#81c2ff",
    color: "#0096ff"
  },
  label: {
    minWidth: 45,
    fontSize: px2dp(13),
    color:"#222",
    paddingTop: 8
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    height: 30,
    fontSize: 13,
    paddingHorizontal: 10
  },
  radio: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: px2dp(13),
    backgroundColor: "#fff"
  },

  productItem: {
    height: 80,
    flexDirection:'row',
    padding: 15,
    marginBottom: 1,
    backgroundColor:'#fff',
},
productRight: {
    flexDirection:'column',
},
productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
},
productPrice: {
    fontSize: 24,
    color: 'red',
},
productFeaturedPrice: {
    fontSize: 14,
    color: '#ddd',
},
})
