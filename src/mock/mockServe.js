// 步骤：安装mock组件
// 编写json文件数据
// 导入mock
import Mock from 'mockjs'

// 导入json文件
import banner from './banner.json'
import floor from './floor.json'

// 使用mock进行数据请求绑定
// .mock() 第一个参数是请求的地址，第二个是请求的数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})

// 在main.js中导入使用