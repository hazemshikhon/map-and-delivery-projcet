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

export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      passwordError: '',
      loading: false,
      error: ''
      // spinner: true,
    }
  }
  onButtonPress = async () => {
    let x = [];




    if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
      this.setState({ error: 'Please Enter All data' })
    }
    else
      if (this.state.password === this.state.confirmPassword) {
        let acc = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }

        await AsyncStorage.getItem('users').then(async (users) => {
          if (users == null || users == '') {
            x.push(acc)

            await AsyncStorage.setItem('users', await JSON.stringify(x))
            Actions.reset('First');

          }
          else {

            let v = await JSON.parse(users);
            v.push(acc)
            console.log('v', v);

            await AsyncStorage.setItem('users', await JSON.stringify(v))
            // this.setState({info:v})
            //this.setState({doneFetching: true})
            Actions.reset('First');



          }



        })
      }
      else {
        this.setState({
          error: 'password and confirm password must be idenical',
        })
      }






    // if (this.state.email == '') {
    //   this.setState({ emailError: 'please enter email', loading: false })
    // }
    // if (this.state.password == '') {
    //   this.setState({ passwordError: 'please enter password', loading: false })
    // }
    // if (this.state.email != '' && this.state.password != '') {


    // }
  }



  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#ffffff" />
    }
    return (
      <Text
        style={styles.bottonText}>
        Sign up
      </Text>
    )
  }

  render() {

    return (
      <View>
        <StatusBar backgroundColor='black' barStyle="light-content" />
        <View style={styles.basicBackground}>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.header1}>S</Text>
            <Text style={styles.header2}>ignup</Text>
          </View>

          <View style={styles.background}>


            <Text style={styles.text2}>Name</Text>
            <TextInput
              style={styles.inputText}
              underlineColorAndroid='gray'
              placeholder="Enter Name"
              placeholderTextColor='gray'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
            />

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

            <Text style={styles.text2}>
              Confirm Password
            </Text>
            <TextInput
              style={styles.inputText}
              underlineColorAndroid='gray'
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor='gray'
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            />
            <Text style={styles.error}>
              {this.state.error}
            </Text>


            <View style={{ marginTop: height * 0.05 }}>
              <TouchableOpacity
                onPress={() => {
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
              onPress={() => {
                Actions.Login();
              }}
              style={{
                marginTop: 30
              }}
            >
              <Text
                style={styles.subtittle2}
                underlineColorAndroid='5653e2'>
                Login?
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
    paddingLeft: width * 0.05,
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
    marginTop: height * 0.02,
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
    fontSize: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 20
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