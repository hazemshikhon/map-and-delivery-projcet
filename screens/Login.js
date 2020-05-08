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
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';


const { height, width } = Dimensions.get('window')

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      emailError: '',
      passwordError: '',
      loading: false,
      // spinner: true,
    }
  }
  onButtonPress = async () => {
    

    if(this.state.email ==='' || this.state.password ===''){
      this.setState({error:'Please Enter All data'})
    }
    else
    {

    await AsyncStorage.getItem('users').then(async (users) => {
     
      let acc = await JSON.parse(users);
      console.log(acc);
      
        for (var i in acc) {
          if (acc[i].email === this.state.email && acc[i].password === this.state.password) {

            Actions.reset('First')
          }
          else{
            this.setState({error:'Wrong Data'})
            console.log('no');
            
          }
        }
     


    })
  }

}

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#ffffff" />
    }
    return (
      <Text
        style={styles.bottonText}>
        Log in
      </Text>
    )
  }

  render() {
  
      return (
        <View>
          <StatusBar backgroundColor='black' barStyle="light-content" />
          <View style={styles.basicBackground}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.header1}></Text>
              <Text style={styles.header2}>Login</Text>
            </View>

            <View style={styles.background}>

              <Text style={styles.text2}>Email</Text>
              <TextInput
                style={styles.inputText}
                underlineColorAndroid='gray'
                placeholder="Enter Email"
                placeholderTextColor='gray'
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />


              <Text style={styles.text2}>
                Password
            </Text>
              <TextInput
                style={styles.inputText}
                underlineColorAndroid='gray'
                placeholder="Enter Password"
                secureTextEntry={true}
                placeholderTextColor='gray'
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
              <Text style={styles.error}>
                {this.state.error}
              </Text>

              <TouchableOpacity >
                <Text
                  style={styles.subtittle1}
                  underlineColorAndroid='5653e2'>
                  Forget Password?
              </Text>
              </TouchableOpacity>

              <View style={{ marginTop: height * 0.05 }}>
                <TouchableOpacity
                  
                  onPress={ () => {
                    this.onButtonPress();
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#33b3cc', '#33b3cc', '#33b3cc']}
                    style={styles.linearGradient}>
                    {/* <Text
                    style={styles.bottonText}>
                    Log in
                  </Text> */}
                    {this.renderButton()}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
               onPress={ () => {
                Actions.Signup();
              }}
              style={{
                  marginTop:40
              }}
               >
                <Text
                  style={styles.subtittle2}
                  underlineColorAndroid='5653e2'>
                  don't have an account?
            </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      );
    }
  };

const styles = StyleSheet.create({
  basicBackground: {
    backgroundColor: '#33b3cc',
    height: '100%',
    width: '100%',
  },
  background: {
    backgroundColor: '#ffffff',
    height: '80%',
    width: '90%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: height * 0.01,
    paddingTop: height * 0.05,
    paddingLeft: width * 0.06,
  },
  header1: {
    color: '#ffffff',
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: height * 0.032,
    marginLeft: width * 0.06,
  },
  header2: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: height * 0.05,
    marginLeft: width * 0.005,
  },
  text: {
    color: '#33b3cc',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text2: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: height * 0.05,
  },
  inputText: {
    color: '#000000',
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'normal',
    width: width * 0.75,
    height: height * 0.065,

  },
  subtittle1: {
    color: '#33b3cc',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginRight: width * 0.05,
  },
  subtittle2: {
    color: '#33b3cc',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginRight:22
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: width * 0.75,
    height: height * 0.055,
  },
  bottonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  or: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
    marginTop: height * 0.035,
    width: width * 0.75,
  },
  error: {
    color: 'red',
    fontSize: 17,
    marginLeft: width * 0.02,
    marginTop: 5,
    fontWeight: 'bold'
  },
});