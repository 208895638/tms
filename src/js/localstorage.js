var storage = {
  setStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setSessionStorage(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
  },
  getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
}
export default storage
