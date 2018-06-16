import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Keyboard,  TouchableWithoutFeedback, ActivityIndicator, AsyncStorage } from 'react-native'
import { forgotPasswordAction } from '../../logic/forgot'
import { getBearerAction } from '../../logic/bearer'

class ForgotScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      email: '',
      message: ''
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.forgot.data !== this.props.forgot.data && nextProps.forgot.data.length > 0) {
      this.props.navigation.push('Login')
    }
  }
  isValid() {
    const { userName, email } = this.state;
    let valid = false;
    if (userName.length > 0 && email.length > 0) {
      valid = true;
    }
    if (userName.length === 0) {
      this.setState({ message: 'You must enter a user name' });
    } else if (email.length === 0) {
      this.setState({ message: 'You must enter an email' });
    }
    return valid;
  }
  onChangeText(text, key) {
    this.setState({
      [key]: text,
      message: ''
    })
  }
  onSubmit () {
    if (this.isValid()) {
      const { userName, email } = this.state
      this.props.forgotPasswordAction({
        user_name: userName,
        email
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
              <TextInput value={this.state.email} autoCapitalize="none" onChangeText={(text) => this.onChangeText(text, 'email')} underlineColorAndroid="transparent" style={styles.input} placeholder='Email' keyboardType='email-address' />
              <TextInput value={this.state.userName} autoCapitalize="none" onChangeText={(text) => this.onChangeText(text, 'userName')} underlineColorAndroid="transparent" style={styles.input} placeholder='User Name' />
              <View style={styles.forgotContainer} >
                <Text onPress={() => this.props.navigation.push('Login')}  style={styles.forgotTxt} >Login ?</Text>
              </View>
              <TouchableOpacity style={styles.loginBtn} onPress={this.onSubmit} >
                <Text style={styles.loginTxt} >Submit</Text>
              </TouchableOpacity>
              <View style={styles.dontContainer} >
                <Text style={styles.dontText} onPress={() => this.props.navigation.push('Signup')} >Don't have an account?</Text>
              </View>
              {this.props.forgot.loading ? (
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
    forgot: state.forgot
  }
}

export default connect(mapStateToProps, { forgotPasswordAction, getBearerAction })(ForgotScreen)

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
