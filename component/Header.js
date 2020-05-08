import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Actions } from 'react-native-router-flux'

export default class Header extends Component {
  render() {
    const { backButton, title, style ,styleee } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor: "#33b3cc",
            width: "100%",
            flexDirection: "row",
            elevation: 7,
            justifyContent: "center",
            alignItems: "center",
            // zIndex: 50,
          },
          
          {...style},
        ]}
      >
        {/* back button */}
        {backButton && (
          <TouchableOpacity style={{ flex: 1 }} onPress={() => Actions.pop()}>
            <MaterialIcons
              name={"arrow-back"}
              size={25}
              style={{
                color: "white",
                alignSelf: "flex-start",
                margin: 10,
              }}
            />
          </TouchableOpacity>
        )}
        {/* Title */}
        {title ? (
          <Text
            style={[{fontSize: 22, margin: 10, textAlign: "center", flex:5,color:'white',
                fontFamily: 'ProximaNovaA-Regular',  fontWeight: 'bold'},{...styleee}]}
          >
            {title}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
