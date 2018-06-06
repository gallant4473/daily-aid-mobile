import React from 'react'
import { Provider } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './src/logic/reducer'
import rootEpic from './src/logic/epic'
import Main from './src/container/Main'

const epicMiddleware = createEpicMiddleware(rootEpic)
const store = createStore(rootReducer, applyMiddleware(epicMiddleware))

const App = () => (
  <Provider store={store} >
    <View style={styles.container} >
      <Main />
    </View>
  </Provider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
