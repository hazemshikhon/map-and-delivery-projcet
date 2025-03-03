import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')

export default class FirstScreen extends Component {
  constructor() {
    super()
    this.state = {
      spinner: true,
      // login:
    }
    // AsyncStorage.getItem('Login')
    //   .then((value) => {
    //     this.setState({ login: value })
    //     if (value == 1)
    //       this.props.navigation.navigate('Profile')
    //   })
  }

  async componentDidMount() {
    
  }

  render() {
 
      return (
        <View>
          <StatusBar backgroundColor='black' barStyle="light-content" />
          <View style={styles.basicBackground}>

            
            <View style={styles.background}>
              <Text style={styles.text}>How do you want {"\n"} to continue ?</Text>
              <View style={{ paddingTop: height * 0.01, paddingHorizontal: width * 0.01 ,marginTop:30 }}>
                <TouchableOpacity
                style={{marginBottom:20}}
                  onPress={() => {
                   Actions.Login();
                  }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#33b3cc', '#33b3cc', '#33b3cc']}
                    style={styles.linearGradient}>
                    <Text style={styles.bottonText}>Log in</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                  Actions.Signup();
                 }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#33b3cc', '#33b3cc', '#33b3cc']}
                    style={styles.linearGradient}>
                    <Text style={styles.bottonText}>Sign up</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#ffffff',
    height: '75%',
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    marginTop: 200,
    paddingTop: height * 0.1,
  },
  header1: {
    color: '#ffffff',
    fontSize: 90,
    fontWeight: 'bold',
    marginTop: height * 0.09,
  },
  header2: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: height * 0.125,
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: height * 0.04,
    width: width * 0.75,
    height: height * 0.055,
  },
  bottonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtittle: {
    color: 'gray',
    fontSize: 15,
    marginTop: height * 0.15,
  }
});