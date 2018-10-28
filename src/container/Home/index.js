import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import UserComplaints from '../UserComplaints'
import Announcements from '../Announcements'

const TabsScreen = createMaterialTopTabNavigator({
  Announcements,
  Complaints: UserComplaints
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#FF473A',
    },
    indicatorStyle: {
      backgroundColor: '#FFF',
    }
  }
})

class HomeScreen extends Component {
  static router = TabsScreen.router;
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'DAILY AID',
      headerRight: (
        <Ionicons onPress={() => navigation.openDrawer()} name="ios-menu" size={50} color="white" />
      )
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <TabsScreen navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default HomeScreen
