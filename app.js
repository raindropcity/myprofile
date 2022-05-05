const express = require('express')
const app = express()
const expressHBS = require('express-handlebars')
const path = require('path')
const PORT = process.env.PORT || 3000

// 引用 MongoDB 連線設定
require('./config/mongoose')

// 引用路由設定
const routes = require('./routes/index')

// 建立一個名為hbs的樣板引擎，並傳入expressHBS的相關參數
app.engine('hbs', expressHBS({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎hbs
app.set('view engine', 'hbs')

// body-parser
app.use(express.urlencoded({ extended: true }))

// 提供靜態檔案
app.use(express.static('styles'))

// 如果單純部署靜態檔案的話，寫這段就行，但因需要連接MongoDB、建立路由分支，因此仍採用hbs、Express
// // 因heroku無法單純部署「靜態檔案」，因此寫個路由，內容是將static files 傳輸到需要render在網頁上的HTML檔案中
// router.get('/', (req, res) => {
//   // path.join()可以將多個「路徑」的片段連接起來(用逗號分開)
//   // __dirname可以動態的獲取"當前文件(app.js)"所屬目錄的「絕對路徑」
//   res.sendFile(path.join(__dirname, '/styles/index.html'))
// })

app.use('/myprofile', routes)

app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}!`)
})