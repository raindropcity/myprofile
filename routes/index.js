const express = require('express')
const routes = express.Router()
// 引用 MongoDb資料庫對於「一筆資料」的設定
const Contact = require('../models/contact')
// 引用express-validator，用於確認contact表單的內容合法性(使用解構賦值進行變數設定)
const { check, validationResult } = require('express-validator')


// 首頁
routes.get('/', (req, res) => {
  return res.render('index')
})
// about頁面
routes.get('/aboutme', (req, res) => {
  return res.render('about')
})
// portfolio頁面
routes.get('/portfolio', (req, res) => {
  return res.render('portfolio')
})
// notes頁面
routes.get('/notes', (req, res) => {
  return res.render('notes')
})
// contact頁面
routes.get('/contactme', (req, res) => {
  return res.render('contact')
})
// 傳遞contact表格資料至MongoDB，並引用express-validator模組
routes.post('/contactme',
  [check('name').isLength({ min: 1, max: 20 }).withMessage('The max characters within this field are 20'), check('email').isEmail().withMessage('Invalid email address'),
  check('subject').isLength({ min: 1, max: 25 }).withMessage('The max characters within this field are 25'),
  check('content').isLength({ min: 0, max: 250 }).withMessage('The max characters within this field are 250')],
  (req, res) => {
    const { name, email, subject, content } = req.body
    const errorOfValidation = validationResult(req)

    // 若validationResult(req)裡面有資料，代表驗證未通過，應給予使用者提示
    if (!errorOfValidation.isEmpty()) {
      console.log(errorOfValidation.array())
      const invalidWarnObj = {}
      errorOfValidation.array().forEach((value) => {
        invalidWarnObj[`${value.param}`] = value.msg //使用Object的括弧記法將errorOfValidation.array()中的param與msg提取出來，裝進新的物件中
      })
      console.log(invalidWarnObj)
      return res.status(422).render('contact', {
        inputedContent: { name, email, subject, content }, //於頁面保留使用者前次輸入的內容
        warning: invalidWarnObj //render出各欄位的「無效原因」
      })
    }

    // 驗證通過，創建資料入MongoDB
    return Contact.create({
      name,
      email,
      subject,
      content
    })
      .then(() => { res.render('contact', { contactSucceed: 'THKs for your contact!' }) })
      .catch((error) => console.log(error))
  })

module.exports = routes