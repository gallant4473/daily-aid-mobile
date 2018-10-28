import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Button, ScrollView, KeyboardAvoidingView, View } from 'react-native'
import t from 'tcomb-form-native'
import { connect } from 'react-redux'

import { addAnnouncementAction, editAnnouncementAction, getAllAnnouncementAction } from '../../logic/announcements'

const Form = t.form.Form

const stylesheet = JSON.parse(JSON.stringify(t.form.Form.stylesheet))
stylesheet.textbox.normal.height = 100
stylesheet.textbox.error.height = 100

const User = t.struct({
  title: t.String,
  details: t.String
})

const options = {
  fields: {
    details: {
      multiline: true,
      stylesheet: stylesheet
    }
  }
}

class AddAnnouncementScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Announcement form',
    }
  }
  constructor (props) {
    super(props)
    const value = this.props.navigation.getParam('data') ? {
      title: this.props.navigation.getParam('data').title,
      details: this.props.navigation.getParam('data').details
    } : null
    this.state = {
      value
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.addAnnouncement.flag !== this.props.addAnnouncement.flag && nextProps.addAnnouncement.flag) {
      this.props.getAllAnnouncementAction({
        auth: this.props.bearer.access_token
      })
      this.props.navigation.pop()
    }
    if (nextProps.edit.flag !== this.props.edit.flag && nextProps.edit.flag) {
      this.props.getAllAnnouncementAction({
        auth: this.props.bearer.access_token
      })
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
        this.props.editAnnouncementAction({
          data: {
            'title': this.state.value.title,
            'details': this.state.value.details,
          },
          auth: this.props.bearer.access_token,
          id: this.props.navigation.getParam('data').announcement_id
        })
      } else {
        this.props.addAnnouncementAction({
          data: {
            'title': this.state.value.title,
            'details': this.state.value.details
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
              <Form underlineColorAndroid="transparent" autoFocus onChange={this.onChange} type={User} value={this.state.value} ref={c => this._form = c} options={options} />
              <Button
                title={this.props.navigation.getParam('data') ? 'Edit Announcement' : 'Add Announcement'}
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
  addAnnouncement: state.addAnnouncement,
  edit: state.editAnnouncement
})

export default connect(mapStateToProps, { addAnnouncementAction, editAnnouncementAction, getAllAnnouncementAction })(AddAnnouncementScreen)

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
