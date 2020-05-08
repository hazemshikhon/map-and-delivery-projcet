
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
import AsyncStorage from '@react-native-community/async-storage';


const { height, width } = Dimensions.get('window');


const typeOfBarges = ['Container Ships', 'Bulks Ships', 'Other'];
const Container = ['Refnegirated Products', 'General Products '];
const Bulks = ['Agricultral', 'Grains', 'Sand', 'Steel Scraps', 'Coal']
export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      typOfCargo: '',
      weight: '',
      typeOfBarges: '',
      isDateTimePickerVisible: false,
      Date: moment().format("ddd, MMMM DD YYYY"),
      price: 0.0,
    }
  }
  storeData = async (y) => {
    let x = [];
    await AsyncStorage.getItem('info').then(async (info) => {
      if (info == null || info == '') {
        x.push(y)
        console.log('x', x);

        await AsyncStorage.setItem('info', await JSON.stringify(x))
        //this.setState({doneFetching: true})
        Actions.reset('First');

      }
      else {

        let v = await JSON.parse(info);
        v.push(y)
        console.log('v', v);

        await AsyncStorage.setItem('info', await JSON.stringify(v))
        // this.setState({info:v})
        //this.setState({doneFetching: true})
        Actions.reset('First');



      }



    })
  }
  selectedPicker(x) {
    if (x === 'Bulks Ships') {
      return (
        <>
          <Picker
            mode='dropdown'
            style={{ marginTop: height * .05 }}
            onValueChange={typOfCargo => {
              this.setState({ typOfCargo })

            }}
            value={this.state.typOfCargo}
            selectedValue={this.state.typOfCargo}>

            <Picker.Item label={"Type of Cargo"} value={''} />



            {Bulks.map((val, i) => <Picker.Item key={i} value={val} label={val} />)}

          </Picker>
          <View style={{ alignSelf: 'center', borderWidth: 0.5, borderColor: 'black', width: width * .75, alignSelf: 'center' }} ></View>
        </>
      )
    }
    else if (x === 'Container Ships') {
      return (
        <>
          <Picker
            mode='dropdown'
            style={{ marginTop: height * .05 }}
            onValueChange={typOfCargo => {
              this.setState({ typOfCargo })

            }}
            value={this.state.typOfCargo}
            selectedValue={this.state.typOfCargo}>

            <Picker.Item label={"Type of Cargo"} value={''} />



            {Container.map((val, i) => <Picker.Item key={i} value={val} label={val} />)}

          </Picker>
          <View style={{ alignSelf: 'center', borderWidth: 0.5, borderColor: 'black', width: width * .75, alignSelf: 'center' }} ></View>
        </>
      );
    }
    else if (x === 'Other') {
      return (
        <>
          <TextInput
            style={{ marginTop: height * .04, borderBottomWidth: .7, borderBottomColor: 'black', textAlignVertical: 'top' }}
            multiline={true}
            placeholder="Write Details"
            placeholderTextColor='#cccccc'
            value={this.state.details}
            onChangeText={(details) => this.setState({ details })}
          />
          <View style={{ alignSelf: 'center', borderWidth: 0.5, borderColor: 'black', width: width * .77, alignSelf: 'center' }} ></View>
        </>
      )
    }
  }

  componentDidMount() {
    let distance = this.props.distance;
    this.setState({ distance });


  }

  pricing() {
    let y = this.state.distance * this.state.weight
    let price = Number.parseFloat(y).toFixed(3)
    this.setState({ price })
  }


  render() {


    return (
      <View style={{ flex: 1, alignContent: 'center', backgroundColor: '#eee' }}>

        <Header backButton title={'New Shipment'} />
        <ScrollView>
          <View style={{ borderRadius: 18, backgroundColor: 'white', padding: 12, marginTop: 18, margin: 22, elevation: 5 }}>
            <View style={{ margin: 13, justifyContent: 'space-between' }}>

              <Picker
                mode="dropdown"
                style={{ marginTop: height * .05 }}
                onValueChange={typeOfBarges => {
                  this.setState({ typeOfBarges })

                }}
                value={this.state.typeOfBarges}
                selectedValue={this.state.typeOfBarges}>

                <Picker.Item label={"Type of barges/ ships needed"} value={''} />

                {typeOfBarges.map((val, i) => <Picker.Item key={i} value={val} label={val} />)}
              </Picker>
              <View style={{ alignSelf: 'center', borderWidth: 0.5, borderColor: 'black', width: width * .75, alignSelf: 'center' }} ></View>

              <TextInput
                style={styles.inputText}
                placeholder="Cargo weight/ tonnage"
                placeholderTextColor='grey'
                value={this.state.weight}
                onChangeText={(weight) => {

                  this.setState({ weight }, () => this.pricing())


                }}
              />


              <View style={{ alignSelf: 'center', borderWidth: 0.5, borderColor: 'black', width: width * .75, alignSelf: 'center' }} ></View>

              {this.selectedPicker(this.state.typeOfBarges)}


              <View style={{ flexDirection: 'row', marginTop: height * .05, marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 19, flex: .73, elevation: 5 }}>Price :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 19, }}>{this.state.price} EGP</Text>
              </View>

              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 18, justifyContent: 'center', marginTop: height * .04, borderWidth: 1, alignItems: 'center' }}
                onPress={() => this.setState({ isDateTimePickerVisible: true })}>
                <Text style={{ textAlign: 'center', paddingVertical: 17.2, alignSelf: 'center' }} >{this.state.Date}</Text>
                <MaterialIcons name='date-range' color={'black'} size={26} />
              </TouchableOpacity>
              <DateTimePicker
                mode={'date'}
                datePickerModeAndroid={'spinner'}
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={(Date) => this.setState({ isDateTimePickerVisible: false, Date: Date.toDateString() })}
                onCancel={() => this.setState({ isDateTimePickerVisible: false })}
              />


              <TouchableOpacity
                //onPress={() => Actions.First({ship:this.state.typeOfBarges,cargo:this.state.typOfCargo,no:this.state.weight})}
                onPress={() => {
                  let info = {
                    ship: this.state.typeOfBarges,
                    cargo: this.state.typOfCargo,
                    no: this.state.weight,
                    date: this.state.Date,
                    distance: this.state.distance,
                    note: this.state.details,
                    price: this.state.price
                  }
                  this.storeData(info)
                  // Actions.First({info});
                }}
                style={{ backgroundColor: '#33b3cc', borderRadius: 13, padding: 10, alignItems: 'center', justifyContent: 'center', marginTop: height * .08, width: width * .8, alignSelf: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Submit</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
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

});
