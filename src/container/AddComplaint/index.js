import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Button, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import t from 'tcomb-form-native'
import { connect } from 'react-redux'

import { addComplaintAction, editComplaintAction } from '../../logic/complaint'

const Form = t.form.Form

const stylesheet = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheet.textbox.normal.height = 100
stylesheet.textbox.error.height = 100

const User = t.struct({
  name: t.String,
  title: t.String,
  email: t.String,
  contactNumber: t.Number,
  commonArea: t.String,
  apartment: t.String,
  facilities: t.String,
  detailsOfTheJob: t.String
})

const options = {
  fields: {
    detailsOfTheJob: {
      multiline: true,
      stylesheet: stylesheet
    }
  }
}

class AddComplaintScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Complaint form',
    }
  }
  constructor (props) {
    super(props)
    const value = this.props.navigation.getParam('data') ? {
      email: this.props.navigation.getParam('data').email,
      contactNumber: this.props.navigation.getParam('data').contact_number,
      title: this.props.navigation.getParam('data').title,
      commonArea: this.props.navigation.getParam('data').location.common_area,
      apartment: this.props.navigation.getParam('data').location.apartment,
      facilities: this.props.navigation.getParam('data').location.facilities,
      detailsOfTheJob: this.props.navigation.getParam('data').details,
      name: this.props.navigation.getParam('data').name
    } : null
    this.state = {
      value
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.addComplaint.flag !== this.props.addComplaint.flag && nextProps.addComplaint.flag) {
      this.props.navigation.pop()
    }
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.navigation.pop()
    }
  }
  onChange (value) {
    this.setState({
      value
    })
  }
  handleSubmit () {
    const value = this._form.getValue() // use that ref to get the form value
    if (value) {
      if (this.props.navigation.getParam('data')) {
        this.props.editComplaintAction({
          data: {
            'title': this.state.value.title,
            'location': {
              'common_area': this.state.value.commonArea,
              'apartment': this.state.value.apartment,
              'facilities': this.state.value.facilities
            },
            'details': this.state.value.detailsOfTheJob,
            'name': this.state.value.name,
            contact_number: this.state.value.contactNumber,
            email: this.state.value.email
          },
          auth: this.props.bearer.access_token,
          id: this.props.navigation.getParam('data').complaint_id
        })
      } else {
        this.props.addComplaintAction({
          data: {
            'title': this.state.value.title,
            'location': {
              'common_area': this.state.value.commonArea,
              'apartment': this.state.value.apartment,
              'facilities': this.state.value.facilities
            },
            'details': this.state.value.detailsOfTheJob,
            'name': this.state.value.name,
            contact_number: this.state.value.contactNumber,
            email: this.state.value.email
          },
          auth: this.props.bearer.access_token
        })
      }
    }
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyBoard} behavior='padding' enabled>
          <View style={styles.form} >
            <ScrollView style={styles.scrollView} >
              <Form autoFocus onChange={this.onChange} type={User} value={this.state.value} ref={c => this._form = c} options={options} />
              <Button
                title={this.props.navigation.getParam('data') ? 'Edit Complaint' : 'Register Complaint'}
                onPress={this.handleSubmit}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  bearer: state.bearer,
  addComplaint: state.addComplaint,
  edit: state.editComplaint
})

export default connect(mapStateToProps, { addComplaintAction, editComplaintAction })(AddComplaintScreen)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  scrollView: {
    paddingRight: 20,
    paddingLeft: 20
  },
  form: {
    paddingBottom: 20,
    paddingTop: 20
  }
})
