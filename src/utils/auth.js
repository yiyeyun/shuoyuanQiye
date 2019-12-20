import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Account = 'account'
// todo 2 代表政府 1 代表企业

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAccount(account) {
  return Cookies.set(Account, account)
}

export function getAccount() {
  return Cookies.get(Account)
}

export function removeAccount() {
  return Cookies.remove(Account)
}
