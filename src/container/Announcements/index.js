import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getAllAnnouncementAction } from '../../logic/announcements'
import { Loader } from '../../component'

const { height } = Dimensions.get('window')

class Announcements extends Component {
  componentDidMount () {
    this.props.getAllAnnouncementAction({
      auth: this.props.bearer.access_token
    })
  }
  renderList () {
    if (this.props.getAll.data.length === 0) {
      return (
        <View style={styles.noData} >
          <Text>No Announcements</Text>
        </View>
      )
    }
    return this.props.getAll.data.map((item, i) => {
      return (
        <Text key={i} style={styles.list} onPress={() => this.props.navigation.navigate('ViewAnnouncement', { id: item.announcement_id })} >
          <Text style={styles.listItem} >{item.title} - </Text>
          <Timestamp style={styles.date} time={new Date(item.created_date).getTime() / 1000} precision={1} component={Text} />
        </Text>
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
          {this.props.bearer.is_admin &&
            <TouchableOpacity style={styles.float} >
              <Entypo size={50} color='white' name='circle-with-plus' onPress={() => this.props.navigation.navigate('AddAnnouncement')} />
            </TouchableOpacity>
          }
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
    minHeight: 40,
    padding: 15,
    borderColor: '#ddd',
    marginBottom: 1,
    marginHorizontal: 2,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    fontSize: 18,
  },
  date: {
    paddingLeft: 10,
    fontStyle: 'italic'
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
  getAll: state.getAllAnnouncement
})

export default connect(mapStateToProps, { getAllAnnouncementAction })(Announcements)
