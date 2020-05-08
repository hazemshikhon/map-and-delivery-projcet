
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../component/Header'
import MapView, { Marker, ProviderPropType, AnimatedRegion, Animated } from 'react-native-maps';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width, height } = Dimensions.get('window');



let id = 0;




export default class Map extends Component {
  constructor() {
    super()
    this.state = {
      region: {
        latitude: 31.21564,
        longitude: 29.95527,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      markers: [],
     start:'',
      end:'',
      msg:'Choose Your  First Location',
      showAlert: false
  }
    this.onMapPress = this.onMapPress.bind(this);
  }
  onMapPress = (e) => {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    } , ()=> console.log(this.state.markers));
      
          

  }

  onMapPress = (e) => {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    } , ()=> console.log(this.state.markers));
      
          

  }
  onMapPresss = (e) => {
   if(this.state.start === ''  ){
        this.setState({
          start :{
          coordinate : e.nativeEvent.coordinate,
          key: 1
          },
          msg:'Choose Your Second Location'
        }
        )
   }
   else if (this.state.end === '')
   {
    this.setState({
      end :{
      coordinate : e.nativeEvent.coordinate,
      key: 2
      }
    }, ()=> console.log('tw',this.state.start,this.state.end)
    )
   }

  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  
  render() {

    
    return (
      <View style={{ flex:1, alignContent: 'center', backgroundColor: '#eee'  }}>
        
        <Header backButton title={'Map'}/>
       <View>
       
        <MapView
            provider={this.props.provider}
            style={styles.map}
            initialRegion={this.state.region}
            followsUserLocation={true}
            zoomEnabled={true}
             onPress={ (e) => this.onMapPresss(e)}> 
             

            {/* {this.state.start.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                
              />
            ))} */}
            {this.state.start != '' &&
            <Marker
            key={this.state.start.key}
            coordinate={this.state.start.coordinate}
            
          />
            
            }
             {this.state.end != '' &&
            <Marker
            key={this.state.end.key}
            coordinate={this.state.end.coordinate}
            
          />
            
            }
          </MapView>
          <View  style={{top:5,alignSelf:'center',paddingVertical:4,paddingHorizontal:9,position:'absolute', borderRadius:10 ,backgroundColor:'#86d0df',elevation:7}}>
          <Text style={{fontSize:23 ,color:'white'}}>{this.state.msg}</Text>
          
          </View>
          <TouchableOpacity
              onPress={() =>{
                if(this.state.start == '' || this.state.end == '' ){
                  this.showAlert()
                }
                else 
               {Actions.Dist({from:this.state.start,end:this.state.end});}
               
              }}
              style={{position:'absolute',top:height*.81, backgroundColor: '#33b3cc', borderRadius: 13, padding: 8, alignItems: 'center', justifyContent: 'center', width: width * .8, alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Next</Text>
            </TouchableOpacity>
            <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Alert"
          message="Please Select Start And End Location!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
          </View>
        
          

      </View>
    );
  };
}

const styles = StyleSheet.create({

  inputText: {
    color: '#000000',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'normal',
    marginTop: height * .05
  },
  map: {
    height: '100%',
    width: width,
  },
});
