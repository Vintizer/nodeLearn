/**
 * Created by vintizer on 1/23/16.
 */
var crypto = require('crypto');
var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
   username:{
       type: String,
       unique: true,
       required: true
   },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(pass) {
    return crypto.createHmac('sha1', this.salt)
        .update(pass).digest('hex');
};

schema.virtual('password')
.set(function(pass) {
        this._plainPassword = pass;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(pass);
    })
    .get(function(){return this.hashedPassword});

schema.methods.checkPassword = function(pass) {
  return this.encryptPassword(pass) === this.hashedPassword;
};
exports.User = mongoose.model('User', schema);

