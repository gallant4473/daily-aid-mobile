import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getUserAction, approveAction, activateAction } from '../../logic/user'
import { Loader } from '../../component'

class UserScreen extends Component {
  componentDidMount () {
    this.props.getUserAction(this.props.bearer.access_token)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.approve.data !== this.props.approve.data && nextProps.approve.data) {
      this.props.getUserAction(this.props.bearer.access_token)
    }
    if (nextProps.activate.data !== this.props.activate.data && nextProps.activate.data) {
      this.props.getUserAction(this.props.bearer.access_token)
    }
  }
  getApprove (value) {
    const payload = {
      update:[
        {
          user_id: value.user_id,
          status: !value.is_approved
        }
      ]
    }
    this.props.approveAction({
      data: payload,
      auth: this.props.bearer.access_token
    })
  }
  toggleActivate (value) {
    const payload = {
      update:[
        {
          user_id: value.user_id,
          status: !value.is_active
        }
      ]
    }
    this.props.activateAction({
      data: payload,
      auth: this.props.bearer.access_token
    })
  }

  keyExtractor = item => item.user_id

  renderStatus (item) {
    if (item.is_admin) {
      return (
        <Text style={styles.itemAdminText} >ADMIN</Text>
      )
    }
    if (!item.is_approved) {
      if (this.props.approve.loading) {
        return (
          <ActivityIndicator size='small' color='#FF473A' />
        )
      }
      return (
        <TouchableOpacity style={styles.itemBtnApprove} onPress={() => this.getApprove(item)} >
          <Text style={styles.itemBtnText} >Approve</Text>
        </TouchableOpacity>
      )
    }
    if (this.props.activate.loading) {
      return (
        <ActivityIndicator size='small' color='#FF473A' />
      )
    }
    return (
      <TouchableOpacity style={item.is_active ? styles.itemBtnDeactive : styles.itemBtnActive} onPress={() => this.toggleActivate(item)} >
        <Text style={styles.itemBtnText} >{item.is_active ? 'De Activate' : 'Activate' }</Text>
      </TouchableOpacity>
    )
  }
  render () {
    return (
      <Loader laoding={this.props.user.laoding} error={this.props.user.error}>
        <FlatList
          data={this.props.user.data}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) => (
            <View style={styles.item} >
              <View style={styles.itemTextContainer} >
                <Text style={styles.itemText} >{item.user_name.toUpperCase()}</Text>
              </View>
              <View style={styles.itemBtnContainer} >
                {this.renderStatus(item)}
              </View>
            </View>
          )}
        />
      </Loader>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getUser,
    bearer: state.bearer,
    approve: state.approve,
    activate: state.activate
  }
}

export default connect(mapStateToProps, { getUserAction, approveAction, activateAction })(UserScreen)

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTextContainer: {
    flex: 3
  },
  itemBtnContainer: {
    flex: 1,
    paddingRight: 10
  },
  itemBtnApprove: {
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5494ff'
  },
  itemBtnDeactive: {
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  itemBtnActive: {
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  itemBtnText: {
    color: '#fff'
  },
  itemText: {
    fontSize: 16,
    padding: 10
  }, itemAdminText: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#FF473A',
    color: '#fff',
    textAlign: 'center'
  }
})
