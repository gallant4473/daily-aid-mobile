import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Loader } from '../../component'
import { getComplaintAction, editComplaintAction } from '../../logic/complaint'

const STATUS = ['Open', 'Close', 'Withdrawn']
const PROGRESS = ['Accepted', 'Rejected', 'Pending', 'Resolved', 'In Progress', 'Withdrawn']

class ViewComplaintScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Complaint',
    }
  }
  componentWillMount () {
    console.log(this.props.navigation)
    this.props.getComplaintAction({
      id: this.props.navigation.getParam('id'),
      auth: this.props.bearer.access_token
    })
  }
  componentWillReceiveProps (nextProps) { 
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.getComplaintAction({
        id: this.props.navigation.getParam('id'),
        auth: this.props.bearer.access_token
      })
    }
    if (nextProps.navigation.state.routeName !== this.props.navigation.state.routeName) {
      this.props.getComplaintAction({
        id: this.props.navigation.getParam('id'),
        auth: this.props.bearer.access_token
      })
    }
  }
  onChange (value, key) {
    const data = this.props.get.data
    this.props.editComplaintAction({
      data: {
        title: data.title,
        location: {
          common_area: data.location.commonArea,
          apartment: data.location.apartment,
          facilities: data.location.facilities
        },
        details: data.details,
        name: data.name,
        contact_number: data.number,
        email: data.email,
        [key]: value
      },
      auth: this.props.bearer.access_token,
      id: this.props.navigation.getParam('id')
    })
  }
  renderStatus () {
    const data = this.props.get.data
    if (!this.props.bearer.is_admin) {
      return (
        <Picker style={styles.picker} selectedValue={data.status} onValueChange={(itemValue, itemIndex) => this.onChange(itemValue, 'status')}>
          {STATUS.map((item, i) => <Picker.Item key={i} label={item} value={item} />)}
        </Picker>
      )
    }
    return <TextInput underlineColorAndroid="transparent" value={data.status} editable={false} style={styles.text} />
  }
  renderProgress () {
    const data = this.props.get.data
    if (this.props.bearer.is_admin) {
      return (
        <Picker style={styles.picker} selectedValue={data.status_by_admin} onValueChange={(itemValue, itemIndex) => this.onChange(itemValue, 'status_by_admin')}>
          {PROGRESS.map((item, i) => <Picker.Item key={i} label={item} value={item} />)}
        </Picker>
      )
    }
    return <TextInput underlineColorAndroid="transparent" value={data.status_by_admin} editable={false} style={styles.text} />
  }
  render () {
    const data = this.props.get.data
    data.name = this.props.bearer.user_name
    return (
      <Loader loading={this.props.get.loading} error={this.props.get.error} >
        <View style={styles.container} >
          <ScrollView style={styles.scrollView} >
            <Text style={styles.title} >Title</Text>
            <TextInput underlineColorAndroid="transparent" value={data.title} editable={false} style={styles.text} />
            <Text style={styles.title} >Name</Text>
            <TextInput underlineColorAndroid="transparent" value={data.name} editable={false} style={styles.text} />
            <Text style={styles.title} >Complaint Status</Text>
            {this.renderStatus()}
            <Text style={styles.title} >Progress</Text>
            {this.renderProgress()}
            <Text style={styles.title} >Email</Text>
            <TextInput underlineColorAndroid="transparent" value={data.email} editable={false} style={styles.text} />
            <Text style={styles.title} >Contact Number</Text>
            <TextInput underlineColorAndroid="transparent" value={data.contact_number} editable={false} style={styles.text} />
            <Text style={styles.title} >Commom Area</Text>
            {data.location && <TextInput underlineColorAndroid="transparent" value={data.location.common_area} editable={false} style={styles.text} />}
            <Text style={styles.title} >Apartment</Text>
            {data.location && <TextInput underlineColorAndroid="transparent" value={data.location.apartment} editable={false} style={styles.text} />}
            <Text style={styles.title} >Facilities</Text>
            {data.location && <TextInput underlineColorAndroid="transparent" value={data.location.facilities} editable={false} style={styles.text} />}
            <Text style={styles.title} >Details</Text>
            <TextInput multiline={true} numberOfLines={5} underlineColorAndroid="transparent" style={styles.last} value={data.details} editable={false} />
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
  get: state.getComplaint,
  edit: state.editComplaint
})

export default connect(mapStateToProps, { getComplaintAction, editComplaintAction })(ViewComplaintScreen)

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
    borderColor: '#ddd',
    color: '#000',
    backgroundColor: '#ddd',
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingTop: 5,
    marginBottom: 2,
  },
  last: {
    borderColor: '#ddd',
    color: '#000',
    backgroundColor: '#ddd',
    borderWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
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
  }
})
