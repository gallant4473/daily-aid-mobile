import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// import { getAsync, removeAsync } from '../../utils'

class Status extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.status.type !== this.props.status.type) {
      
    }
  }
  render () {
    console.log(this.props)
    return (
      <View />
    )
  }
}

const mapStateToProps = state => ({
  status: state.status
})

export default connect(mapStateToProps, {})(Status)
