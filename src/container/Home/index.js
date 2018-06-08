import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Ionicons onPress={() => navigation.openDrawer()} name="ios-menu" size={50} color="white" />
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text} >Welcome User</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }, text: {
    fontSize: 24,
  }
})

export default HomeScreen
