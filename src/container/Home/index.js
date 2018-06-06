import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class HomeScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text>Home</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
            <Text>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.push('Home')} >
            <Text>Go to Home again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.popToTop()} >
            <Text>Go to Top</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen
