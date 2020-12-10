const mongoose = require('mongoose')
const {Schema, model} = mongoose

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(r => {
  console.log(`数据库初始化`)
}).catch(err => {
  console.log(err, `数据库连接异常`)
})

/**
 * 用户数据库操作
 */
const UserModel = model('user', new Schema({
  userName: String,
  age: Number
}))

module.exports = {
  UserModel
}