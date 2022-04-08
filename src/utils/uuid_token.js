import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  // 先看本地有没有存储uuid特定身份，防止每一次生成不一样的字符串
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token) {
    // 生成独一的字符串
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}