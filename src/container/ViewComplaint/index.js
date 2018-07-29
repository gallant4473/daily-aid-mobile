import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Loader } from '../../component'
import { getComplaintAction } from '../../logic/complaint'

class ViewComplaintScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Complaint',
    }
  }
  componentWillMount () {
    this.props.getComplaintAction({
      id: this.props.navigation.getParam('id'),
      auth: this.props.bearer.access_token
    })
  }
  render () {
    const data = this.props.get.data
    data.name = this.props.bearer.user_name
    return (
      <Loader loading={this.props.get.loading} error={this.props.get.error} >
        <View style={styles.container} >
          <ScrollView style={styles.scrollView} >
            <Text style={styles.title} >Title</Text>
            <TextInput value={data.title} editable={false} style={styles.text} />
            <Text style={styles.title} >Name</Text>
            <TextInput value={data.name} editable={false} style={styles.text} />
            <Text style={styles.title} >Complaint Status</Text>
            <TextInput value={data.status} editable={false} style={styles.text} />
            <Text style={styles.title} >Progress</Text>
            <TextInput value={data.status_by_admin} editable={false} style={styles.text} />
            <Text style={styles.title} >Email</Text>
            <TextInput value={data.email} editable={false} style={styles.text} />
            <Text style={styles.title} >Contact Number</Text>
            <TextInput value={data.contact_number} editable={false} style={styles.text} />
            <Text style={styles.title} >Commom Area</Text>
            {data.location && <TextInput value={data.location.common_area} editable={false} style={styles.text} />}
            <Text style={styles.title} >Apartment</Text>
            {data.location && <TextInput value={data.location.apartment} editable={false} style={styles.text} />}
            <Text style={styles.title} >Facilities</Text>
            {data.location && <TextInput value={data.location.facilities} editable={false} style={styles.text} />}
            <Text style={styles.title} >Details</Text>
            <TextInput style={styles.text} value={data.details} editable={false} />
          </ScrollView>
          { !this.props.bearer.is_admin && (
            <TouchableOpacity style={styles.float} >
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <Entypo size={35} color='white' name='edit' onPress={() => this.props.navigation.navigate('Add', { data })} />
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
  get: state.getComplaint
})

export default connect(mapStateToProps, { getComplaintAction })(ViewComplaintScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  scrollView: {
    padding: 20
  }, 
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5
  },
  title:{
    fontSize: 18,
    paddingTop: 5
  }, float: {
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
  },
})
