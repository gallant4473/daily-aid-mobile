import { AsyncStorage } from 'react-native'

export const setAsync = async(key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return false
  } catch (error) {
    return true
  }
}

export const removeAsync = async(key) => {
  try {
    await AsyncStorage.removeItem(key)
    return false
  } catch (error) {
    return true
  }
}

export const getAsync = async(key) => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data
  } catch (error) {
    return undefined
  }
}

export function apiCall (url, method, authReq = true, body = {}) {
  let obj = {}
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    obj = {
      method,
      url,
      body
    }
  } else {
    obj = {
      method,
      url
    }
  }
  if (authReq) {
    return ({
      ...obj,
      headers: {
        Authorization: getAsync('auth') ? getAsync('auth') : '',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
  return ({
    ...obj,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
