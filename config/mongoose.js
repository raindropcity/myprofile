// 載入Mongoose
const mongoose = require('mongoose')
// 取得資料庫連線狀態
const db = mongoose.connection
// 這邊路徑代表透過環境參數process.env.MONGODB_URI取用Heroku中所設定的MONGODB_URI，若沒有拿到，則在主機建立一個名為「todo_list」的database。因此去Robo 3T 中看資料庫時，會看到有個叫todo_list的database。
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/my_profile'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 資料庫連線異常
// db.on()：在這裡用 on 註冊一個事件監聽器，用來監聽 error 事件有沒有發生。
db.on('error', () => {
  console.log('mongodb error')
})

// 資料庫連線成功
// db.once()：針對「連線成功」的 open 情況，註冊一個事件監聽器，相對於「錯誤」，連線成功只會發生一次，所以這裡特地使用 once，一旦連線成功，在執行 callback 以後就會解除監聽器。
db.once('open', () => {
  console.log('mongodb connected')
})

// 匯出變數db
module.exports = db