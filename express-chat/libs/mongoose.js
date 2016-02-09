/**
 * Created by vintizer on 1/23/16.
 */
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.get('mongoose:uri'), config.get("mongoose:options"));
module.exports = mongoose;