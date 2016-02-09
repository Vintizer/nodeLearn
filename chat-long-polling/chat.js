/**
 * Created by vintizer on 1/17/16.
 */
var clients =[];
exports.subscribe = function(req,res) {
    console.log('SUBSCRIBE', clients.length);
    clients.push(res);
    console.log('SUBSCRIBE after push', clients.length);
    res.on('close', function(){
        clients.splice(clients.indexOf(res), 1);
        console.log('splice');
    })
};
exports.publish = function(mes) {
  console.log('publish');
    console.log(clients.length);
    clients.forEach(function(res){
        res.end(mes);
    });
    clients = [];
};