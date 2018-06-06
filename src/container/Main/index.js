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
  Home: HomeScreen
}, {
  contentComponent: DrawerScreen,
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

class UserStatusScreen extends Component {
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

class AdminStatusScreen extends Component {
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

const UserStack = createStackNavigator({ UserMain: UserStatusScreen })
const AdminStack = createStackNavigator({ AdminMain: AdminStatusScreen })

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen
})

const Main = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    User: UserStack,
    Auth: AuthStack,
    Admin: AdminStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
export default Main
