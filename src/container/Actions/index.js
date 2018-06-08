import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class ActionScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View>
          <Text>Actions</Text>
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

export default ActionScreen
