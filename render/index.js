const {UserModel} = require('../utils/db')

new Vue({
  el: '#app',
  data() {
    return {
      condition: '',
      userList: [],
      dialogVisible: false,
      user: {
        userName: '',
        age: 18
      }
    }
  },
  mounted() {
    this.allUserList()
  },
  methods: {
    // 查询所有
    allUserList() {
      UserModel.find({}, (err, docs) => {
        if (err) return
        this.userList = docs
      })
    },
    // 模糊查询
    searchUserList() {
      const query = new RegExp(this.condition, 'i')
      UserModel.find({
        $or: [
          {userName: query}
        ]
      }, (err, docs) => {
        if (err) {
          console.log(err)
          return
        }
        this.userList = docs
      })
    },
    // 增加用户
    addUser() {
      const u = new UserModel(this.user)
      u.save((err, doc) => {
        if (err) {
          console.log(err)
          return
        }
        this.allUserList()
        this.$message.success(`用户增加成功！`)
        this.dialogVisible = false
      })
    },
    deleteUser(id) {
      UserModel.deleteOne({_id: id}, err => {
        if (err) return
        this.$message.success(`用户删除成功`)
        this.allUserList()
      })
    }
  }
})