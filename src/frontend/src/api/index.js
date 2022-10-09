import axios from 'axios'
const baseUrl = `http://localhost:5000`

export const login = async ({ username, password }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/login`,
    data: {
      username,
      password,
    },
  })
  return data.data
}
export const register = async ({ username, password, email, roles }) => {
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/register`,
    data: {
      username,
      email,
      password,
      roles,
    },
  })
  return data.data
}
export const getInfo = async () => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/auth/info`,
    headers: { token },
  })
  return data.data
}

export const updateInfo = async ({ id, field, value }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'put',
    url: `${baseUrl}/user/${id}`,
    headers: { token },
    data: {
      field,
      value,
    },
  })
  return data.data
}

export const getAllUser = async () => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/user`,
    headers: { token },
  })
  return data.data
}

export const deleteUser = async ({ id }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'delete',
    url: `${baseUrl}/user/${id}`,
    headers: { token },
  })
  return data.data
}

export const createSurvey = async ({ title, questions }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'post',
    url: `${baseUrl}/survey/`,
    headers: {
      token,
    },
    data: {
      title,
      questions,
    },
  })
  console.log(data.data)
}
export const getAllSurveyByUserid = async () => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/survey/by_userid`,
    headers: {
      token,
    },
  })
  return data.data
}
export const getAllSurvey = async () => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/survey/`,
    headers: {
      token,
    },
  })
  return data.data
}
export const searchSurvey = async ({ value, checked }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/survey/search`,
    headers: {
      token,
    },
    params: {
      value,
      checked,
    },
  })
  return data.data
}
export const confirmSurvey = async ({ id }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'put',
    url: `${baseUrl}/survey`,
    data: {
      id,
    },
    headers: {
      token,
    },
  })
  return data.data
}
export const getAllQuestionBySurveyid = async ({ surveyid }) => {
  let token = localStorage.getItem('token')
  token = `Bearer ${token}`
  let data = await axios({
    method: 'get',
    url: `${baseUrl}/question/`,
    params: {
      surveyid,
    },
    headers: {
      token,
    },
  })
  return data.data
}
