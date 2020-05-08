
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
  ScrollView,
  FlatList
} from 'react-native';
import { Picker } from 'native-base'
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../component/Header'
import moment from "moment";
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIndicator from '../component/LoadingIndicator';


const { height, width } = Dimensions.get('window');



export default class First extends Component {
  constructor() {
    super()
    this.state = {
      doneFetching: false,
    }
  }

  async componentDidMount() {

    let x = [];
    //let f = this.props.info;


    await AsyncStorage.getItem('info').then(async (info) => {
      let v = await JSON.parse(info);
      this.setState({ info: v }, () => {

        this.setState({ doneFetching: true })

      })



    })



  }
  // async componentDidMount() {
  //   let x = [];
  //   let f = this.props.info;


  //   await AsyncStorage.getItem('info').then((info) => {
  //     if (info == null || info == '') {
  //       x.push(f)
  //       AsyncStorage.setItem('info', JSON.stringify(x))
  //       this.setState({info:x})

  //       // this.setState({doneFetching: true})
  //     }
  //     else {

  //       let v = JSON.parse(info);
  //       v.push(f)
  //     AsyncStorage.setItem('info', JSON.stringify(v))
  //     this.setState({info:v})
  //     // this.setState({doneFetching: true})


  //         }



  //   })



  // }

  render() {

    if (!this.state.doneFetching)
      return (<LoadingIndicator size="large" />);

    if (this.state.info != null) {
      return (
        <View style={styles.basicBackground}>

          <StatusBar backgroundColor='black' barStyle="light-content" />

          <Header title={'History Shipments'} styleee={{ flex: 28 }} />

          <FlatList
            data={this.state.info}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            extraData={this.state}
            keyExtractor={(item, index) => `${index}`}

            style={{ width: '100%', backgroundColor: '#cccccc' }}
            renderItem={
              ({ item, index }) =>
                <View>
                  <TouchableOpacity onPress={() => {
                    if (item.ship == 'Other') {
                      alert(item.note)
                    }
                  }}
                    style={{ marginTop: 5, borderRadius: 18, elevation: 5, padding: 6, elevation: 2, backgroundColor: 'white', width: width * .95, alignSelf: 'center', marginBottom: 6 }}>
                    <View style={{ justifyContent: 'center', marginBottom: 5, padding: 7 }}>
                      <Text style={{ fontWeight: 'bold', color: '#288fa4', fontSize: 22, elevation: 5, marginBottom: 7 }}>Shipment {index + 1}</Text>
                      <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 5 }}>Type of ship : {item.ship}</Text>
                      {(item.ship === 'Bulks Ships' || item.ship === 'Container Ships' || item.ship === '') &&
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 5 }}>Type of Cargo : {item.cargo}</Text>
                      }
                      <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginBottom: 5 }}>Price : {item.price} EGP</Text>

                      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', marginTop: 6 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>{item.no} Tons</Text>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>{item.distance} Kilometer</Text>
                      </View>

                      <Text style={{ fontWeight: 'bold', color: '#288fa4', fontSize: 16, marginTop: 7, textAlign: 'center' }}>Date : {item.date}</Text>
                    </View>
                  </TouchableOpacity>

                </View>

            }
          >
          </FlatList>
          <TouchableOpacity style={{ padding: 5, position: 'absolute', top: height * .75, alignSelf: 'flex-end', borderRadius: 35, backgroundColor: '#86d0df', elevation: 5, right: 15 }} onPress={() => Actions.Map()}>
            <MaterialIcons
              name={"add"}
              size={44}
              style={{
                color: "white",
                alignSelf: "flex-start",
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <>

          <StatusBar backgroundColor='black' barStyle="light-content" />

          <Header title={'History Shipments'} styleee={{ flex: 28 }} />
          <View>

            <View style={{ alignContent: 'center', alignSelf: 'center', paddingVertical: 4, paddingHorizontal: 9, borderRadius: 18, backgroundColor: '#86d0df', elevation: 10, justifyContent: 'center', marginTop: height * .4, opacity: 2 }}>

              <Text
                style={{
                  fontSize: 35,
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                No Old Shipments
            </Text>
            </View>
            <TouchableOpacity style={{ padding: 5, position: 'absolute', top: height * .75, alignSelf: 'flex-end', borderRadius: 35, backgroundColor: '#86d0df', elevation: 5, right: 15 }} onPress={() => Actions.Map()}>
              <MaterialIcons
                name={"add"}
                size={44}
                style={{
                  color: "white",
                  alignSelf: "flex-start",
                }}
              />
            </TouchableOpacity>
          </View>
        </>
      );
    }
  };
}


const styles = StyleSheet.create({

  inputText: {
    color: '#cccccc',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'normal',
    marginTop: height * .05
  },
  basicBackground: {
    flex: 1,
    backgroundColor: '#cccccc',
    height: '100%',
    width: '100%',

  },

});
