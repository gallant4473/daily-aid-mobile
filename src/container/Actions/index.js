import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllComplaintAction } from '../../logic/complaint'
import { Loader } from '../../component'

const { height } = Dimensions.get('window')

class ActionScreen extends Component {
  componentDidMount () {
    this.props.getAllComplaintAction({
      auth: this.props.bearer.access_token
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
          <ScrollView>
            {this.renderList()}
          </ScrollView>
        </View>
      </Loader>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 24
  },
  list: {
    padding: 15,
    borderColor: '#ddd',
    marginBottom: 1,
    marginHorizontal: 2,
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: '#fff'
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

export default connect(mapStateToProps, { getAllComplaintAction })(ActionScreen)
