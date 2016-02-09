var mongoose = require('mongoose');
mongoose.set('debug', true);
var async = require('async');
var User = require('models/user').User;


function open(callback) {
    console.log('open');
    mongoose.connection.on('open', callback);
}
function dropDatabase(callback){
    console.log('drop');
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
function createUsers(callback) {
    console.log('create');
    var users = [{username: 'Vasya', password: 'supervasya'},
        {username: 'vizer', password: '123'},
        {username: 'admin', password: 'best'}
    ];
    async.each(users, function(userData, callback) {
        var user = new User(userData);
        user.save(callback);
    }, callback);

    //async.parallel([
    //    function(callback) {
    //        var vasya = new User({username: 'Vasya', password: 'supervasya'});
    //        vasya.save(function(err) {
    //            callback(err,vasya);
    //        })
    //    },
    //    function(callback) {
    //        var vizer = new User({username: 'vizer', password: '123'});
    //        vizer.save(function(err) {
    //            callback(err, vizer);
    //        })
    //    },
    //    function(callback) {
    //        var admin = new User({username: 'admin', password: 'best'});
    //        admin.save(function(err) {
    //            callback(err,admin);
    //        })
    //    }
    //], callback);
}
function close(callback) {
    mongoose.disconnect(callback);
}


async.series([
    open,
    dropDatabase,
    createUsers,
    close
], function(err, results) {
    console.log(arguments);
});
