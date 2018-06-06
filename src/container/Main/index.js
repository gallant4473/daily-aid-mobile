import React, { Component } from 'react'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import LoginScreen from '../Login'
import HomeScreen from '../Home'
import AuthLoadingScreen from '../AuthLoader'
import SignupScreen from '../Signup'
import DrawerScreen from '../Drawer'
import Status from '../Status'

const MainScreen = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Notifications: {
    screen: DrawerScreen
  }
})

class StatusScreen extends Component {
  static router = MainScreen.router;
  render() {
    return (
      <View style={styles.container}>
        <Status navigation={this.props.navigation} />
        <MainScreen navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const AppStack = createStackNavigator({ Main: StatusScreen })
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
})

const Main = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
export default Main
