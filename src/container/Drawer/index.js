import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { logoutAction } from '../../logic/login'

class DrawerScreen extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.logout.data !== this.props.logout.data && nextProps.logout.data.length > 0) {
      this.props.navigation.navigate('AuthStack')
    }
  }
  onPress (value) {
    if (value === 'LOGOUT') {
      this.props.logoutAction(this.props.bearer.access_token)
    }
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer} >
          <FontAwesome name='user-circle-o' size={150} color='#FF473A' />
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={[{ key: 'LOGOUT' }]}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.itemContainer} >
                <Text onPress={() => this.onPress(item.key)} style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
            )}
            />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logout: state.logout,
    bearer: state.bearer
  }
}

export default connect(mapStateToProps, { logoutAction })(DrawerScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
  },
  topContainer: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ddd',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FF473A'
  },
  itemContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 2
  },
  item: {
    padding: 10,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center'
  }
})
