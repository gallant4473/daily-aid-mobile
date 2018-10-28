import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { Loader } from '../../component'
import { getAnnouncementAction, editAnnouncementAction, deleteAnnouncementAction, getAllAnnouncementAction } from '../../logic/announcements'

class ViewAnnouncementScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Announcement',
    }
  }
  componentWillMount () {
    this.props.getAnnouncementAction({
      id: this.props.navigation.getParam('id'),
      auth: this.props.bearer.access_token
    })
  }
  componentWillReceiveProps (nextProps) { 
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.getAnnouncementAction({
        id: this.props.navigation.getParam('id'),
        auth: this.props.bearer.access_token
      })
    }
    if (nextProps.delete.flag !== this.props.delete.flag && nextProps.delete.flag) {
      this.props.getAllAnnouncementAction({
        auth: this.props.bearer.access_token
      })
      this.props.navigation.pop()
    }
    if (nextProps.navigation.state.routeName !== this.props.navigation.state.routeName) {
      this.props.getAnnouncementAction({
        id: this.props.navigation.getParam('id'),
        auth: this.props.bearer.access_token
      })
    }
  }
  render () {
    const data = this.props.get.data
    return (
      <Loader loading={this.props.get.loading} error={this.props.get.error} >
        <View style={styles.container} >
          <ScrollView style={styles.scrollView} >
            <Text style={styles.title} >Title</Text>
            <TextInput underlineColorAndroid="transparent" value={data.title} editable={false} style={styles.text} />
            <Text style={styles.title} >Details</Text>
            <TextInput underlineColorAndroid="transparent" style={styles.last} value={data.details} editable={false} />
          </ScrollView>
          { this.props.bearer.is_admin && (
            <TouchableOpacity style={styles.float} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Entypo size={35} color='white' name='edit' onPress={() => this.props.navigation.navigate('AddAnnouncement', { data })} />
              </View>
            </TouchableOpacity>
          )}
          { this.props.bearer.is_admin && (
            <TouchableOpacity style={styles.floatDelete} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                {this.props.delete.loading ?
                  <Loader loading error={false} /> :
                  <MaterialCommunityIcons size={35} color='white' name='delete' onPress={() => this.props.deleteAnnouncementAction({
                    id: this.props.navigation.getParam('id'),
                    auth: this.props.bearer.access_token
                  })} />
                }
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Loader>
    )
  }
}

const mapStateToProps = state => ({
  bearer: state.bearer,
  get: state.getAnnouncement,
  edit: state.editAnnouncement,
  delete: state.deleteAnnouncement
})

export default connect(mapStateToProps, { getAnnouncementAction, editAnnouncementAction, deleteAnnouncementAction, getAllAnnouncementAction })(ViewAnnouncementScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20
  }, 
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5
  },
  text: {
    borderColor: '#ffffff',
    color: '#000',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 2,
  },
  last: {
    borderColor: '#ffffff',
    color: '#000',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 10,
  },
  float: {
    width: 50,  
    height: 50,   
    borderRadius: 50,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 10
  }, picker: {
    // borderColor: '#fff',
    // color: '#000',
    // backgroundColor: '#ddd',
    // borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 5,
    marginBottom: 2,
  },floatDelete: {
    width: 50,  
    height: 50,   
    borderRadius: 50,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 80,
    right: 10,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 10
  }
})
