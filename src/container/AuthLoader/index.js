import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { getBearerAction } from '../../logic/bearer'

class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync () {
    AsyncStorage.getItem('auth').then((res) => {
      if (res) {
        this.props.getBearerAction(JSON.parse(res))
        if (JSON.parse(res).is_admin) {
          this.props.navigation.navigate('AdminStack')
        } else {
          this.props.navigation.navigate('UserStack')
        }
      } else {
        this.props.navigation.navigate('AuthStack')
      }
    }, () => {
      this.props.navigation.navigate('AuthStack')
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
        <ActivityIndicator size='large' color='#FF473A' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(null, { getBearerAction })(AuthLoadingScreen)
