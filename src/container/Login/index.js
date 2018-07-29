import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Keyboard,  TouchableWithoutFeedback, ActivityIndicator, AsyncStorage } from 'react-native'
import { loginAction } from '../../logic/login'
import { getBearerAction } from '../../logic/bearer'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      message: ''
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.onLogInPress = this.onLogInPress.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.login.error !== this.props.login.error && nextProps.login.error) {
      const message = 'Something went wrong, Please try again after some time'
      if (nextProps.login.data === 401) {
        message = 'Please check your username and password'
      } else if (nextProps.login.data === 403) {
        message = 'Your account is not yet approved by Admin'
      }
      this.setState({
        userName: '',
        password: '',
        message
      })
    }
    if (nextProps.login.data !== this.props.login.data && nextProps.login.data.length > 0) {
      if (nextProps.login.data[0].is_admin) {
        this.props.navigation.navigate('AdminStack')
      } else {
        this.props.navigation.navigate('UserStack')
      }
    }
  }
  isValid() {
    const { userName, password } = this.state;
    let valid = false;
    if (userName.length > 0 && password.length > 0) {
      valid = true;
    }
    if (userName.length === 0) {
      this.setState({ message: 'You must enter a user name' });
    } else if (password.length === 0) {
      this.setState({ message: 'You must enter a password' });
    }
    return valid;
  }
  onChangeText(text, key) {
    this.setState({
      [key]: text,
      message: ''
    })
  }
  onLogInPress () {
    if (this.isValid()) {
      const { userName, password } = this.state
      this.props.loginAction({
        user_name: userName,
        password
      })
    }
  }
  render () {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground
            style={{
              backgroundColor: '#ccc',
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            resizeMode='cover'
            source={require('../../../assets/background1.jpg')}
          >
            <View style={styles.topContainer} />
            <View style={styles.bottomContainer} >
              <TextInput value={this.state.userName} autoCapitalize="none" onChangeText={(text) => this.onChangeText(text, 'userName')} underlineColorAndroid="transparent" style={styles.input} placeholder='User Name' />
              <TextInput value={this.state.password} autoCapitalize="none" onChangeText={(text) => this.onChangeText(text, 'password')} underlineColorAndroid="transparent" secureTextEntry style={styles.input} placeholder='Password' />
              <View style={styles.forgotContainer} >
                <Text onPress={() => this.props.navigation.push('Forgot')} style={styles.forgotTxt} >Forgot your password ?</Text>
              </View>
              <TouchableOpacity style={styles.loginBtn} onPress={this.onLogInPress} >
                <Text style={styles.loginTxt} >Log In</Text>
              </TouchableOpacity>
              <View style={styles.dontContainer} >
                <Text style={styles.dontText} onPress={() => this.props.navigation.push('Signup')} >Don't have an account?</Text>
              </View>
              {this.props.login.loading ? (
                <View style={styles.loader} >
                  <ActivityIndicator size='large' color='white' />
                </View>
              ) : null}
              <View style={styles.errorContainer} >
                <Text style={styles.errorText} >{this.state.message}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, { loginAction, getBearerAction })(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF473A',
    flexDirection: 'column',
  },
  topContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'transparent',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 5,
    marginBottom: 2,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 300,
    height: 40
  },
  forgotTxt: {
    color: '#FFF',
    paddingTop: 10,
    paddingBottom: 10
  },
  loginBtn: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF473A',
    marginTop: 5,
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
  },
  dontContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 300,
    height: 40
  },
  dontText: {
    color: '#FFF',
    paddingTop: 10,
    paddingBottom: 10
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 30
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 60
  }
})
