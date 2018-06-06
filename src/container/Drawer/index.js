import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const DrawerScreen = (props) => (
  <View style={styles.container}>
    <View style={styles.topContainer} >
      <FontAwesome name='user-circle-o' size={150} color='green' />
    </View>
    <View style={styles.bottomContainer} />
  </View>
)

export default DrawerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1
  }
})
