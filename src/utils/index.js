import { AsyncStorage } from 'react-native'

export const BASE_URL = 'http://13.232.150.252:3000/'

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
  const data = await AsyncStorage.getItem(key)
  return data
}

export function apiCall (url, method, authReq = true, body = {}, bearer = '') {
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
        Authorization: `Bearer ${bearer}`,
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
