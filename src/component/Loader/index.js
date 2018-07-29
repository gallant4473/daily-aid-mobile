import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loader extends Component {
  render () {
    if (this.props.loading) {
      return (
        <View style={styles.container} >
          <ActivityIndicator size='large' />
        </View>
      )
    }
    if (this.props.error) {
      return (
        <View style={styles.container} >
          <Text>Something went wront, Please try after some time</Text>
        </View>
      )
    }
    return (
      <View style={styles.mainContainer} >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1
  }
})
