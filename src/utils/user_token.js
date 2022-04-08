// 用来定义定义和获取用户token
export const setToken = (token) => {
  // 将token存储在浏览器当中
  localStorage.setItem('TOKEN',token)
}

export const getToken = () => {
  // 获取token值
  return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
  return localStorage.removeItem('TOKEN')
}