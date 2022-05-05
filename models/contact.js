const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema ({
  name: {
    type: String
  },
  email: {
    type: String
  },
  subject: {
    type: String
  },
  content: {
    type: String
  }
})

module.exports = mongoose.model('Contact', contactSchema)