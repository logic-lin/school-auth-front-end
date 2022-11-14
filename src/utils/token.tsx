const key = 'login_token'

export function getToken() {
  return localStorage.getItem(key)
}

export function setToken(token) {
  localStorage.setItem(key, token)
}


export function clearToken() {
  localStorage.removeItem(key)
}


