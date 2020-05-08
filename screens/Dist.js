
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { Picker } from 'native-base'
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header'
import moment from "moment";


const { height, width } = Dimensions.get('window');



export default class Home extends Component {
  constructor() {
    super()
    this.state = {
     
    }
  }

 

  componentDidMount() {
    
    let x = this.props.from.coordinate.latitude;
    let y = this.props.from.coordinate.longitude;
    let z = this.props.end.coordinate.latitude;
    let f = this.props.end.coordinate.longitude;
    console.log(x,y,z,f);
  let dis = distancee(x,y,z,f,'K')
   let disA = Number.parseFloat(dis).toFixed(3)
   this.setState({disA})

  }

  render() {

   
    return (
      <View style={{ flex: 1, alignContent: 'center', backgroundColor: '#eee' }}>
                  <StatusBar backgroundColor='#eee' barStyle="light-content" />

<ScrollView>
        <Header backButton title={'Confrim Distance'} />
        <View style={{ borderRadius: 18, backgroundColor: 'white', padding: 12, marginTop: height * .02, margin: 20, elevation: 5 }}>
            <View>
              <View style={{marginLeft:5,marginTop:13,paddingVertical:4,paddingHorizontal:9, borderRadius:10 ,backgroundColor:'white',elevation:7,alignSelf:'flex-start',width:105}}>
              <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',color:'#86d0df'}}>FROM</Text>
              </View>
              <View style={{marginLeft:6,padding:20}}>
                <Text style={{fontWeight:'bold', fontSize:19,marginBottom:5}}>Latitude : {this.props.from.coordinate.latitude}</Text>
                <Text style={{fontWeight:'bold', fontSize:19}}>Longitude : {this.props.from.coordinate.longitude}</Text>
              </View>
            </View>
            <View>
              <View style={{marginLeft:5,marginTop:9,paddingVertical:4,paddingHorizontal:9, borderRadius:10 ,backgroundColor:'white',elevation:7,alignSelf:'flex-start',width:100}}>
              <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',color:'#86d0df'}}>TO</Text>
              </View>
              <View style={{marginLeft:6,padding:20}}>
                <Text style={{fontWeight:'bold', fontSize:19,marginBottom:5}}>Latitude : {this.props.end.coordinate.latitude}</Text>
                <Text style={{fontWeight:'bold', fontSize:19}}>Longitude : {this.props.end.coordinate.longitude}</Text>
              </View>
            </View>
        </View>
        <View style={{ borderRadius: 18, backgroundColor: 'white', padding: 12, marginTop: 2, margin: 22, elevation: 5 }}>
            <View>
              <View style={{marginLeft:5,marginTop:13,paddingVertical:4,paddingHorizontal:9, borderRadius:10 ,backgroundColor:'#86d0df',elevation:7,alignSelf:'center'}}>
              <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',color:'#f2f2f2'}}>DISTANCE</Text>
              </View>
              <View style={{padding:25}}>
                <Text style={{fontWeight:'bold', fontSize:19,marginBottom:3,textAlign:'center'}}>{this.state.disA} Kilometers</Text>
              </View>
            </View>
           
        </View>
        <TouchableOpacity
        onPress={() =>{
          Actions.Home({distance:this.state.disA});
         }}
              style={{marginBottom:5,marginTop:15,paddingVertical:10,paddingHorizontal:130, backgroundColor: '#33b3cc', borderRadius: 13, padding: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>Confirm</Text>
            </TouchableOpacity>
            </ScrollView>
      </View>
    );
  };
}

function distancee(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
const styles = StyleSheet.create({

  inputText: {
    color: '#000000',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'normal',
    marginTop: height * .05
  },

});
