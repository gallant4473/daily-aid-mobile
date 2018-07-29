import React, { Component } from 'react'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import LoginScreen from '../Login'
import HomeScreen from '../Home'
import AdminScreen from '../Admin'
import AuthLoadingScreen from '../AuthLoader'
import SignupScreen from '../Signup'
import DrawerScreen from '../Drawer'
import ForgotScreen from '../Forgot'
import Status from '../Status'
import AddComplaintScreen from '../AddComplaint'
import ViewComplaintScreen from '../ViewComplaint'

const MainAdminScreen = createStackNavigator({
  Admin: AdminScreen,
  Add: AddComplaintScreen,
  View: ViewComplaintScreen
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#FF473A',
      paddingRight: 15,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

const MainUserScreen = createStackNavigator({
  Home: HomeScreen,
  Add: AddComplaintScreen,
  View: ViewComplaintScreen
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#FF473A',
      paddingRight: 15,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

class UserStatusScreen extends Component {
  static router = MainUserScreen.router;
  render() {
    return (
      <View style={styles.container}>
        <Status navigation={this.props.navigation} />
        <MainUserScreen navigation={this.props.navigation} />
      </View>
    )
  }
}

class AdminStatusScreen extends Component {
  static router = MainAdminScreen.router;
  render() {
    return (
      <View style={styles.container}>
        <Status navigation={this.props.navigation} />
        <MainAdminScreen navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const UserStack = createDrawerNavigator({
  UserMain: UserStatusScreen 
}, {
  contentComponent: DrawerScreen
})

const AdminStack = createDrawerNavigator({
  AdminMain: AdminStatusScreen
}, {
  contentComponent: DrawerScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  Forgot: ForgotScreen
})

const Main = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    UserStack,
    AuthStack,
    AdminStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)
export default Main
