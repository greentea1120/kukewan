import axios from './config-axios'

// axios get
export function axiosGet(url, params) {
  if (params) {
    return axios.get(url, {
      params: params
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
  } else {
    return axios.get(url)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  }
}
// axios get includes header
export function axiosHeaderGet(url, params) {
  if (params) {
    return axios.get(url, {
      params: params
    })
    .then((res) => {
      return Promise.resolve(res)
    })
  } else {
    return axios.get(url)
      .then((res) => {
        return Promise.resolve(res)
      })
  }
}
