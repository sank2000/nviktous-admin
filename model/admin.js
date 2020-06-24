const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String
  }, {
  timestamps: true
}
)


const Admin = mongoose.model('adminDetails', adminSchema);

module.exports = Admin;