/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './screens/Home'
import Map from './screens/Map'
import Dist from './screens/Dist'
import First from './screens/First'
import Intro from './screens/Intro'
import Login from './screens/Login'
import Signup from './screens/Signup'

import 'react-native-gesture-handler';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
        <Scene key="Intro" component={Intro} title="Intro" hideNavBar />

        <Scene key="Map" component={Map} title="Map" hideNavBar />

          <Scene key="First" component={First} title="First" hideNavBar />

          
          <Scene key="Signup" component={Signup} title="Signup" hideNavBar />

          <Scene key="Login" component={Login} title="Login" hideNavBar />
          <Scene key="Intro" component={Intro} title="Intro" hideNavBar />
          <Scene key="Map" component={Map} title="Map" hideNavBar />
          <Scene key="Home" component={Home} title="Home" hideNavBar />
          <Scene key="First" component={First} title="First" hideNavBar />
          <Scene key="Dist" component={Dist} title="Dist" hideNavBar />



        </Stack>
      </Router>
    );
  }
}