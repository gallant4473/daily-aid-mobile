import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getAllComplaintAction } from '../../logic/complaint'
import { Loader } from '../../component'

const { height } = Dimensions.get('window')

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Ionicons onPress={() => navigation.openDrawer()} name="ios-menu" size={50} color="white" />
      ),
      title: 'Daily Aid'
    }
  }
  componentDidMount () {
    console.log(this.props.bearer)
    this.props.getAllComplaintAction({
      auth: this.props.bearer.access_token,
      id: this.props.bearer.user_id
    })
  }
  renderList () {
    if (this.props.getAll.data.length === 0) {
      return (
        <View style={styles.noData} >
          <Text>No complaints registered</Text>
        </View>
      )
    }
    return this.props.getAll.data.map((item, i) => {
      return (
        <Text style={styles.list} onPress={() => this.props.navigation.navigate('View', { id: item.complaint_id })} key={i} >{item.title}</Text>
      )
    })
  }
  render () {
    return (
      <Loader loading={this.props.getAll.loading} error={this.props.getAll.error} >
        <View style={styles.container}>
          <ScrollView style={styles.scroll} >
            {this.renderList()}
          </ScrollView>
          <TouchableOpacity style={styles.float} >
            <Entypo size={50} color='white' name='circle-with-plus' onPress={() => this.props.navigation.navigate('Add')} />
          </TouchableOpacity>
        </View>
      </Loader>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, text: {
    fontSize: 24,
  }, float: {
    width: 50,  
    height: 50,   
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 10
  },
  list: {
    padding: 15,
    borderColor: '#ddd',
    marginBottom: 1,
    marginHorizontal: 2,
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1
  },
  noData: {
    height: height - 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  bearer: state.bearer,
  getAll: state.getAllComplaint
})

export default connect(mapStateToProps, { getAllComplaintAction })(HomeScreen)
